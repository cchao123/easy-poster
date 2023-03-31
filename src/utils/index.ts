export * from './DOM';
export * from './canvas';
export * from './util';


export const base64Toblob = (base64: string)=> {
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));
  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  const blob = new Blob([array], { type: contentType });
  let blobUrl = URL.createObjectURL(blob);
  return blobUrl;
}