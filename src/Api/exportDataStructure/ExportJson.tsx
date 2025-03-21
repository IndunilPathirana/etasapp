export type ExportDataObject = {
    launcher: {
      file: {
        name: string;
        tables: {
          name: string;
          rows: {
            name: string;
            cells: {
              name: string;
              value: string;
            }[];
            size: number;
          }[];
          size: number;
        }[];
        size: number;
      };
    };
    data: {
      tableSet: {
        name: string;
        tables: {
          name: string;
          rows: {
            name: string;
            cells: {
              name: string;
              value: string;
            }[];
            size: number;
          }[];
          size: number;
        }[];
        size: number;
      };
    };
    locator: {
      tableSet: {
        name: string;
        tables: {
          name: string;
          rows: {
            name: string;
            cells: {
              name: string;
              value: string;
            }[];
            size: number;
          }[];
          size: number;
        }[];
        size: number;
      };
    };
    tests: {
      folder: {
        name: string;
        files: {
          name: string;
          tables: {
            name: string;
            rows: {
              name: string;
              cells: {
                name: string;
                value: string;
              }[];
              size: number;
            }[];
            size: number;
          }[];
          size: number;
        }[];
        size: number;
      };
    };
    components: {
      folder: {
        name: string | null;
        files: any[];
        size: number;
      };
    };
  };