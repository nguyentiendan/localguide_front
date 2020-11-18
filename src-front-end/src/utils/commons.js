import _ from 'lodash';

export function getCndResourceUrl(resourceName) {
  return `${process.env.GATSBY_CDN_URL}/${resourceName}`;
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export async function safeFuncCall(func) {
  try {
    return await func.call();
  } catch (e) {
    console.error(e);
  }
  return new Promise(resolve => resolve());
}

export function resizeImageGallery({ useRef, photos, useStateSetWidth }) {
  if (!useRef || !useRef.current || !photos) {
    return () => {};
  }
  const updateSize = _.debounce(() => {
    const wrapperWidth = useRef.current.offsetWidth;
    const maxColumn = Math.round(wrapperWidth / 275);
    const minColumn = 2;
    const maxRows = Math.ceil(photos.length / ((maxColumn + minColumn) / 2));
    let widths = [];
    for (let i = 0; i < maxRows; i++) {
      const randomColumns = Math.floor(Math.random() * (maxColumn - minColumn + 1) + minColumn);
      const minWidth = (wrapperWidth * 0.6) / randomColumns;
      const maxWidth = (wrapperWidth * 1.25) / randomColumns;
      const rowWidths = [];
      for (let j = 0; j < randomColumns; j++) {
        if (widths.length === photos.length - 1) {
          rowWidths.push(wrapperWidth - _.sum(rowWidths));
          break;
        } else if (j === randomColumns - 1) {
          rowWidths.push(wrapperWidth - _.sum(rowWidths));
        } else {
          rowWidths.push(Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth));
        }
      }
      widths = [...widths, ...rowWidths];
    }
    useStateSetWidth(widths);
  }, 350);
  window.addEventListener('resize', updateSize);
  updateSize();
  return () => window.removeEventListener('resize', updateSize);
}
