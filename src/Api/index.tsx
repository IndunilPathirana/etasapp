// Utility function to fetch data from localStorage
export const getLocalStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Utility function to transform rows
export const transformRows = (data: any[], excludeKey: string = "id") => {
  return data.map((obj) => ({
    name: "",
    cells: Object.entries(obj)
      .filter(([key]) => key !== excludeKey)
      .map(([key, value]) => ({ name: key, value: value })),
    size: Object.keys(obj).length - 1,
  }));
};
