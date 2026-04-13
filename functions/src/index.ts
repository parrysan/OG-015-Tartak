import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { Resend } from 'resend';

initializeApp();

const resendApiKey = defineSecret('RESEND_API_KEY');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LeadData {
  woodType: 'softwood' | 'imported';
  thickness: number;
  width: number;
  length: number;
  quantity: number;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  gdpr: true;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateLead(body: unknown): { data: LeadData; errors: string[] } | { data: null; errors: string[] } {
  const errors: string[] = [];

  if (typeof body !== 'object' || body === null) {
    return { data: null, errors: ['Request body must be a JSON object'] };
  }

  const b = body as Record<string, unknown>;

  // woodType
  if (b['woodType'] !== 'softwood' && b['woodType'] !== 'imported') {
    errors.push('woodType must be "softwood" or "imported"');
  }

  // Numeric fields > 0
  for (const field of ['thickness', 'width', 'length', 'quantity'] as const) {
    const val = b[field];
    if (typeof val !== 'number' || isNaN(val) || val <= 0) {
      errors.push(`${field} must be a number greater than 0`);
    }
  }

  // name: non-empty string
  if (typeof b['name'] !== 'string' || b['name'].trim().length === 0) {
    errors.push('name must be a non-empty string');
  }

  // phone: string with at least 9 characters
  if (typeof b['phone'] !== 'string' || b['phone'].length < 9) {
    errors.push('phone must be a string with at least 9 characters');
  }

  // gdpr: must be true
  if (b['gdpr'] !== true) {
    errors.push('gdpr must be true');
  }

  // email: optional string
  if (b['email'] !== undefined && b['email'] !== '' && typeof b['email'] !== 'string') {
    errors.push('email must be a string if provided');
  }

  // notes: optional string
  if (b['notes'] !== undefined && typeof b['notes'] !== 'string') {
    errors.push('notes must be a string if provided');
  }

  // UTM fields: optional strings
  if (b['utmSource'] !== undefined && typeof b['utmSource'] !== 'string') {
    errors.push('utmSource must be a string if provided');
  }
  if (b['utmMedium'] !== undefined && typeof b['utmMedium'] !== 'string') {
    errors.push('utmMedium must be a string if provided');
  }
  if (b['utmCampaign'] !== undefined && typeof b['utmCampaign'] !== 'string') {
    errors.push('utmCampaign must be a string if provided');
  }

  if (errors.length > 0) {
    return { data: null, errors };
  }

  return {
    data: {
      woodType: b['woodType'] as 'softwood' | 'imported',
      thickness: b['thickness'] as number,
      width: b['width'] as number,
      length: b['length'] as number,
      quantity: b['quantity'] as number,
      name: (b['name'] as string).trim(),
      phone: b['phone'] as string,
      email: typeof b['email'] === 'string' ? b['email'] : undefined,
      notes: typeof b['notes'] === 'string' ? b['notes'] : undefined,
      gdpr: true,
      utmSource: typeof b['utmSource'] === 'string' ? b['utmSource'] : undefined,
      utmMedium: typeof b['utmMedium'] === 'string' ? b['utmMedium'] : undefined,
      utmCampaign: typeof b['utmCampaign'] === 'string' ? b['utmCampaign'] : undefined,
    },
    errors: [],
  };
}

// ---------------------------------------------------------------------------
// Rate limiting — Firestore-backed, 6 requests/IP/minute
// ---------------------------------------------------------------------------

async function checkRateLimit(ip: string): Promise<boolean> {
  const db = getFirestore();
  const maxRequests = 6;
  const windowKey = Math.floor(Date.now() / 60000); // 1-minute window
  const docId = `${ip}_${windowKey}`;
  const docRef = db.collection('_rate_limits').doc(docId);

  const isLimited = await db.runTransaction(async (tx) => {
    const doc = await tx.get(docRef);
    const count = doc.exists ? (doc.data()!['count'] as number) : 0;
    if (count >= maxRequests) return true; // rate limited

    tx.set(
      docRef,
      {
        count: count + 1,
        ip,
        window: windowKey,
        // TTL field for Firestore TTL policy — expires 2 minutes after window start
        expiresAt: new Date(Date.now() + 120000),
      },
      { merge: true }
    );
    return false;
  });

  return isLimited;
}

// ---------------------------------------------------------------------------
// Email template
// ---------------------------------------------------------------------------

function buildLeadEmail(data: LeadData): string {
  const woodTypeName =
    data.woodType === 'softwood' ? 'Tarcica na wymiar (krajowa)' : 'Drewno Sodra C24 (importowane)';

  return `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Nowa wycena - Tartak Budrol</title>
</head>
<body style="font-family:Arial,Helvetica,sans-serif;margin:0;padding:16px;background:#f5f5f5">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
    <tr>
      <td style="background:#38911B;padding:20px 24px">
        <span style="font-size:20px;font-weight:bold;color:#ffffff">Nowa wycena - Tartak Budrol</span>
      </td>
    </tr>
    <tr>
      <td style="padding:24px">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eeeeee">
              <strong style="color:#555555">Imię i nazwisko:</strong><br>
              <span style="font-size:16px;color:#222222">${escapeHtml(data.name)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eeeeee">
              <strong style="color:#555555">Telefon:</strong><br>
              <a href="tel:${escapeHtml(data.phone)}" style="font-size:18px;color:#38911B;text-decoration:none;font-weight:bold">${escapeHtml(data.phone)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eeeeee">
              <strong style="color:#555555">Email:</strong><br>
              <span style="font-size:15px;color:#222222">${data.email ? escapeHtml(data.email) : '—'}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eeeeee">
              <strong style="color:#555555">Rodzaj drewna:</strong><br>
              <span style="font-size:15px;color:#222222">${escapeHtml(woodTypeName)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eeeeee">
              <strong style="color:#555555">Wymiary:</strong><br>
              <span style="font-size:15px;color:#222222">${data.thickness}x${data.width}mm, dł. ${data.length}m, il. ${data.quantity} szt.</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0">
              <strong style="color:#555555">Uwagi:</strong><br>
              <span style="font-size:15px;color:#222222">${data.notes ? escapeHtml(data.notes) : '—'}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;background:#f5f5f5;font-size:12px;color:#999999;text-align:center">
        Wycena przesłana przez formularz na tartakplonsk.pl
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ---------------------------------------------------------------------------
// submitLead Cloud Function
// ---------------------------------------------------------------------------

export const submitLead = onRequest(
  {
    cors: ['https://tartakplonsk.pl', 'http://localhost:3000'],
    region: 'europe-west1',
    secrets: [resendApiKey],
  },
  async (req, res) => {
    // 1. Method guard
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    // 2. Extract client IP
    const forwardedFor = req.headers['x-forwarded-for'];
    const clientIp =
      (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]?.trim()) ||
      req.socket.remoteAddress ||
      'unknown';

    // 3. Input validation
    const validation = validateLead(req.body);
    if (validation.data === null) {
      res.status(400).json({ error: 'Invalid input', details: validation.errors });
      return;
    }
    const data = validation.data;

    // 4. Rate limiting
    let isLimited: boolean;
    try {
      isLimited = await checkRateLimit(clientIp);
    } catch (err) {
      console.error('Rate limit check failed:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (isLimited) {
      res.status(429).json({ error: 'Too many requests' });
      return;
    }

    // 5. Firestore write + email notification
    try {
      const db = getFirestore();

      await db.collection('leads').add({
        woodType: data.woodType,
        thickness: data.thickness,
        width: data.width,
        length: data.length,
        quantity: data.quantity,
        name: data.name,
        phone: data.phone,
        email: data.email || '',
        notes: data.notes || '',
        ip: clientIp,
        source: 'quote-wizard',
        createdAt: FieldValue.serverTimestamp(),
        ...(data.utmSource && { utmSource: data.utmSource }),
        ...(data.utmMedium && { utmMedium: data.utmMedium }),
        ...(data.utmCampaign && { utmCampaign: data.utmCampaign }),
      });

      // TODO: Before production launch, verify tartakplonsk.pl domain in Resend
      const resend = new Resend(resendApiKey.value());
      const woodTypeLabel =
        data.woodType === 'softwood' ? 'Tarcica na wymiar' : 'Drewno Sodra C24';

      await resend.emails.send({
        from: 'Tartak Budrol <onboarding@resend.dev>', // dev/sandbox sender; switch to wycena@tartakplonsk.pl after domain verification
        to: ['tartak@bud-rol.com.pl'],
        subject: `Nowa wycena: ${data.name} — ${woodTypeLabel}`,
        html: buildLeadEmail(data),
      });

      res.status(200).json({ success: true });
    } catch (err) {
      console.error('Failed to save lead or send email:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);
