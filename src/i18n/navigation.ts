import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

const nav = createNavigation(routing);

// Use plain <a> Link to avoid broken client-side RSC routing in static export
export { Link } from './StaticLink';
export const { redirect, useRouter, usePathname } = nav;
