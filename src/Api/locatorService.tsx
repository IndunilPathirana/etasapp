import { DataObject } from "./DataStructure";

export const createLocator = (locator: string): boolean => {
  try {
    const dataObject = localStorage.getItem("data");
    if (!dataObject) {
      const data: DataObject = {
        locators: [
          {
            name: locator,
            subLocators: [],
          },
        ],
      };
      const stringifiedData = JSON.stringify(data);
      localStorage.setItem("data", stringifiedData);
    } else {
      const existingDataObject = JSON.parse(dataObject);
      if(!existingDataObject?.locators){
        existingDataObject.locators = []
      }
      const existingLocator = existingDataObject.locators.find(
        (l:{name: string}) => l.name === locator);
      console.log(existingLocator)
      if (existingLocator) {
        return false;
      }
      existingDataObject.locators.push({ name: locator });
      const stringifiedData = JSON.stringify(existingDataObject);
      localStorage.setItem("data", stringifiedData);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getLocators = (): { name: string }[] => {
  const dataObject = localStorage.getItem("data");

  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    const locators = existingDataObject.locators.map(
      (locator: { name: string }) => locator
    );
    return locators;
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
