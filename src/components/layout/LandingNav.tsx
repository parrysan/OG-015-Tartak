import { Phone } from 'lucide-react';

export function LandingNav() {
  return (
    <header className="fixed top-0 z-50 w-full h-14 bg-background shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <span className="text-xl font-bold text-primary">Tartak-Budrol</span>
        <a
          href="tel:+48504251535"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <Phone className="h-4 w-4" />
          504 251 535
        </a>
      </div>
    </header>
  );
}
