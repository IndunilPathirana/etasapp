import { DataObject } from "./dataStructure/DataStructure";

export const createLauncher = (
  launcher: {
    id:string;
    sheetName?: string;
    testSuite?: string;
    browser?: string;
    testType?: string;
    status?: string;
    dataSheet?: string;
    comment?: string;
  },
  onSuccess: () => void,
  onError: () => void
): boolean => {
  try {
    const dataObject = localStorage.getItem("data");
    if (!dataObject) {
      onError();
      return false;
    } else {
      const existingDataObject = JSON.parse(dataObject);
      if (!existingDataObject.launchers) {
        existingDataObject.launchers = [];
      }
      existingDataObject.launchers.push(launcher);
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

export const getLaunchers = () => {
  try {
    const dataObject = localStorage.getItem("data");
    
    if (dataObject) {
      let existingDataObject = JSON.parse(dataObject);
      return existingDataObject.launchers || [];
    }
    return []
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const removeLauncher = (
  id: string,
  onSuccess: () => void,
  onError: () => void
): boolean => {
  console.log("remove test Sheets");
  try {
    const dataObject = localStorage.getItem("data");
    if (dataObject) {
      let existingDataObject = JSON.parse(dataObject);
      console.log(existingDataObject);
      let filteredLaunchers = existingDataObject.launchers.filter(
        (launcher : { id: string }) => launcher.id !== id
      );
      existingDataObject.launchers = filteredLaunchers;
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
