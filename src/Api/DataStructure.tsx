export type DataObject = {
  testSuites: {
    name: string;
    testSheets?: {
      id: number;
      command?: string;
      data?: string;
      locator?: string;
    }[];
  }[];
};
