import { ReactNode } from 'react';

export default function TableHeaderRow({ children }: { children: ReactNode }) {
  return <tr>{children}</tr>;
}
