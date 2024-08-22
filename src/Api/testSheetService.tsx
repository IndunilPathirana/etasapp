import { DataObject } from "./DataStructure";

export const createTestSheet = (
  testSheet: {
    id: string;
    command?: string;
    data?: string;
    locator?: string;
  },
  testSuite: string,
  onSuccess: () => void,
  onError: () => void
): boolean => {
  try {
    console.log(testSheet, testSuite);
    const dataObject = localStorage.getItem("data");
    if (dataObject) {
      let existingDataObject = JSON.parse(dataObject);
      
      let filteredTestSuite = existingDataObject.testSuites.find(
        (t: { name: string }) => t.name === testSuite
      );
      console.log("test suites", filteredTestSuite);
      if (!filteredTestSuite?.testSheets) {
        filteredTestSuite.testSheets = [];
        filteredTestSuite.testSheets.push(testSheet);
      } else {
        filteredTestSuite.testSheets.push(testSheet);
      }
      
      const testSuiteIndex = existingDataObject.testSuites.findIndex(
        (t: { name: string }) => t.name === testSuite
      );
      existingDataObject.testSuites[testSuiteIndex] = filteredTestSuite;
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

export const getTestSheets = (testSuite: string) => {
  try {
    const dataObject = localStorage.getItem("data");
    if (dataObject) {
      let existingDataObject = JSON.parse(dataObject);
      console.log(existingDataObject);
      let filteredTestSuite = existingDataObject.testSuites.find(
        (t: { name: string }) => t.name === testSuite
      );
      console.log(filteredTestSuite.testSheets);
      return filteredTestSuite.testSheets;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeTestSheet = (
  testSuite: string,
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
      let filteredTestSuite = existingDataObject.testSuites.find(
        (t: { name: string }) => t.name === testSuite
      );
      let filteredTestSheets = filteredTestSuite.testSheets.filter(
        (testSheet: {
          id: string;
          command?: string;
          data?: string;
          locator?: string;
        }) => testSheet.id !== id
      );
      filteredTestSuite.testSheets = filteredTestSheets;
      let filteredTestSuiteIndex = existingDataObject.testSuites.findIndex(
        (t: { name: string }) => t.name === testSuite
      );
      existingDataObject[filteredTestSuiteIndex] = filteredTestSuite;
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
