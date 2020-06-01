import { math } from 'polished';
import breakpoints from './breakpoints';

export const smallScreenCss = style => `
  @media (max-width: ${breakpoints.md}) {
    ${style}
  }
`;

export const bigScreenCss = style => `
  @media (min-width: ${math(`${breakpoints.md} + 1px`)}) {
    ${style}
  }
`;
