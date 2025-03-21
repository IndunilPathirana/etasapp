import { DataObject } from "./dataStructure/DataStructure";

// {
//     "suiteId" : null,
//     "fileName" : "ETAS3 Demo",
//     "tests" : [ {
//       "sheetName" : "Dashboard",
//       "testCase" : "Dashboard",
//       "browser" : "CHROME",
//       "type" : "SEQUENTIAL",
//       "enabled" : false,
//       "dataSheet" : "TC_001",
//       "comments" : "",
//       "groups" : [ ],
//       "startTime" : null,
//       "endTime" : null,
//       "status" : null,
//       "testSettings" : {
//         "implicitWait" : 0,
//         "fluentCapture" : true,
//         "retryCount" : 5,
//         "retryWait" : 2000,
//         "scrollIntoView" : true,
//         "conditionalWait" : 20,
//         "defaultWait" : -1,
//         "browser" : null
//       },]



export const getJson = () => {
  try {
    const dataObject = localStorage.getItem("data");

    if (dataObject) {
      let existingDataObject = JSON.parse(dataObject);
      return existingDataObject.launchers || [];
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
