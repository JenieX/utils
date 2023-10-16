function saveFile(blob: Blob, fileName: string): void {
  const blobURL = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobURL;
  link.download = fileName;
  link.dispatchEvent(new MouseEvent('click'));

  window.setTimeout(() => window.URL.revokeObjectURL(blobURL), 1000);
}

export default saveFile;
