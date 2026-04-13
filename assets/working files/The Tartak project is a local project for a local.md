<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# The Tartak project is a local project for a local company that is a sawmill in the town of Ponsk, and they provide sawmill-prepared timber to the local community.

I want to create a website that presents the company as a reliable provider to the trade and individuals in need of timber soft timber.

I've used the company by just showing up and making a specific order to size. Within a very short amount of time, they turn around and even deliver within the local area.

I think what we need to do is also do some research as to what other companies exist, what a typical Tartak company offers, and how it could be presented as a modern, practical website available in three languages. The default is Polish, with, in the footer, a language switch to English and Ukrainian.

There's some very positive reviews left on the Google Maps review page. Perhaps that content could be repurposed so that it could be embedded in a sort of review section, "What customers have said".

So please do some research and make a proposal on what a simple website like this could be. What's very important is that it's SEO friendly and AEO friendly.

Of course, make sure contact details are readily available in the footer, but maybe also a CTA for "Contact Us" in the header.

Use a modern framework like Next.js React and Tailwind

Where possible, make use of ready to use components from the following site.: [https://21st.dev/home](https://21st.dev/home)

Fast, your findings will be passed on to Claude Code and be used in preparation for the build.

Consider your inputs as the PRD for the site, making sure you remind Claude Code that there are several skills available that can be used for ongoing planning of the site. I would prefer not to proceed with the build, but first plan, come up with a detailed plan before moving on to a build phase.

In order to facilitate that, the skill that I'd like to make use of is the brainstorming skill.

For look and feel and usability, I want Claude Code to make use of the brand guideline skill and the design system creator skill. I would want a design system built on the back of anything that is developed as a website. Of course, you need to use the front-end design skill, Tailwind design system skill, and for colors, consider using the theme factory skill.

So please go off and do some deep research and come up with a detailed plan on what we can give to Claude Code in order to start more detailed plans and then eventual implementation.

audit-website

Here's the PRD and build strategy for the Tartak-Budrol site. It covers everything you need to hand off to Claude Code.

**Key findings from the research:**

The business is the \#1 ranked sawmill in Płońsk with a 4.7/5 Google rating, operating since 2007 with a TrakMet band saw and certified Södra C24 structural timber (the photographed green moisture tags and red stamps are proof-of-quality assets worth featuring prominently on the site). There are 13 sawmill competitors in the powiat płoński, but none have a meaningfully modern web presence — a clear differentiator opportunity.[^1][^2][^3]

**What the report covers:**

- Full company profile and contact data confirmed from business registries[^4][^1]
- Competitor landscape with ratings and positioning gaps[^2][^3]
- Technical explanation of C24 grade (the most common structural class in Poland) — essential for the product copy[^5][^6]
- Complete page architecture with slugs across all three languages using `next-intl`[^7][^8]
- SEO/AEO specifications including `LocalBusiness` schema.org JSON-LD, `FAQPage` schema, `BreadcrumbList`, and hreflang alternates[^9][^10][^11]
- 21st.dev component mapping per site section — all MIT-licensed, copy-paste ready[^12]
- A **mandatory Phase 0 planning sequence** for Claude Code, explicitly calling the brainstorming → brand guideline → theme factory → design system creator → frontend design → Tailwind design system skill chain before any code is written
- A photography catalogue from your provided images (12 usable shots covering every stage of the production chain) with recommended placements
- GDPR/cookie consent requirements under Polish law

**On the Google reviews:** the 4.7/5 rating on Google Maps is your strongest social proof asset. The report recommends curating 4–6 static reviews as testimonial cards with a link back to the live Google Maps listing — no API needed for the initial build.[^3]
<span style="display:none">[^100][^101][^13][^14][^15][^16][^17][^18][^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30][^31][^32][^33][^34][^35][^36][^37][^38][^39][^40][^41][^42][^43][^44][^45][^46][^47][^48][^49][^50][^51][^52][^53][^54][^55][^56][^57][^58][^59][^60][^61][^62][^63][^64][^65][^66][^67][^68][^69][^70][^71][^72][^73][^74][^75][^76][^77][^78][^79][^80][^81][^82][^83][^84][^85][^86][^87][^88][^89][^90][^91][^92][^93][^94][^95][^96][^97][^98][^99]</span>

<div align="center">⁂</div>

[^1]: https://www.oferteo.pl/tartak-budroll-tartak-przecieranie/firma/2235679

[^2]: https://www.extra-plonsk.pl/firmy/tartak-plonsk

[^3]: https://allshadcn.com/components/21stdev/

[^4]: https://www.setragroup.com/en/press/news/strong-stronger-strongest/

[^5]: https://www.sodra.com/en/gb/wood/merchants/products/structural-softwood-products/

[^6]: https://panoramafirm.pl/tartaki/mazowieckie,płoński

[^7]: https://www.grab-bud.pl/tartak-plonsk

[^8]: https://www.jbtartak.com.pl/about-the-company,7.html

[^9]: https://tartakolczyk.pl/en/company/

[^10]: https://www.swedishwood.com/wood-facts/about-wood/wood-grades/

[^11]: https://eastondev.com/blog/en/posts/dev/20251225-nextjs-i18n-complete-guide/

[^12]: https://i18nexus.com/tutorials/nextjs/next-intl

[^13]: https://dev.to/mukitaro/a-complete-guide-to-i18n-in-nextjs-15-app-router-with-next-intl-supporting-8-languages-1lgj

[^14]: https://www.reddit.com/r/bigseo/comments/1m4qx8j/structured_data_strategy_for_servicebased_website/

[^15]: https://developers.google.com/search/docs/appearance/structured-data/local-business

[^16]: https://yoast.com/local-business-listings/

[^17]: https://exxardigital.com/blog/local-aeo-best-practices-for-small-businesses/

[^18]: https://www.optuno.com/blog/local-seo-for-small-business-complete-guide

[^19]: https://poeditor.com/blog/next-js-i18n/

[^20]: https://tartakplonsk.pl

[^21]: https://tartakplonsk.pl/kantowki/

[^22]: https://tartakplonsk.pl/boazeria-14121mm/

[^23]: IMG_6961.jpeg

[^24]: IMG_6964-5.jpeg

[^25]: IMG_6964-6.MP4

[^26]: IMG_6965-7.jpeg

[^27]: IMG_6965-8.MP4

[^28]: IMG_6966-10.MP4

[^29]: IMG_6967-12.MP4

[^30]: IMG_6966-9.jpeg

[^31]: IMG_6967-11.jpeg

[^32]: IMG_6968-13.jpeg

[^33]: IMG_6969-15.jpeg

[^34]: IMG_6970-17.jpeg

[^35]: IMG_6971-19.jpeg

[^36]: IMG_6972-21.jpeg

[^37]: IMG_6972-22.MP4

[^38]: IMG_6973-23.jpeg

[^39]: IMG_6974-25.jpeg

[^40]: IMG_6975-27.jpeg

[^41]: IMG_6976-29.jpeg

[^42]: https://books.google.co.uk/books/about/Marketing_Plans.html?id=os0K20MsepoC

[^43]: https://consent.google.co.uk/m?cm=2\&continue=https%3A%2F%2Fwww.google.co.uk%2Ftravel%2Fhotels%2Fentity%2FCgsIoruIvY-kgejyARAB\&hl=en-GB\&m=0\&pc=trv\&src=1

[^44]: https://consent.google.co.uk/m?cm=2\&continue=https%3A%2F%2Fwww.google.co.uk%2Ftravel%2Fhotels%2Fentity%2FChgIyvf2gM3EwZCTARoLL2cvMXRnMzRyZjYQAQ%2Fhighlights%2F11%2FCiESCRUAAFBCKAA4CxgLgqOwzwkOKgwKAwj3EBIFmgsCCAsKHxIHHYs3e0A4ExgTgqOwzwkOKgwKAwj3EBIFmgsCCBMKHxIHHQAAgEA4FBgUgqOwzwkOKgwKAwj3EBIFmgsCCBQKHxIHHUjJj0A4JhgmgqOwzwkOKgwKAwj3EBIFmgsCCCYKHxIHHXX9kEA4KBgogqOwzwkOKgwKAwj3EBIFmgsCCCgKHxIHHYgckUA4HRgdgqOwzwkOKgwKAwj3EBIFmgsCCB0KHxIHHaaymkA4FRgVgqOwzwkOKgwKAwj3EBIFmgsCCBUKHxIHHWZmjkA4FhgWgqOwzwkOKgwKAwj3EBIFmgsCCBY%3Fsa%3DX%26ts%3DCAESABogCgIaABIaEhQKBwjmDxACGA0SBwjmDxACGA4YATICEAAqCQoFOgNVU0QaAA%26ved%3D2ahUKEwiT-f3ykt_1AhWjBRwAHUzNCwcQus8DKAB6BAgCEB0\&hl=en-GB\&m=0\&pc=trv\&src=1

[^45]: https://books.google.co.uk/books/about/Umar_Ibn_ABI_Rabi_ah.html?id=rIezcQAACAAJ\&redir_esc=y

[^46]: https://www.google.co.uk/earth/versions/

[^47]: https://scholar.google.co.uk/citations?user=FeTEsaUAAAAJ\&hl=en

[^48]: https://books.google.co.uk/books/about/Global_Shift.html?id=Uhy6AAAAIAAJ\&redir_esc=y

[^49]: https://tartakplonsk.pl/kontakt/

[^50]: https://scholar.google.co.uk/citations?hl=en\&user=gTcxRLQAAAAJ

[^51]: https://books.google.co.uk/books/about/Project_Management_Planning_and_Control.html?id=1k8wKkmJwXIC

[^52]: https://books.google.co.uk/books/about/History_and_Culture_of_Panjab.html?id=W95iulFxS6gC\&redir_esc=y

[^53]: https://scholar.google.co.uk/citations?hl=en\&user=1jbPy9cAAAAJ

[^54]: http://www.tartak.com.pl

[^55]: https://www.tartakgrzyb.pl/en/o-firmie

[^56]: https://www.pkt.pl/firma/tartak-budrol-dobkowski-j-3006060

[^57]: https://panoramafirm.pl/mazowieckie,płoński,płońsk,wyszogrodzka,100a/centrum_budowlane_bud_rol_dobkowska_krystyna-tkgfw_jbb.html

[^58]: http://www.tartaknowemiasto.pl

[^59]: https://jbtartak.com.pl/en/sawmill/

[^60]: https://www.tartakkowal.pl/en/o-nas/

[^61]: https://www.oferteo.pl/sklad-drewna/plonsk

[^62]: https://www.tartakkowal.pl/en/kontakt/

[^63]: https://books.google.co.uk/books?dq=what+is+alan+barrish's+background+in+library+management\&hl=en\&id=P0IhAQAAIAAJ\&lpg=PA3575\&ots=INb05OycrR\&pg=PA3575\&redir_esc=y\&sa=X\&sig=ACfU3U0Sx7SwpKkmQPlNZikRrxmpidCsRQ

[^64]: https://books.google.co.uk/books?dq=create+dropdown+with+icons+and+business+process+-site%3Aquora.com+-site%3Amedium.com+-site%3Achegg.com+-site%3Apinterest.com+-site%3Ainstagram.com+-site%3Abartleby.com+-site%3Aquizizz.com+-site%3Abrainly.com+-site%3Atiktok.com+-site%3Azhuanlan.zhihu.com+-site%3Ahistory.com+-site%3Atoppr.com+-site%3Aanalyticsvidhya.com+-site%3Aissuu.com+-site%3Amakeuseof.com+-site%3Afacebook.com+-site%3Amathway.com\&hl=en\&id=mb4J-GqnZXoC\&lpg=SA6-PA3\&ots=533bMRQ6A8\&pg=SA6-PA3\&sa=X\&sig=ACfU3U21sjD6zXcOcq_H3YU0AcBzS49mbw\&ved=2ahUKEwjU3qCUiLWEAxUQHkQIHdXNAiIQ6AF6BAgJEAE

[^65]: https://books.google.co.uk/books/about/Na_Kehne_Ki_Kala.html?id=9LTGEAAAQBAJ\&redir_esc=y

[^66]: https://books.google.co.uk/books/about/2500_English_Sentences_Spoken_English_Th.html?id=YdnyDwAAQBAJ\&redir_esc=y

[^67]: https://books.google.co.uk/books/about/The_Case_of_Sacco_and_Vanzetti.html?id=1KlZAAAAYAAJ\&redir_esc=y

[^68]: https://books.google.co.uk/books/about/Essentials_of_Stanford_Binet_Intelligenc.html?id=yhjtrtQcbiQC\&redir_esc=y

[^69]: https://books.google.co.uk/books?dq=site+visits+kiss+a+lot+of+pigs+business+difficult+clients+partners+meaning+-site%3Aquora.com+-site%3Amedium.com+-site%3Achegg.com+-site%3Apinterest.com+-site%3Ainstagram.com+-site%3Abartleby.com+-site%3Aquizizz.com+-site%3Abrainly.com+-site%3Atiktok.com+-site%3Azhuanlan.zhihu.com+-site%3Ahistory.com+-site%3Atoppr.com+-site%3Aanalyticsvidhya.com+-site%3Aissuu.com+-site%3Amakeuseof.com+-site%3Afacebook.com+-site%3Amathway.com\&hl=en\&id=sdMxAQAAMAAJ\&lpg=RA10-PA6\&ots=AMrB8s3viJ\&pg=RA10-PA6\&redir_esc=y\&sa=X\&sig=ACfU3U3p7keVjVfpF4-YYW5-Fno3inmBZQ

[^70]: https://books.google.co.uk/books/about/Mass_Spectrometry.html?id=pqhr5XQZDtUC\&redir_esc=y

[^71]: https://books.google.co.uk/books/about/Advances_in_Business_Informatics_empower.html?id=9wG1EAAAQBAJ\&redir_esc=y

[^72]: https://books.google.co.uk/books/about/Xunzi.html?id=Pr7BAwAAQBAJ\&redir_esc=y

[^73]: https://books.google.co.uk/books/about/From_Mobilization_to_Revolution.html?id=LeH8RnrbROAC\&redir_esc=y

[^74]: https://books.google.co.uk/books/about/Research_Methods_for_Business.html?id=u73GjwEACAAJ\&redir_esc=y

[^75]: https://www.youtube.com/watch?v=rnAUcpLprPU

[^76]: https://www.siteground.com/academy/small-business-local-seo/

[^77]: https://www.linkedin.com/posts/enoptimize_best-seo-practices-for-millwork-companies-activity-7344202565665886212-qtFM

[^78]: https://zielonaetykieta.pl/plonsk

[^79]: https://21st.dev

[^80]: https://shadcn.io/template/serafimcloud-21st

[^81]: https://www.sagipl.com/seo-for-timber.php

[^82]: https://www.oferteo.pl/tartak/plonsk

[^83]: https://www.reddit.com/r/nextjs/comments/18352js/i_built_a_free_tailwind_ui_library_with_nextjs_13/

[^84]: https://books.google.co.uk/books?dq=origin+of+the+term+"walkabout"+in+paris\&hl=en\&id=vUp6EAAAQBAJ\&lpg=PA124\&ots=IjxBHzsnR_\&pg=PA124\&sa=X\&sig=ACfU3U3-8HlypMlVzQADTL4ertptzCFvPg\&ved=2ahUKEwjN-MbhgseFAxWvLEQIHXu0DxUQ6AF6BAgFEAE

[^85]: https://www.google.co.uk/webmasters/markup-helper/

[^86]: https://books.google.co.uk/books/about/Macroenvironmental_Analysis_for_Strategi.html?id=F419QgAACAAJ\&redir_esc=y

[^87]: https://www.google.co.uk/intl/ru/maps/about/

[^88]: https://books.google.co.uk/books/about/Data_Storytelling_with_Google_Looker_Stu.html?id=n3uUEAAAQBAJ\&redir_esc=y

[^89]: https://www.google.co.uk/streetview/how-it-works/

[^90]: https://books.google.co.uk/books?id=afAuAAAAQBAJ\&cad=2

[^91]: https://books.google.co.uk/books/about/International_Human_Rights_Law.html?id=JzWAEAAAQBAJ\&redir_esc=y

[^92]: https://books.google.co.uk/books?dq=nitish+kumar+news+summary+-site%3Aquora.com+-site%3Amedium.com+-site%3Achegg.com+-site%3Apinterest.com+-site%3Ainstagram.com+-site%3Abartleby.com+-site%3Aquizizz.com+-site%3Abrainly.com+-site%3Atiktok.com+-site%3Azhuanlan.zhihu.com+-site%3Ahistory.com+-site%3Atoppr.com+-site%3Aanalyticsvidhya.com+-site%3Aissuu.com+-site%3Amakeuseof.com+-site%3Afacebook.com+-site%3Amathway.com\&hl=en\&id=P57ZBQAAQBAJ\&lpg=PA177\&ots=sNgvYr8O7y\&pg=PA177\&sa=X\&sig=ACfU3U2qhOgy4lJxo93vKsC2btjyf1QpKw\&ved=2ahUKEwjd3LrS-oCEAxWvsVYBHYOjDmcQ6AF6BAgJEAE

[^93]: https://books.google.co.uk/books?id=rezqDU30R5wC\&printsec=frontcover

[^94]: https://books.google.co.uk/books/about/Managing_in_the_Next_Society.html?id=I-0e_jjxQEAC\&redir_esc=y

[^95]: https://books.google.co.uk/books/about/Business_Psychology_and_Organizational_B.html?id=dIvftgAACAAJ\&redir_esc=y

[^96]: https://www.timberservices.com/product/structural-c24-treated-timber-a0101/047-x-175-x-6000-mm-kd-c24-graded-regularised-ac500-treated-pefc-t000654/T000654

[^97]: https://aioseo.com/seo-glossary/local-business-schema/

[^98]: https://www.holmen.com/ja/woodproducts/wood-and-construction-products/wood-products-for-hardware-store2/construction-timber/

[^99]: https://www.youtube.com/watch?v=XRS1hRGAEIU

[^100]: https://schema.org/LocalBusiness

[^101]: https://21st.dev/home

