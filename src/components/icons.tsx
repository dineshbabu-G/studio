import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.5 8.82a2 2 0 0 1 .5-1.41l6.17-6.18a2 2 0 0 1 2.83 0l6.17 6.18a2 2 0 0 1 .5 1.41V19a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2v-3.33" />
      <path d="M3 21V10" />
      <path d="m15 15-3 3-3-3" />
    </svg>
  );
}
