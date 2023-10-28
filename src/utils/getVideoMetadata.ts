const FILE_EXTENSION_REGEXP = /\.[^/.]+$/;

const ONE_MEGABYTE = 1024 * 1024;

export const getVideoMetadata = (file: File) => {
  const title = file.name.replace(FILE_EXTENSION_REGEXP, '');
  const fileExtension = file.type.slice(5);
  const fileSize = Math.round(file.size / ONE_MEGABYTE);

  return {
    title,
    fileExtension,
    fileSize,
  };
};
