import { ReactNode } from 'react';

interface FaqAccordionProperties {
  children: ReactNode;
  title?: string;
  isOpen?: boolean;
  className?: string;
  handleType?: 'manual' | 'auto';
  onClick?: () => {};
}

export type { FaqAccordionProperties };
