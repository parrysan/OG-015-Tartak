import { z } from 'zod';

// Step 1: Wood type selection (no Zod schema needed — simple string union)
export const woodTypes = ['softwood', 'imported'] as const;
export type WoodType = (typeof woodTypes)[number];

// Step 2: Dimensions
// Note: Zod v4 uses `error` instead of `required_error`
export const step2Schema = z.object({
  thickness: z.number({ error: 'required' }).min(1).max(500),
  width: z.number({ error: 'required' }).min(1).max(500),
  length: z.number({ error: 'required' }).min(0.1).max(15),
  quantity: z.number({ error: 'required' }).min(1),
});

// Step 3: Contact details
// Note: Zod v4 uses `error` instead of `errorMap`
export const step3Schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email().optional().or(z.literal('')),
  notes: z.string().optional(),
  gdpr: z.literal(true, { error: 'required' }),
});

// Combined type for the full form submission
export type QuoteFormData = {
  woodType: WoodType;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
} & z.infer<typeof step2Schema> &
  z.infer<typeof step3Schema>;
