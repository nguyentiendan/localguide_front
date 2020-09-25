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
