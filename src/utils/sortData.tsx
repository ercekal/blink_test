const sortData = <T,>(data: T[], key: keyof T): T[] => {
  return data.slice().sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });
};

export default sortData;
