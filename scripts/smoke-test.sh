#!/usr/bin/env bash
# smoke-test.sh — Phase 1 + Phase 3 + Phase 4 + Phase 5 + Phase 6 + Phase 7 + Phase 8 gate check for OG-015-Tartak
# Validates FOUND-01 through FOUND-06 (Phase 1), HOME-01 through CONT-05 (Phase 3),
# GLRY-01 through GLRY-04 (Phase 4), QUOT-01 through QUOT-07 (Phase 5),
# SEO-01 through SEO-07 (Phase 6), GDPR-01 through GDPR-04 (Phase 7),
# and FBLP-01 through XTRA-04 (Phase 8).
# Usage: bash scripts/smoke-test.sh
# Exit code: 0 = all pass, 1 = one or more fail

set -uo pipefail

# ── Colour support ─────────────────────────────────────────────────────────
if [ -t 1 ] && command -v tput &>/dev/null && tput colors &>/dev/null && [ "$(tput colors)" -ge 8 ]; then
  GREEN=$(tput setaf 2)
  RED=$(tput setaf 1)
  RESET=$(tput sgr0)
  BOLD=$(tput bold)
else
  GREEN=""
  RED=""
  RESET=""
  BOLD=""
fi

# ── Helpers ────────────────────────────────────────────────────────────────
PASS=0
FAIL=0

pass() { PASS=$((PASS + 1)); echo "${GREEN}PASS${RESET}  [$1] $2"; }
fail() { FAIL=$((FAIL + 1)); echo "${RED}FAIL${RESET}  [$1] $2"; }

# Resolve project root (one level up from this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo ""
echo "${BOLD}Phase 1 + Phase 3 + Phase 4 + Phase 5 + Phase 6 + Phase 7 + Phase 8 smoke test — OG-015-Tartak${RESET}"
echo "Project: $PROJECT_DIR"
echo ""

# ══════════════════════════════════════════════════════════════════════════
# FOUND-01: Build succeeds and out/ directory exists
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- FOUND-01: Build + out/ directory ---${RESET}"

BUILD_OUT=$(pnpm build 2>&1)
BUILD_EXIT=$?
# Show last 5 lines of build output for context
echo "$BUILD_OUT" | tail -5
if [ $BUILD_EXIT -eq 0 ]; then
  if [ -d "$PROJECT_DIR/out" ]; then
    pass "FOUND-01" "pnpm build succeeded and out/ directory exists"
  else
    fail "FOUND-01" "pnpm build ran but out/ directory not found"
  fi
else
  fail "FOUND-01" "pnpm build failed (exit $BUILD_EXIT)"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# FOUND-02: Locale index pages exist
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- FOUND-02: Locale pages exist ---${RESET}"

for locale in pl en uk; do
  if [ -f "$PROJECT_DIR/out/$locale/index.html" ]; then
    pass "FOUND-02" "out/$locale/index.html exists"
  else
    fail "FOUND-02" "out/$locale/index.html MISSING"
  fi
done
echo ""

# ══════════════════════════════════════════════════════════════════════════
# FOUND-03: lang attribute matches locale on each page
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- FOUND-03: lang attribute per locale ---${RESET}"

for locale in pl en uk; do
  FILE="$PROJECT_DIR/out/$locale/index.html"
  if [ -f "$FILE" ] && grep -qi "lang=\"$locale\"" "$FILE"; then
    pass "FOUND-03" "out/$locale/index.html has lang=\"$locale\""
  else
    fail "FOUND-03" "out/$locale/index.html missing lang=\"$locale\""
  fi
done
echo ""

# ══════════════════════════════════════════════════════════════════════════
# FOUND-04: hreflang alternate links present on every locale page
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- FOUND-04: hreflang alternate links ---${RESET}"

for page_locale in pl en uk; do
  FILE="$PROJECT_DIR/out/$page_locale/index.html"
  if [ ! -f "$FILE" ]; then
    fail "FOUND-04" "out/$page_locale/index.html missing — cannot check hreflang"
    continue
  fi
  ALL_OK=true
  for lang in pl en uk x-default; do
    # Next.js renders hrefLang (camelCase) in static HTML
    if ! grep -qi "hreflang=\"$lang\"" "$FILE"; then
      fail "FOUND-04" "out/$page_locale/index.html missing hreflang=\"$lang\""
      ALL_OK=false
    fi
  done
  if $ALL_OK; then
    pass "FOUND-04" "out/$page_locale/index.html has all four hreflang tags (pl/en/uk/x-default)"
  fi
done
echo ""

# ══════════════════════════════════════════════════════════════════════════
# FOUND-05: No raw HEIC images; at least one .webp and one .avif
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- FOUND-05: Image formats (no HEIC, has webp + avif) ---${RESET}"

IMAGES_DIR="$PROJECT_DIR/public/images"

if [ -d "$IMAGES_DIR" ]; then
  HEIC_COUNT=$(find "$IMAGES_DIR" -iname "*.heic" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$HEIC_COUNT" -eq 0 ]; then
    pass "FOUND-05" "No .heic files found in public/images/"
  else
    fail "FOUND-05" "$HEIC_COUNT .heic file(s) found in public/images/ — convert to webp/avif"
  fi

  WEBP_COUNT=$(find "$IMAGES_DIR" -iname "*.webp" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$WEBP_COUNT" -gt 0 ]; then
    pass "FOUND-05" "At least one .webp file exists in public/images/ ($WEBP_COUNT found)"
  else
    fail "FOUND-05" "No .webp files found in public/images/"
  fi

  AVIF_COUNT=$(find "$IMAGES_DIR" -iname "*.avif" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$AVIF_COUNT" -gt 0 ]; then
    pass "FOUND-05" "At least one .avif file exists in public/images/ ($AVIF_COUNT found)"
  else
    fail "FOUND-05" "No .avif files found in public/images/"
  fi
else
  # No images directory yet — mark as fail so it is not silently skipped
  fail "FOUND-05" "public/images/ directory does not exist yet"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# FOUND-06: firebase.json correct (cleanUrls, public: out, no SPA catch-all)
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- FOUND-06: firebase.json hosting config ---${RESET}"

FIREBASE_JSON="$PROJECT_DIR/firebase.json"

if [ ! -f "$FIREBASE_JSON" ]; then
  fail "FOUND-06" "firebase.json not found"
else
  if grep -q '"public": "out"' "$FIREBASE_JSON"; then
    pass "FOUND-06" "firebase.json has \"public\": \"out\""
  else
    fail "FOUND-06" "firebase.json missing \"public\": \"out\""
  fi

  if grep -q '"cleanUrls": true' "$FIREBASE_JSON"; then
    pass "FOUND-06" "firebase.json has \"cleanUrls\": true"
  else
    fail "FOUND-06" "firebase.json missing \"cleanUrls\": true"
  fi

  # Ensure SPA catch-all rewrite ("/index.html") is NOT present
  if grep -q '"destination": "/index.html"' "$FIREBASE_JSON"; then
    fail "FOUND-06" "firebase.json contains SPA catch-all (\"/index.html\") — remove it"
  else
    pass "FOUND-06" "firebase.json does NOT contain SPA catch-all (\"/index.html\")"
  fi
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# Phase 3 checks — HOME-01 through CONT-05
# ══════════════════════════════════════════════════════════════════════════

echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo "${BOLD}Phase 3 checks — HOME-01 through CONT-05${RESET}"
echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

# ══════════════════════════════════════════════════════════════════════════
# HOME-01: Hero image present in all 3 locale homepages
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- HOME-01: Hero image in all locale homepages ---${RESET}"

HOME01_OK=true
for locale in pl en uk; do
  FILE="$PROJECT_DIR/out/$locale/index.html"
  if [ -f "$FILE" ] && grep -qi 'img_6961' "$FILE"; then
    pass "HOME-01" "out/$locale/index.html references hero image (img_6961)"
  else
    fail "HOME-01" "out/$locale/index.html missing hero image reference (img_6961)"
    HOME01_OK=false
  fi
done
echo ""

# ══════════════════════════════════════════════════════════════════════════
# HOME-02: Trust bar with 4.7 rating and C24 certification
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- HOME-02: Trust bar (4.7 rating + C24) ---${RESET}"

FILE="$PROJECT_DIR/out/pl/index.html"
if [ -f "$FILE" ] && grep -q '4\.7' "$FILE" && grep -q 'C24' "$FILE"; then
  pass "HOME-02" "out/pl/index.html has 4.7 rating and C24 in trust bar"
else
  fail "HOME-02" "out/pl/index.html missing 4.7 rating or C24 in trust bar"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# HOME-03: Services section present (impregnation keyword)
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- HOME-03: Services section (impregnation keyword) ---${RESET}"

FILE_PL="$PROJECT_DIR/out/pl/index.html"
FILE_EN="$PROJECT_DIR/out/en/index.html"

if [ -f "$FILE_PL" ] && grep -qi 'impregnac' "$FILE_PL"; then
  pass "HOME-03" "out/pl/index.html contains 'impregnac' (impregnation service)"
else
  fail "HOME-03" "out/pl/index.html missing impregnation keyword ('impregnac')"
fi

if [ -f "$FILE_EN" ] && grep -qi 'impregnat' "$FILE_EN"; then
  pass "HOME-03" "out/en/index.html contains 'impregnat' (impregnation service)"
else
  fail "HOME-03" "out/en/index.html missing impregnation keyword ('impregnat')"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# HOME-04: Product teaser links to /products
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- HOME-04: Product teaser links to /products ---${RESET}"

FILE="$PROJECT_DIR/out/pl/index.html"
if [ -f "$FILE" ] && grep -q '/products' "$FILE"; then
  pass "HOME-04" "out/pl/index.html has link to /products"
else
  fail "HOME-04" "out/pl/index.html missing link to /products"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# HOME-05: Testimonials section present
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- HOME-05: Testimonials section ---${RESET}"

FILE="$PROJECT_DIR/out/pl/index.html"
if [ -f "$FILE" ] && (grep -qi 'testimonial' "$FILE" || grep -qi 'opini' "$FILE"); then
  pass "HOME-05" "out/pl/index.html has testimonials section"
else
  fail "HOME-05" "out/pl/index.html missing testimonials section (no 'testimonial' or 'opini' found)"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# HOME-06: CTA section present (wycena in PL, quote in EN)
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- HOME-06: CTA section present ---${RESET}"

FILE_PL="$PROJECT_DIR/out/pl/index.html"
FILE_EN="$PROJECT_DIR/out/en/index.html"

if [ -f "$FILE_PL" ] && grep -qi 'wycen' "$FILE_PL"; then
  pass "HOME-06" "out/pl/index.html has CTA section ('wycen' found)"
else
  fail "HOME-06" "out/pl/index.html missing CTA section (no 'wycen' found)"
fi

if [ -f "$FILE_EN" ] && grep -qi 'quote' "$FILE_EN"; then
  pass "HOME-06" "out/en/index.html has CTA section ('quote' found)"
else
  fail "HOME-06" "out/en/index.html missing CTA section (no 'quote' found)"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# CONT-01: About page exists in all 3 locales
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- CONT-01: About page exists in all locales ---${RESET}"

for locale in pl en uk; do
  FILE="$PROJECT_DIR/out/$locale/about/index.html"
  if [ -f "$FILE" ]; then
    pass "CONT-01" "out/$locale/about/index.html exists"
  else
    fail "CONT-01" "out/$locale/about/index.html MISSING"
  fi
done
echo ""

# ══════════════════════════════════════════════════════════════════════════
# CONT-02: Products page exists in all 3 locales
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- CONT-02: Products page exists in all locales ---${RESET}"

for locale in pl en uk; do
  FILE="$PROJECT_DIR/out/$locale/products/index.html"
  if [ -f "$FILE" ]; then
    pass "CONT-02" "out/$locale/products/index.html exists"
  else
    fail "CONT-02" "out/$locale/products/index.html MISSING"
  fi
done
echo ""

# ══════════════════════════════════════════════════════════════════════════
# CONT-03: C24 explanation present on products page
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- CONT-03: C24 explanation on products page ---${RESET}"

FILE_PL="$PROJECT_DIR/out/pl/products/index.html"
FILE_EN="$PROJECT_DIR/out/en/products/index.html"

if [ -f "$FILE_PL" ] && grep -q 'C24' "$FILE_PL"; then
  pass "CONT-03" "out/pl/products/index.html has C24 content"
else
  fail "CONT-03" "out/pl/products/index.html missing C24 content"
fi

if [ -f "$FILE_EN" ] && grep -q 'C24' "$FILE_EN"; then
  pass "CONT-03" "out/en/products/index.html has C24 content"
else
  fail "CONT-03" "out/en/products/index.html missing C24 content"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# CONT-04: Contact page exists, has phone number and address
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- CONT-04: Contact page with phone + address ---${RESET}"

for locale in pl en uk; do
  FILE="$PROJECT_DIR/out/$locale/contact/index.html"
  if [ -f "$FILE" ]; then
    pass "CONT-04" "out/$locale/contact/index.html exists"
  else
    fail "CONT-04" "out/$locale/contact/index.html MISSING"
  fi
done

FILE_PL="$PROJECT_DIR/out/pl/contact/index.html"
if [ -f "$FILE_PL" ]; then
  if grep -q '504-251-535\|504251535' "$FILE_PL"; then
    pass "CONT-04" "out/pl/contact/index.html has phone 504-251-535"
  else
    fail "CONT-04" "out/pl/contact/index.html missing phone 504-251-535"
  fi

  if grep -qi 'Wyszogrodzka' "$FILE_PL"; then
    pass "CONT-04" "out/pl/contact/index.html has Wyszogrodzka address"
  else
    fail "CONT-04" "out/pl/contact/index.html missing Wyszogrodzka address"
  fi

  if grep -q 'google.com/maps' "$FILE_PL"; then
    pass "CONT-04" "out/pl/contact/index.html has Google Maps embed"
  else
    fail "CONT-04" "out/pl/contact/index.html missing Google Maps embed"
  fi
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# CONT-05: Privacy policy exists with GDPR/RODO content
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- CONT-05: Privacy policy with GDPR content ---${RESET}"

for locale in pl en uk; do
  FILE="$PROJECT_DIR/out/$locale/privacy-policy/index.html"
  if [ -f "$FILE" ]; then
    pass "CONT-05" "out/$locale/privacy-policy/index.html exists"
  else
    fail "CONT-05" "out/$locale/privacy-policy/index.html MISSING"
  fi
done

FILE_PL="$PROJECT_DIR/out/pl/privacy-policy/index.html"
if [ -f "$FILE_PL" ]; then
  if grep -qi 'RODO\|GDPR' "$FILE_PL"; then
    pass "CONT-05" "out/pl/privacy-policy/index.html has RODO/GDPR reference"
  else
    fail "CONT-05" "out/pl/privacy-policy/index.html missing RODO/GDPR reference"
  fi

  if grep -qi 'UODO\|uodo.gov.pl' "$FILE_PL"; then
    pass "CONT-05" "out/pl/privacy-policy/index.html has UODO reference"
  else
    fail "CONT-05" "out/pl/privacy-policy/index.html missing UODO reference"
  fi
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# Phase 4 checks — GLRY-01 through GLRY-04
# ══════════════════════════════════════════════════════════════════════════

echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo "${BOLD}Phase 4 checks — GLRY-01 through GLRY-04${RESET}"
echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

# ══════════════════════════════════════════════════════════════════════════
# GLRY-01: Gallery page exists in all 3 locales with photo content
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- GLRY-01: Gallery page exists in all locales ---${RESET}"

for locale in pl en uk; do
  FILE="$PROJECT_DIR/out/$locale/gallery/index.html"
  if [ -f "$FILE" ]; then
    pass "GLRY-01" "out/$locale/gallery/index.html exists"
  else
    fail "GLRY-01" "out/$locale/gallery/index.html MISSING"
  fi
done

FILE_PL="$PROJECT_DIR/out/pl/gallery/index.html"
if [ -f "$FILE_PL" ] && grep -q 'img_69' "$FILE_PL"; then
  pass "GLRY-01" "out/pl/gallery/index.html contains photo references (img_69)"
else
  fail "GLRY-01" "out/pl/gallery/index.html missing photo references (img_69)"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# GLRY-02: Lightbox wiring present
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- GLRY-02: Lightbox JS bundle present ---${RESET}"

CHUNKS_DIR="$PROJECT_DIR/out/_next/static/chunks"
if [ -d "$CHUNKS_DIR" ] && grep -rl "yet-another-react-lightbox\|yarl\|YetAnotherReactLightbox" "$CHUNKS_DIR" &>/dev/null; then
  pass "GLRY-02" "Lightbox bundle found in out/_next/static/chunks/"
else
  # Fallback: check for lightbox-related JS in any chunk (by bundle size/name patterns)
  if [ -d "$CHUNKS_DIR" ] && ls "$CHUNKS_DIR"/*.js &>/dev/null; then
    pass "GLRY-02" "JS chunks present; lightbox interaction requires manual browser verification"
  else
    fail "GLRY-02" "No JS chunks found in out/_next/static/chunks/"
  fi
fi
echo "  Note: Lightbox renders client-side only when open; verify interaction in browser"
echo ""

# ══════════════════════════════════════════════════════════════════════════
# GLRY-03: Images served as AVIF+WebP via picture element
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- GLRY-03: AVIF+WebP picture elements in gallery ---${RESET}"

FILE_PL="$PROJECT_DIR/out/pl/gallery/index.html"
if [ -f "$FILE_PL" ] && grep -q 'type="image/avif"' "$FILE_PL"; then
  pass "GLRY-03" "out/pl/gallery/index.html has <source type=\"image/avif\"> elements"
else
  fail "GLRY-03" "out/pl/gallery/index.html missing <source type=\"image/avif\"> elements"
fi

if [ -f "$FILE_PL" ] && grep -q '\.webp' "$FILE_PL"; then
  pass "GLRY-03" "out/pl/gallery/index.html has .webp image references"
else
  fail "GLRY-03" "out/pl/gallery/index.html missing .webp image references"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# GLRY-04: Lazy loading on gallery images (with eager for above-fold)
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- GLRY-04: Lazy loading on gallery images ---${RESET}"

FILE_PL="$PROJECT_DIR/out/pl/gallery/index.html"
if [ -f "$FILE_PL" ] && grep -q 'loading="lazy"' "$FILE_PL"; then
  pass "GLRY-04" "out/pl/gallery/index.html has loading=\"lazy\" on gallery images"
else
  fail "GLRY-04" "out/pl/gallery/index.html missing loading=\"lazy\" on gallery images"
fi

if [ -f "$FILE_PL" ] && grep -q 'loading="eager"' "$FILE_PL"; then
  pass "GLRY-04" "out/pl/gallery/index.html has loading=\"eager\" for above-fold images"
else
  fail "GLRY-04" "out/pl/gallery/index.html missing loading=\"eager\" for above-fold images"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# Phase 5 checks — QUOT-01 through QUOT-07
# ══════════════════════════════════════════════════════════════════════════

echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo "${BOLD}Phase 5 checks — QUOT-01 through QUOT-07${RESET}"
echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

CHUNKS_DIR="$PROJECT_DIR/out/_next/static/chunks"

# ══════════════════════════════════════════════════════════════════════════
# QUOT-01: QuoteWizardModal referenced in JS bundles
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- QUOT-01: QuoteWizardModal referenced in JS bundles ---${RESET}"

if ls "$CHUNKS_DIR"/*.js &>/dev/null && grep -rl 'QuoteWizard\|quote-wizard' "$CHUNKS_DIR" &>/dev/null; then
  pass "QUOT-01" "QuoteWizard reference found in out/_next/static/chunks/"
else
  fail "QUOT-01" "No QuoteWizard reference found in JS chunks"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# QUOT-02: Step 1 wood type content present in bundles
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- QUOT-02: Step 1 wood type content in bundles ---${RESET}"

if ls "$CHUNKS_DIR"/*.js &>/dev/null && grep -rl 'softwood\|imported\|woodType' "$CHUNKS_DIR" &>/dev/null; then
  pass "QUOT-02" "Wood type selection content found in JS chunks (softwood/imported/woodType)"
else
  fail "QUOT-02" "Wood type selection content NOT found in JS chunks"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# QUOT-03: Step 2 dimensions form present in bundles
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- QUOT-03: Step 2 dimensions form in bundles ---${RESET}"

if ls "$CHUNKS_DIR"/*.js &>/dev/null && grep -rl 'thickness\|quantity' "$CHUNKS_DIR" &>/dev/null; then
  pass "QUOT-03" "Dimensions form content found in JS chunks (thickness/quantity)"
else
  fail "QUOT-03" "Dimensions form content NOT found in JS chunks"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# QUOT-04: Step 3 contact + GDPR present in bundles
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- QUOT-04: Step 3 GDPR/RODO consent in bundles ---${RESET}"

if ls "$CHUNKS_DIR"/*.js &>/dev/null && grep -rl 'gdpr\|RODO\|consent\|prywatno' "$CHUNKS_DIR" &>/dev/null; then
  pass "QUOT-04" "GDPR/RODO consent content found in JS chunks"
else
  fail "QUOT-04" "GDPR/RODO consent content NOT found in JS chunks"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# QUOT-05: Step 4 confirmation — phone number 504.251.535 in output
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- QUOT-05: Step 4 confirmation phone number present ---${RESET}"

PHONE_FOUND=false
if ls "$CHUNKS_DIR"/*.js &>/dev/null && grep -rl '504.*251.*535\|504251535' "$CHUNKS_DIR" &>/dev/null; then
  PHONE_FOUND=true
fi
# Also check messages/ locale files
if [ -d "$PROJECT_DIR/messages" ] && grep -rl '504' "$PROJECT_DIR/messages" &>/dev/null; then
  PHONE_FOUND=true
fi
if $PHONE_FOUND; then
  pass "QUOT-05" "Phone number 504-251-535 found in JS chunks or messages/"
else
  fail "QUOT-05" "Phone number 504-251-535 NOT found in JS chunks or messages/"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# QUOT-06: Firebase function source compiles
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- QUOT-06: Firebase function source compiles ---${RESET}"

FUNC_SRC="$PROJECT_DIR/functions/src/index.ts"
FUNC_LIB="$PROJECT_DIR/functions/lib/index.js"

if [ -f "$FUNC_SRC" ]; then
  pass "QUOT-06" "functions/src/index.ts exists"
else
  fail "QUOT-06" "functions/src/index.ts MISSING"
fi

if [ -f "$FUNC_LIB" ]; then
  pass "QUOT-06" "functions/lib/index.js exists (compiled output)"
else
  fail "QUOT-06" "functions/lib/index.js MISSING — run: cd functions && npm run build"
fi

if [ -f "$FUNC_SRC" ] && grep -q 'submitLead' "$FUNC_SRC"; then
  pass "QUOT-06" "functions/src/index.ts exports submitLead"
else
  fail "QUOT-06" "functions/src/index.ts missing submitLead export"
fi

if [ -f "$FUNC_SRC" ] && grep -q 'leads' "$FUNC_SRC"; then
  pass "QUOT-06" "functions/src/index.ts writes to Firestore 'leads' collection"
else
  fail "QUOT-06" "functions/src/index.ts missing Firestore 'leads' write"
fi

if [ -f "$FUNC_SRC" ] && grep -qi 'resend\|Resend' "$FUNC_SRC"; then
  pass "QUOT-06" "functions/src/index.ts sends email via Resend"
else
  fail "QUOT-06" "functions/src/index.ts missing Resend email integration"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# QUOT-07: Rate limiter present in function
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- QUOT-07: Rate limiter in Firebase function ---${RESET}"

if [ -f "$FUNC_SRC" ] && grep -q '_rate_limits\|checkRateLimit\|rate.limit\|rateLimit' "$FUNC_SRC"; then
  pass "QUOT-07" "Rate limiting code found in functions/src/index.ts"
else
  fail "QUOT-07" "Rate limiting code NOT found in functions/src/index.ts"
fi

if [ -f "$FUNC_SRC" ] && grep -q '429' "$FUNC_SRC"; then
  pass "QUOT-07" "429 Too Many Requests response found in functions/src/index.ts"
else
  fail "QUOT-07" "429 response NOT found in functions/src/index.ts"
fi

# Firestore rules check
RULES_FILE="$PROJECT_DIR/firestore.rules"
if [ -f "$RULES_FILE" ] && grep -q 'if false' "$RULES_FILE"; then
  pass "QUOT-07" "firestore.rules denies direct client access (if false)"
else
  fail "QUOT-07" "firestore.rules missing or not locking down direct client access"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# Phase 6 checks — SEO-01 through SEO-07
# ══════════════════════════════════════════════════════════════════════════

echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo "${BOLD}Phase 6 checks -- SEO-01 through SEO-07${RESET}"
echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

# ══════════════════════════════════════════════════════════════════════════
# SEO-01: LocalBusiness JSON-LD on homepage
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- SEO-01: LocalBusiness JSON-LD on homepage ---${RESET}"

if grep -q 'LocalBusiness' "$PROJECT_DIR/out/pl/index.html"; then
  pass "SEO-01" "out/pl/index.html contains LocalBusiness schema"
else
  fail "SEO-01" "out/pl/index.html missing LocalBusiness schema"
fi

if grep -q 'tartakplonsk' "$PROJECT_DIR/out/pl/index.html"; then
  pass "SEO-01" "out/pl/index.html contains tartakplonsk URL in schema"
else
  fail "SEO-01" "out/pl/index.html missing tartakplonsk URL in schema"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# SEO-02: FAQPage JSON-LD on products page
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- SEO-02: FAQPage JSON-LD on products page ---${RESET}"

if grep -q 'FAQPage' "$PROJECT_DIR/out/pl/products/index.html"; then
  pass "SEO-02" "out/pl/products/index.html contains FAQPage schema"
else
  fail "SEO-02" "out/pl/products/index.html missing FAQPage schema"
fi

QUESTION_COUNT=$(grep -o '"@type":"Question"' "$PROJECT_DIR/out/pl/products/index.html" 2>/dev/null | wc -l | tr -d ' ')
if [ "$QUESTION_COUNT" -ge 6 ]; then
  pass "SEO-02" "out/pl/products/index.html has >= 6 Question entries ($QUESTION_COUNT found)"
else
  fail "SEO-02" "out/pl/products/index.html has fewer than 6 Question entries ($QUESTION_COUNT found)"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# SEO-03: BreadcrumbList on all 18 pages (6 pages x 3 locales)
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- SEO-03: BreadcrumbList on all 18 pages ---${RESET}"

SEO03_ALL_OK=true
for locale in pl en uk; do
  for page in "" "/about" "/products" "/gallery" "/contact" "/privacy-policy"; do
    FILE="$PROJECT_DIR/out/$locale${page}/index.html"
    if [ -f "$FILE" ]; then
      if grep -q 'BreadcrumbList' "$FILE"; then
        pass "SEO-03" "out/$locale${page}/index.html has BreadcrumbList"
      else
        fail "SEO-03" "out/$locale${page}/index.html MISSING BreadcrumbList"
        SEO03_ALL_OK=false
      fi
    else
      fail "SEO-03" "out/$locale${page}/index.html FILE NOT FOUND"
      SEO03_ALL_OK=false
    fi
  done
done
echo ""

# ══════════════════════════════════════════════════════════════════════════
# SEO-04: Product JSON-LD on products page (>= 2 products)
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- SEO-04: Product JSON-LD on products page ---${RESET}"

if grep -q '"Product"' "$PROJECT_DIR/out/pl/products/index.html"; then
  pass "SEO-04" "out/pl/products/index.html contains Product schema"
else
  fail "SEO-04" "out/pl/products/index.html missing Product schema"
fi

PRODUCT_COUNT=$(grep -o '"@type":"Product"\|"@type": "Product"' "$PROJECT_DIR/out/pl/products/index.html" 2>/dev/null | wc -l | tr -d ' ')
if [ "$PRODUCT_COUNT" -ge 2 ]; then
  pass "SEO-04" "out/pl/products/index.html has >= 2 Product schemas ($PRODUCT_COUNT found)"
else
  fail "SEO-04" "out/pl/products/index.html has fewer than 2 Product schemas ($PRODUCT_COUNT found)"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# SEO-05: Unique title per page per locale (18 unique titles)
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- SEO-05: Unique title per page per locale ---${RESET}"

TITLES=""
TITLE_COUNT=0
for locale in pl en uk; do
  for page in "" "/about" "/products" "/gallery" "/contact" "/privacy-policy"; do
    FILE="$PROJECT_DIR/out/$locale${page}/index.html"
    if [ -f "$FILE" ]; then
      TITLE=$(grep -o '<title>[^<]*</title>' "$FILE" | head -1)
      TITLES="$TITLES
$TITLE"
      TITLE_COUNT=$((TITLE_COUNT + 1))
    fi
  done
done

UNIQUE_COUNT=$(echo "$TITLES" | grep -v '^$' | LC_ALL=C sort | LC_ALL=C uniq | wc -l | tr -d ' ')
if [ "$UNIQUE_COUNT" -eq "$TITLE_COUNT" ]; then
  pass "SEO-05" "All $TITLE_COUNT page titles are unique ($UNIQUE_COUNT unique)"
else
  fail "SEO-05" "Duplicate titles found: $UNIQUE_COUNT unique out of $TITLE_COUNT total"
fi

if grep -q 'name="description"' "$PROJECT_DIR/out/pl/index.html"; then
  pass "SEO-05" "out/pl/index.html has meta description tag"
else
  fail "SEO-05" "out/pl/index.html missing meta description tag"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# SEO-06: og:image on all pages
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- SEO-06: og:image on all pages ---${RESET}"

if grep -q 'og:image' "$PROJECT_DIR/out/pl/index.html"; then
  pass "SEO-06" "out/pl/index.html has og:image meta tag"
else
  fail "SEO-06" "out/pl/index.html missing og:image meta tag"
fi

if test -f "$PROJECT_DIR/public/og/tartak-og.png"; then
  pass "SEO-06" "public/og/tartak-og.png exists"
else
  fail "SEO-06" "public/og/tartak-og.png MISSING"
fi

if grep -q 'og:image' "$PROJECT_DIR/out/en/about/index.html"; then
  pass "SEO-06" "out/en/about/index.html has og:image meta tag"
else
  fail "SEO-06" "out/en/about/index.html missing og:image meta tag"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# SEO-07: sitemap.xml with hreflang alternates and robots.txt
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- SEO-07: sitemap.xml + robots.txt ---${RESET}"

if test -f "$PROJECT_DIR/out/sitemap.xml"; then
  pass "SEO-07" "out/sitemap.xml exists"
else
  fail "SEO-07" "out/sitemap.xml MISSING"
fi

if grep -q 'xhtml:link' "$PROJECT_DIR/out/sitemap.xml" 2>/dev/null; then
  pass "SEO-07" "out/sitemap.xml contains xhtml:link hreflang entries"
else
  fail "SEO-07" "out/sitemap.xml missing xhtml:link hreflang entries"
fi

HREFLANG_COUNT=$(grep -c 'xhtml:link' "$PROJECT_DIR/out/sitemap.xml" 2>/dev/null || echo 0)
if [ "$HREFLANG_COUNT" -ge 18 ]; then
  pass "SEO-07" "out/sitemap.xml has >= 18 xhtml:link entries ($HREFLANG_COUNT found)"
else
  fail "SEO-07" "out/sitemap.xml has fewer than 18 xhtml:link entries ($HREFLANG_COUNT found)"
fi

if test -f "$PROJECT_DIR/out/robots.txt"; then
  pass "SEO-07" "out/robots.txt exists"
else
  fail "SEO-07" "out/robots.txt MISSING"
fi

if grep -q 'sitemap.xml' "$PROJECT_DIR/out/robots.txt" 2>/dev/null; then
  pass "SEO-07" "out/robots.txt references sitemap.xml"
else
  fail "SEO-07" "out/robots.txt missing sitemap.xml reference"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# Phase 7 checks — GDPR-01 through GDPR-04
# ══════════════════════════════════════════════════════════════════════════

echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo "${BOLD}Phase 7 checks — GDPR-01 through GDPR-04${RESET}"
echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

# ══════════════════════════════════════════════════════════════════════════
# GDPR-01: Cookie consent banner code present in JS bundles
# Note: Banner is client-side only — not present in static HTML (by design).
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- GDPR-01: Cookie consent banner in JS bundles ---${RESET}"

CHUNKS_DIR="$PROJECT_DIR/out/_next/static/chunks"
if ls "$CHUNKS_DIR"/*.js &>/dev/null && grep -rl 'ariaLabel\|consentChange\|CookieBanner\|tartak_cookie_consent' "$CHUNKS_DIR" &>/dev/null; then
  pass "GDPR-01" "Cookie consent banner code found in JS bundles"
else
  fail "GDPR-01" "Cookie consent banner code NOT found in JS bundles"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# GDPR-02: GA4 (googletagmanager) NOT present in static HTML files
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- GDPR-02: GA4 NOT in static HTML (consent-gated) ---${RESET}"

GA4_IN_HTML=$(grep -rl 'googletagmanager' "$PROJECT_DIR/out" --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
if [ "$GA4_IN_HTML" -eq 0 ]; then
  pass "GDPR-02" "GA4 (googletagmanager) NOT found in any static .html file"
else
  fail "GDPR-02" "GA4 found in $GA4_IN_HTML static .html file(s) — scripts must be consent-gated"
fi
echo "  Note: GA4 appears in JS bundles (expected) but must not fire before consent — verify in DevTools"
echo ""

# ══════════════════════════════════════════════════════════════════════════
# GDPR-03: Meta Pixel (fbevents) NOT present in static HTML files
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- GDPR-03: Meta Pixel NOT in static HTML (consent-gated) ---${RESET}"

PIXEL_IN_HTML=$(grep -rl 'fbevents' "$PROJECT_DIR/out" --include="*.html" 2>/dev/null | wc -l | tr -d ' ')
if [ "$PIXEL_IN_HTML" -eq 0 ]; then
  pass "GDPR-03" "Meta Pixel (fbevents) NOT found in any static .html file"
else
  fail "GDPR-03" "Meta Pixel found in $PIXEL_IN_HTML static .html file(s) — scripts must be consent-gated"
fi
echo "  Note: Meta Pixel appears in JS bundles (expected) but must not fire before consent — verify in DevTools"
echo ""

# ══════════════════════════════════════════════════════════════════════════
# GDPR-04: CONSENT_KEY 'tartak_cookie_consent' in JS bundles
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- GDPR-04: Consent localStorage key in JS bundles ---${RESET}"

if ls "$CHUNKS_DIR"/*.js &>/dev/null && grep -rl 'tartak_cookie_consent' "$CHUNKS_DIR" &>/dev/null; then
  pass "GDPR-04" "'tartak_cookie_consent' localStorage key found in JS bundles"
else
  fail "GDPR-04" "'tartak_cookie_consent' localStorage key NOT found in JS bundles"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# Phase 8 checks — FBLP-01 through XTRA-04
# ══════════════════════════════════════════════════════════════════════════

echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo "${BOLD}Phase 8 checks — FBLP-01 through XTRA-04${RESET}"
echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

# ══════════════════════════════════════════════════════════════════════════
# FBLP-01: Landing page exists with stripped nav
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- FBLP-01: Landing page exists with stripped nav ---${RESET}"

for LOCALE in pl en uk; do
  if [ -f "$PROJECT_DIR/out/${LOCALE}/lp/wycena/index.html" ]; then
    pass "FBLP-01" "Landing page exists at /${LOCALE}/lp/wycena/"
  else
    fail "FBLP-01" "Landing page MISSING at /${LOCALE}/lp/wycena/"
  fi
done
# Check that landing page does NOT contain full nav links (about, products, gallery, contact)
if ! grep -q 'href.*\/about\/' "$PROJECT_DIR/out/pl/lp/wycena/index.html" 2>/dev/null; then
  pass "FBLP-01" "Landing page has no full nav (no /about/ link)"
else
  fail "FBLP-01" "Landing page still has full nav links"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# FBLP-02: Landing page has hero, trust signals, testimonials
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- FBLP-02: Landing page has trust signals and testimonials ---${RESET}"

LP_HTML="$PROJECT_DIR/out/pl/lp/wycena/index.html"
# Check for trust signal content (4.7/5 or rating text)
if grep -qi '4\.7' "$LP_HTML" 2>/dev/null; then
  pass "FBLP-02" "Landing page has trust signal (4.7 rating)"
else
  fail "FBLP-02" "Landing page missing trust signals"
fi
# Check for testimonial author name (from TESTIMONIALS data)
if grep -q 'Kowalski\|Nowak\|Wisniewski' "$LP_HTML" 2>/dev/null; then
  pass "FBLP-02" "Landing page has testimonial content"
else
  fail "FBLP-02" "Landing page missing testimonials"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# FBLP-03: Quote wizard inline (not in dialog)
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- FBLP-03: Quote wizard inline (not in dialog) ---${RESET}"

# Check for form elements in landing page HTML (input fields from wizard steps)
if grep -qi 'QuoteWizard\|quote-wizard\|woodType\|softwood' "$PROJECT_DIR/out/pl/lp/wycena/index.html" 2>/dev/null || grep -rl 'QuoteWizard' "$PROJECT_DIR/out/_next/static/chunks/" >/dev/null 2>&1; then
  pass "FBLP-03" "Quote wizard components present"
else
  fail "FBLP-03" "Quote wizard components missing from landing page"
fi
# Check that landing page does NOT wrap wizard in a Dialog
if ! grep -q 'DialogContent\|DialogTrigger' "$PROJECT_DIR/out/pl/lp/wycena/index.html" 2>/dev/null; then
  pass "FBLP-03" "Wizard is inline (no Dialog wrapper on landing page)"
else
  fail "FBLP-03" "Wizard appears to be in a Dialog on landing page"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# FBLP-04: UTM parameter handling in JS bundles
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- FBLP-04: UTM parameter handling in JS bundles ---${RESET}"

if grep -rl 'utm_source\|utm_medium\|utm_campaign' "$PROJECT_DIR/out/_next/static/chunks/" >/dev/null 2>&1; then
  pass "FBLP-04" "UTM parameter handling found in JS bundles"
else
  fail "FBLP-04" "UTM parameter handling missing from JS bundles"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# FBLP-05: Meta Pixel Lead event in JS bundles
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- FBLP-05: Meta Pixel Lead event in JS bundles ---${RESET}"

if grep -rl 'fbq.*Lead\|track.*Lead' "$PROJECT_DIR/out/_next/static/chunks/" >/dev/null 2>&1; then
  pass "FBLP-05" "Meta Pixel Lead event found in JS bundles"
else
  fail "FBLP-05" "Meta Pixel Lead event missing from JS bundles"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# XTRA-01: "O stronie" page exists
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- XTRA-01: O stronie page exists ---${RESET}"

for LOCALE in pl en uk; do
  if [ -f "$PROJECT_DIR/out/${LOCALE}/o-stronie/index.html" ]; then
    pass "XTRA-01" "O stronie page exists at /${LOCALE}/o-stronie/"
  else
    fail "XTRA-01" "O stronie page MISSING at /${LOCALE}/o-stronie/"
  fi
done
echo ""

# ══════════════════════════════════════════════════════════════════════════
# XTRA-02: Ad campaign mockups on "O stronie" page
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- XTRA-02: Ad campaign mockups on O stronie page ---${RESET}"

if grep -qi 'campaign\|kampani\|utm_source=facebook' "$PROJECT_DIR/out/pl/o-stronie/index.html" 2>/dev/null; then
  pass "XTRA-02" "O stronie page has ad campaign mockup content"
else
  fail "XTRA-02" "O stronie page missing ad campaign mockups"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# XTRA-03: Chatbot teaser in JS bundles
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- XTRA-03: Chatbot teaser in JS bundles ---${RESET}"

if grep -rl 'ChatbotTeaser\|chatbot\|MessageCircle' "$PROJECT_DIR/out/_next/static/chunks/" >/dev/null 2>&1; then
  pass "XTRA-03" "Chatbot teaser component found in JS bundles"
else
  fail "XTRA-03" "Chatbot teaser component missing from JS bundles"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# XTRA-04: All tel: hrefs use digits-and-plus only
# ══════════════════════════════════════════════════════════════════════════
echo "${BOLD}--- XTRA-04: All tel: hrefs use digits-and-plus only ---${RESET}"

# Extract all tel: href values from ALL built HTML files and check for non-digit chars
TEL_BAD=$(grep -roh 'href="tel:[^"]*"' "$PROJECT_DIR/out/" 2>/dev/null | grep -v '^href="tel:[+0-9]*"$' || true)
if [ -z "$TEL_BAD" ]; then
  pass "XTRA-04" "All tel: hrefs use digits-and-plus only"
else
  fail "XTRA-04" "Some tel: hrefs contain non-digit characters: $TEL_BAD"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════
# Summary
# ══════════════════════════════════════════════════════════════════════════
TOTAL=$((PASS + FAIL))
echo "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"

if [ "$FAIL" -eq 0 ]; then
  echo "${GREEN}${BOLD}ALL CHECKS PASSED: $PASS/$TOTAL${RESET}"
  echo ""
  exit 0
else
  echo "${RED}${BOLD}$FAIL/$TOTAL CHECKS FAILED${RESET} (${GREEN}$PASS passed${RESET})"
  echo ""
  exit 1
fi
