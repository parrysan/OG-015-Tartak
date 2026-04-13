'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QuoteWizard } from './QuoteWizard';

interface QuoteWizardModalProps {
  children: React.ReactNode;
}

export function QuoteWizardModal({ children }: QuoteWizardModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg" showCloseButton>
        {/* Visually hidden for accessibility — Radix warns if DialogTitle is absent */}
        <DialogTitle className="sr-only">Quote Wizard</DialogTitle>
        <DialogDescription className="sr-only">
          Request a timber quote in 4 steps
        </DialogDescription>
        <QuoteWizard />
      </DialogContent>
    </Dialog>
  );
}
