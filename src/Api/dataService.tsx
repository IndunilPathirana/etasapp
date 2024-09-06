import { DataObject } from "./DataStructure";

export const addDataColumn = (column: string): boolean => {
  try {
    const dataObject = localStorage.getItem("data");
    if (!dataObject) {
      let dataColumns = [];
      dataColumns.push(column);
      const data: DataObject = {
        dataColumns: dataColumns,
      };
      const stringifiedData = JSON.stringify(data);
      localStorage.setItem("data", stringifiedData);
    } else {
      const existingDataObject = JSON.parse(dataObject);
      if (!existingDataObject?.dataColumns) {
        existingDataObject.dataColumns = [];
      }
      const existingDataColumns = existingDataObject.dataColumns.find(
        (dataColumn: string) => dataColumn === column
      );

      if (existingDataColumns) {
        return false;
      }

      existingDataObject.dataColumns.push(column);
      const stringifiedData = JSON.stringify(existingDataObject);
      localStorage.setItem("data", stringifiedData);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getDataColumns = (): string [] => {
  const dataObject = localStorage.getItem("data");
  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    if (existingDataObject?.dataColumns) {
      const dataColumns = existingDataObject?.dataColumns.map(
        (column: string) => column
      );
      return dataColumns;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const removeTestSuite = (index: number) => {
  const dataObject = localStorage.getItem("data");
  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    let testSuites = [...existingDataObject.testSuites];
    testSuites.splice(index, 1);
    existingDataObject.testSuites = testSuites;
    const stringifiedData = JSON.stringify(existingDataObject);
    localStorage.setItem("data", stringifiedData);
  }
};
