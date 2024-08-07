import { DataObject } from "./DataStructure";

export const createTestSheet = (
  testSheet: {
    id: number;
    command?: string;
    data?: string;
    locator?: string;
  },
  testSuite: string
): boolean => {
  try {
    console.log(testSheet, testSuite);
    const dataObject = localStorage.getItem("data");
    if (dataObject) {
      let existingDataObject = JSON.parse(dataObject);
    console.log(existingDataObject);
      let filteredTestSuite = existingDataObject.testSuites.find(
        (t: { name: string }) => t.name === testSuite
      );
      console.log(filteredTestSuite)
      if (!filteredTestSuite?.testSheets) {
        filteredTestSuite.testSheets = [];
        filteredTestSuite.testSheets.push(testSheet);
      }else{
        filteredTestSuite.testSheets.push(testSheet);
      }
      
    //console.log(filteredTestSuite);
      const testSuiteIndex = existingDataObject.testSuites.findIndex(
        (t: { name: string }) => t.name === testSuite
      );
      existingDataObject.testSuites[testSuiteIndex] = filteredTestSuite
      console.log(existingDataObject)
      const stringifiedData = JSON.stringify(existingDataObject);
      localStorage.setItem("data", stringifiedData);
    }

    //   existingDataObject.testSuites.push({ name: testSuite });
      

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};


export const getTestSheets = (
    testSuite: string
  ) => {
    try {
      
      const dataObject = localStorage.getItem("data");
      if (dataObject) {
        let existingDataObject = JSON.parse(dataObject);
        console.log(existingDataObject);
        let filteredTestSuite = existingDataObject.testSuites.find(
          (t: { name: string }) => t.name === testSuite
        );
        console.log(filteredTestSuite.testSheets)
        return filteredTestSuite.testSheets ;
    }
    } catch (error) {
      console.log(error);
      return false;
    }
  };