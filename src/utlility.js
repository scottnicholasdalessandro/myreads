export const flatten = readingList => {
  return Object.keys(readingList).reduce((prev, curr) => {
    return Array.isArray(readingList[curr]) && prev.concat(readingList[curr]);
  }, []);
};