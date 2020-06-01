export function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function execIfBrowser(fn) {
  if (isBrowser()) {
    return fn();
  }
  return null;
}

export function refineHTMLContent(html) {
  if (!html) {
    return html;
  }

  const splitOpenBodyTag = html.split('<body>');
  const splitCloseBodyTag = splitOpenBodyTag[1].split('</body>');
  const part1 = splitOpenBodyTag[0].split('<br />').join('');
  const part2 = splitCloseBodyTag[0];
  const part3 = splitCloseBodyTag[1].split('<br />').join('');

  return `${part1}<body>${part2}</body>${part3}`;
}

export function commafy(num) {
  const str = num.toString().split(',');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}
