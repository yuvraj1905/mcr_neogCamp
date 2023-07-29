export const useVideoCategoryFilter = (whatToFilter, propValue, allVideos) => {
  let results = allVideos?.filter(
    (videos) => videos[whatToFilter] === propValue
  );
  return results;
};
