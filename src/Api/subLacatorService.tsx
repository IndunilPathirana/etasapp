export const createSubLocator = (
  subLocator: {
    id: string;
    locator_name?: string;
    locator_value?: string;
  },
  locator: string,
  onSuccess: () => void,
  onError: () => void
): boolean => {
  try {
    console.log("Locator", locator);
    const dataObject = localStorage.getItem("data");
    if (dataObject) {
      let existingDataObject = JSON.parse(dataObject);

      let filteredLocator = existingDataObject.locators.find(
        (t: { name: string }) => t.name === locator
      );
      console.log("Locator", filteredLocator);
      if (!filteredLocator?.subLocators) {
        filteredLocator.subLocators = [];
        filteredLocator.subLocators.push(subLocator);
      } else {
        filteredLocator.subLocators.push(subLocator);
      }

      const locatorIndex = existingDataObject.locators.findIndex(
        (t: { name: string }) => t.name === locator
      );
      existingDataObject.locators[locatorIndex] = filteredLocator;
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

export const getSubLocators = (locator: string) => {
  try {
    const dataObject = localStorage.getItem("data");
    if (dataObject) {
      let existingDataObject = JSON.parse(dataObject);
      console.log(existingDataObject);
      let filteredLocator = existingDataObject.locators.find(
        (t: { name: string }) => t.name === locator
      );
      console.log(filteredLocator.subLocators);
      return filteredLocator.subLocators;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeSubLocator = (
  locator: string,
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
      let filteredlocator = existingDataObject.locators.find(
        (t: { name: string }) => t.name === locator
      );
      console.log(filteredlocator)
      let filteredSubLocators = filteredlocator.subLocators.filter(
        (subLocator: {
          id: string;
          locator_value?: string;
          locator_name?: string;
        }) => subLocator.id !== id
      );
      console.log(filteredSubLocators)
      filteredlocator.subLocators = filteredSubLocators;
      let filteredLocatorIndex = existingDataObject.locators.findIndex(
        (t: { name: string }) => t.name === locator
      );
      existingDataObject.locators[filteredLocatorIndex] = filteredlocator;
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
