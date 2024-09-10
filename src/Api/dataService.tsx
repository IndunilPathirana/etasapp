import { DataObject } from "./DataStructure";

export const createDataSheet = (dataSheet: string): boolean => {
  try {
    const dataObject = localStorage.getItem("data");
    if (!dataObject) {
      const data: DataObject = {
        dataSheets: [
          {
            name: dataSheet,
            dataColumns: [],
          },
        ],
      };
      const stringifiedData = JSON.stringify(data);
      localStorage.setItem("data", stringifiedData);
    } else {
      const existingDataObject = JSON.parse(dataObject);
      if (!existingDataObject?.dataSheets) {
        existingDataObject.dataSheets = [];
      }
      const existingDataSheet = existingDataObject.dataSheets.find(
        (l: { name: string }) => l.name === dataSheet
      );
      console.log(existingDataSheet);
      if (existingDataSheet) {
        return false;
      }
      existingDataObject.dataSheets.push({ name: dataSheet, dataColumns: [] });
      const stringifiedData = JSON.stringify(existingDataObject);
      localStorage.setItem("data", stringifiedData);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getDataSheets = (): {
  name: string;
  dataColumns?: [];
}[] => {
  const dataObject = localStorage.getItem("data");

  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    if (existingDataObject?.dataSheets) {
      const dataSheets = existingDataObject?.dataSheets.map(
        (dataSheet: { name: string; dataColumns?: [] }) => dataSheet
      );
      return dataSheets;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const removeDataSheet = (index: number) => {
  const dataObject = localStorage.getItem("data");
  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    let dataSheets = [...existingDataObject.dataSheets];
    dataSheets.splice(index, 1);
    existingDataObject.dataSheets = dataSheets;
    const stringifiedData = JSON.stringify(existingDataObject);
    localStorage.setItem("data", stringifiedData);
  }
};

export const addDataColumn = (dataSheet: string, column: string): boolean => {
  console.log(dataSheet);
  try {
    const dataObject = localStorage.getItem("data");
    if (dataObject) {
      let existingDataObject = JSON.parse(dataObject);
      let filteredDataSheet = existingDataObject.dataSheets.find(
        (t: { name: string }) => t.name === dataSheet
      );
      console.log("Locator", filteredDataSheet);
      if (!filteredDataSheet?.dataColumns) {
        filteredDataSheet.dataColumns = [];
        filteredDataSheet.dataColumns.push(column);
      } else {
        filteredDataSheet.dataColumns.push(column);
      }

      const dataSheetIndex = existingDataObject.dataSheets.findIndex(
        (t: { name: string }) => t.name === dataSheet
      );
      existingDataObject.dataSheets[dataSheetIndex] = filteredDataSheet;
      console.log(existingDataObject);
      const stringifiedData = JSON.stringify(existingDataObject);
      localStorage.setItem("data", stringifiedData);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getDataColumns = (dataSheet: string): string[] => {
  const dataObject = localStorage.getItem("data");
  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    let filteredDataSheet = existingDataObject.dataSheets.find(
      (t: { name: string }) => t.name === dataSheet
    );
    if (filteredDataSheet?.dataColumns) {
      return filteredDataSheet?.dataColumns;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const addData = (
  dataSheet: string,
  data: {},
  onSuccess: () => void,
  onError: () => void
): boolean => {
  console.log(dataSheet);
  try {
    const dataObject = localStorage.getItem("data");
    if (dataObject) {
      let existingDataObject = JSON.parse(dataObject);
      let filteredDataSheet = existingDataObject.dataSheets.find(
        (t: { name: string }) => t.name === dataSheet
      );
      console.log("Locator", filteredDataSheet);
      if (!filteredDataSheet?.data) {
        filteredDataSheet.data = [];
        filteredDataSheet.data.push(data);
      } else {
        filteredDataSheet.data.push(data);
      }

      const dataSheetIndex = existingDataObject.dataSheets.findIndex(
        (t: { name: string }) => t.name === dataSheet
      );
      existingDataObject.dataSheets[dataSheetIndex] = filteredDataSheet;
      console.log(existingDataObject);
      const stringifiedData = JSON.stringify(existingDataObject);
      localStorage.setItem("data", stringifiedData);
    }
    onSuccess();
    return true;
  } catch (error) {
    console.log(error);
    onError();
    return false;
  }
};

export const getData = (
  dataSheet: string
): { id: string; [key: string]: string }[] => {
  const dataObject = localStorage.getItem("data");
  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    let filteredDataSheet = existingDataObject.dataSheets.find(
      (t: { name: string }) => t.name === dataSheet
    );
    if (filteredDataSheet?.data) {
      return filteredDataSheet?.data;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const editData = (
  dataSheet: string,
  data: { id: string; [key: string]: string },
  onSuccess: () => void,
  onError: () => void
): boolean => {
  try {
    const dataObject = localStorage.getItem("data");
    if (dataObject) {
      let existingDataObject = JSON.parse(dataObject);
      let filteredDataSheet = existingDataObject.dataSheets.find(
        (t: { name: string }) => t.name === dataSheet
      );
      let dataArray = filteredDataSheet.data;
      let dataIndex = filteredDataSheet?.data.findIndex(
        (d: { id: string; [key: string]: string }) => d.id === data.id
      );
      dataArray[dataIndex] = data;
      filteredDataSheet.data = dataArray;
      let filteredDataSheetIndex = existingDataObject.dataSheets.findIndex(
        (t: { name: string }) => t.name === dataSheet
      );
      existingDataObject.dataSheets[filteredDataSheetIndex] = filteredDataSheet;
      const stringifiedData = JSON.stringify(existingDataObject);
      localStorage.setItem("data", stringifiedData);
      onSuccess();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    onError();
    return false;
  }
};
