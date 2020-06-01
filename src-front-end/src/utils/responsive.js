import styled from 'styled-components';

const buildStyles = rulesets =>
  rulesets.reduce(
    (cssString, { constraint, width, rules }) =>
      `${cssString} @media (${constraint}-width: ${width}) { ${rules} }`,
    ''
  );

export function makeResponsive(rulesets, tagName = 'div') {
  return styled(tagName)`
    ${buildStyles(rulesets)}
  `;
}

export function hideAt(breakpoints) {
  const rulesets = Object.entries(breakpoints).reduce(
    (result, [constraint, width]) => [
      ...result,
      {
        constraint,
        width,
        rules: 'display: none;',
      },
    ],
    []
  );

  return makeResponsive(rulesets);
}
