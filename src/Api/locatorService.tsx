import { DataObject } from "./dataStructure/DataStructure";

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
        testSuites: [],
      };
      const stringifiedData = JSON.stringify(data);
      localStorage.setItem("data", stringifiedData);
    } else {
      const existingDataObject = JSON.parse(dataObject);
      if (!existingDataObject?.locators) {
        existingDataObject.locators = [];
      }
      const existingLocator = existingDataObject.locators.find(
        (l: { name: string }) => l.name === '#Loc.' +locator
      );
      console.log(existingLocator);
      if (existingLocator) {
        return false;
      }
      existingDataObject.locators.push({ name: '#Loc.' +locator });
      const stringifiedData = JSON.stringify(existingDataObject);
      localStorage.setItem("data", stringifiedData);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getLocators = (): {
  name: string;
  subLocators?: {
    id: string;
    locator_name: string;
    locator_value: string;
  }[];
}[] => {
  const dataObject = localStorage.getItem("data");

  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    if (existingDataObject?.locators) {
      const locators = existingDataObject?.locators.map(
        (locator: {
          name: string;
          subLocators?: {
            id: string;
            locator_name?: string;
            locator_value?: string;
          }[];
        }) => locator
      );
      return locators;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const removeLocator = (index: number) => {
  const dataObject = localStorage.getItem("data");
  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    let locators = [...existingDataObject.locators];
    locators.splice(index, 1);
    existingDataObject.locators = locators;
    const stringifiedData = JSON.stringify(existingDataObject);
    localStorage.setItem("data", stringifiedData);
  }
};
