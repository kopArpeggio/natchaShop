export const getImageUrl = (filename) => {
  return `${import.meta.env.REACT_APP_UPLOAD_HOST}/${
    import.meta.env.REACT_APP_IMAGE_PATH
  }/${filename}`;
};
