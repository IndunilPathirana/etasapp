export type DataObject = {
  testSuites?: {
    name: string;
    testSheets?: {
      id: number;
      command?: string;
      data?: string;
      locator?: string;
    }[];
  }[];
  launchers?:{
    id: string;
    sheetName?:string;
    testSuite?:string;
    browser?:string;
    testType?:string;
    status?:string;
    dataSheet?:string;
    comment?:string
  }[];
  locators?:{
     name:string;
     subLocators:{
      id:string;
      locator_name:string;
      locator_value:string
     }[]
  }[];
  dataSheets?:{
    name:string;
    dataColumns?:string []
  }[];
  dataColumns?:string []
};
