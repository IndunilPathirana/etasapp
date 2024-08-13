import { DataObject } from "./DataStructure";

export const createTestSuite = (testSuite: string): boolean => {
  try {
    const dataObject = localStorage.getItem("data");
    if (!dataObject) {
      const data: DataObject = {
        testSuites: [
          {
            name: testSuite,
            testSheets: [],
          },
        ],
      };
      const stringifiedData = JSON.stringify(data);
      localStorage.setItem("data", stringifiedData);
    } else {
      const existingDataObject = JSON.parse(dataObject);
      const existingTestSuite = existingDataObject.testSuites.find(
        (test:{name: string}) => test.name === testSuite);
      console.log(existingTestSuite)
      if (existingTestSuite) {
        return false;
      }
      existingDataObject.testSuites.push({ name: testSuite });
      const stringifiedData = JSON.stringify(existingDataObject);
      localStorage.setItem("data", stringifiedData);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getTestSuites = (): { name: string }[] => {
  const dataObject = localStorage.getItem("data");

  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    const testSuites = existingDataObject.testSuites.map(
      (test: { name: string }) => test
    );
    return testSuites;
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
