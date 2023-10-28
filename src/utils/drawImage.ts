export const drawImage = (videoElement: HTMLVideoElement) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL('image/jpeg');
};
