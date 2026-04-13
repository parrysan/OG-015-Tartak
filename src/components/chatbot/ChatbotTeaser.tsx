'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ChatbotTeaser() {
  const t = useTranslations('ChatbotTeaser');
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: v2 — save email to Firestore (MAIL-01)
    setSubmitted(true);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="w-72 rounded-xl border bg-card shadow-lg p-4">
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-sm text-foreground">{t('title')}</span>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t('close')}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Coming soon message */}
          <p className="text-sm text-muted-foreground mb-4">{t('comingSoon')}</p>

          {/* Email form or thank-you */}
          {submitted ? (
            <p className="text-sm font-medium text-green-600">{t('thankYou')}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <Input
                type="email"
                required
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm"
              />
              <Button type="submit" size="sm" className="w-full">
                {t('notify')}
              </Button>
            </form>
          )}
        </div>
      )}

      {/* Bubble button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label={t('ariaLabel')}
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
