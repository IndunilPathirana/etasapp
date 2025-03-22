import { getLocalStorageData, transformRows } from ".";
import { ExportDataObject } from "./exportDataStructure/ExportJson";

let initialObject = {
  launcher: {
    file: {
      name: "",
      tables: [
        {
          name: "",
          rows: [{ name: "", cells: [], size: 0 }],
          size: 0,
        },
      ],
      size: 0,
    },
  },
  data: {
    tableSet: {
      name: "",
      tables: [
        {
          name: "",
          rows: [
            {
              name: "",
              cells: [],
              size: 0,
            },
          ],
          size: 0,
        },
      ],
      size: 0,
    },
  },
  locator: {
    tableSet: {
      name: "",
      tables: [
        {
          name: "",
          rows: [{ name: "", cells: [], size: 0 }],
          size: 0,
        },
      ],
      size: 0,
    },
  },
  tests: {
    folder: {
      name: "Tests",
      files: [
        {
          name: "",
          tables: [
            {
              name: "",
              rows: [{ name: "", cells: [], size: 0 }],
              size: 0,
            },
          ],
          size: 0,
        },
      ],
      size: 0,
    },
  },
  components: {
    folder: {
      name: "",
      files: [],
      size: 0,
    },
  },
};

export const getJson = (): ExportDataObject => {
  try {
    return {
      launcher: getLaunchers(),
      data: getData(),
      locator: getLocators(),
      tests: getTests(),
      components: { folder: { name: "", files: [], size: 0 } },
    };
  } catch (error) {
    console.error("Error generating JSON:", error);
    return initialObject;
  }
};

const getLaunchers = () => {
  try {
    const existingDataObject = getLocalStorageData("data");
    const launchers = existingDataObject?.launchers;
    if (launchers) {
      return {
        file: {
          name: "Launcher",
          tables: [
            {
              name: "json_demo",
              rows: transformRows(launchers),
              size: launchers.length,
            },
          ],
          size: 1,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching launchers:", error);
  }
  return initialObject.launcher;
};

const getData = () => {
  try {
    const existingDataObject = getLocalStorageData("data");
    const dataSheets = existingDataObject?.dataSheets;
    if (dataSheets) {
      const transformedTableSet = dataSheets.map(
        (obj: {
          name: string;
          dataColumns?: { id: string; column_name: string }[];
          data: { id: string; [key: string]: string }[];
        }) => ({
          name: obj.name,

          rows: transformRows(obj?.data),
          size: obj.data?.length,
        })
      );

      return {
        tableSet: {
          name: "",
          tables: transformedTableSet,
          size: existingDataObject?.dataSheets.length,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return initialObject.data;
};

const getLocators = () => {
  try {
    const existingDataObject = getLocalStorageData("data");
    const locators = existingDataObject?.locators;
    if (locators) {
      const transformedTableSet = locators.map(
        (obj: {
          name: string;
          subLocators: {
            id: string;
            locator_name: string;
            locator_value: string;
          }[];
        }) => ({
          name: obj.name,

          rows: transformRows(obj.subLocators),
          size: obj.subLocators?.length,
        })
      );
      return {
        tableSet: {
          name: "",
          tables: transformedTableSet,
          size: locators.length,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching locators:", error);
  }
  return initialObject.locator;
};

const getTests = () => {
  try {
    const existingDataObject = getLocalStorageData("data");
    const testSuites = existingDataObject?.testSuites;
    if (testSuites) {
      const transformedTableSet = testSuites.map(
        (obj: {
          name: string;
          testSheets: {
            id: number;
            command?: string;
            data?: string;
            locator?: string;
          }[];
        }) => ({
          name: obj.name,

          rows: transformRows(obj.testSheets),
          size: obj.testSheets?.length,
        })
      );
      return {
        folder: {
          name: "Tests",
          files: [
            {
              name: "",
              tables: transformedTableSet,
              size: 0,
            },
          ],
          size: testSuites.length,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching tests:", error);
  }
  return initialObject.tests;
};
