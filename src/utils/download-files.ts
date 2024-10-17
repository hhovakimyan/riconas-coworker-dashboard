const onDownload = (blobUrl: string, filename: string) => {
  const link = document.createElement("a");
  link.download = filename;
  link.href = blobUrl;
  link.click();
  link.remove();
};

// Current blob size limit is around 500MB for browsers
export const downloadFile = (url: string, filename?: string) => {
  if (!filename) {
    filename = url.split('\\')?.pop()?.split('/')?.pop();
  }

  fetch(url, {
    headers: new Headers({
      'Origin': window.location.origin
    }),
    mode: 'cors'
  })
    .then(response => response.blob())
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      onDownload(blobUrl, filename || '');
    })
    .catch(e => console.error(e));
}