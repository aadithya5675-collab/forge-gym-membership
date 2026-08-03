export type PageView = 'home' | 'facilities' | 'classes' | 'trainers' | 'membership' | 'contact';

export interface NavItem {
  id: PageView;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'classes', label: 'Classes' },
  { id: 'trainers', label: 'Coaches' },
  { id: 'membership', label: 'Membership' },
  { id: 'contact', label: 'Contact' },
];
