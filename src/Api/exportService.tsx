let initialObject = {
  launcher: {
    file: {
      name: "",
      tables: [
        {
          name: "",
          rows: [
            {
              cells: [
                {
                  name: "",
                  value: "",
                },
              ],
              size: 0,
            },
          ],
          size: 0,
        },
      ],
      size: 0,
    },
  },
  data: {
    tableSet: {
      name: "",
      tables: [],
      size: 0,
    },
  },
  locator: {
    tableSet: {
      name: "",
      tables: [],
      size: 0,
    },
  },
  tests: {
    folder: {
      name: "",
      files: [],
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

export const getJson = (): boolean => {
  try {
    getLaunchers();
    getData();
    getLocators();
    return true;
  } catch (error) {
    return false;
  }
};

const getLaunchers = () => {
  const dataObject = localStorage.getItem("data");
  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    const launchers = existingDataObject?.launchers;
    console.log(existingDataObject?.launchers);

    const transformedRows = launchers.map(
      (obj: {
        id: string;
        sheetName?: string;
        testSuite?: string;
        browser?: string;
        testType?: string;
        status?: string;
        dataSheet?: string;
        comment?: string;
      }) => ({
        cells: Object.entries(obj)
          .filter(([key]) => key !== "id") // Exclude "id"
          .map(([key, value]) => ({ name: key, value: value })), // Convert to name-value pairs
        size: Object.keys(obj).length - 1, // Calculate size excluding "id"
      })
    );
    initialObject.launcher.file.size = 1;
    initialObject.launcher.file.name = "Launcher";
    initialObject.launcher.file.tables[0].name = "json_demo";
    initialObject.launcher.file.tables[0].size = transformedRows.length;
    initialObject.launcher.file.tables[0].rows = transformedRows;

    console.log(initialObject);
    console.log(transformedRows);
  }
};

const getData = () => {
  const dataObject = localStorage.getItem("data");
  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    const dataSheets = existingDataObject?.dataSheets;
    console.log(existingDataObject?.dataSheets);

    const transformedTableSet = dataSheets.map(
      (obj: {
        name: string;
        dataColumns?: { id: string; column_name: string }[];
        data?: { id: string; [key: string]: string }[];
      }) => ({
        name: obj.name,
        rows: obj.data?.map(
          (data: { id: string; [key: string]: string }, index: number) => ({
            name: index + " row",
            cells: Object.entries(data)
              .filter(([key]) => key !== "id") // Exclude "id"
              .map(([key, value]) => ({ name: key, value: value })), // Convert to name-value pairs
            size: Object.keys(data).length - 1, // Calculate size excluding "id"
          })
        ),
        size: obj.data?.length,
      })
    );
    initialObject.data.tableSet.tables = transformedTableSet;
    initialObject.data.tableSet.size = existingDataObject?.dataSheets.length;
    console.log(initialObject);
  }
};

const getLocators = () => {
  const dataObject = localStorage.getItem("data");
  if (dataObject) {
    const existingDataObject = JSON.parse(dataObject);
    const locators = existingDataObject?.locators;
    console.log(existingDataObject?.locators);

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
        rows: obj.subLocators?.map(
          (
            data: {
              id: string;
              locator_name: string;
              locator_value: string;
            },
            index: number
          ) => ({
            name: index + " row",
            cells: Object.entries(data)
              .filter(([key]) => key !== "id") // Exclude "id"
              .map(([key, value]) => ({ name: key, value: value })), // Convert to name-value pairs
            size: Object.keys(data).length - 1, // Calculate size excluding "id"
          })
        ),
        size: obj.subLocators?.length,
      })
    );
    initialObject.locator.tableSet.tables = transformedTableSet;
    initialObject.locator.tableSet.size = existingDataObject?.locators.length;
    console.log(initialObject);
  }
};
