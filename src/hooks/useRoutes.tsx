import { useState, useEffect } from "react";
import {
  createTestSuite,
  getTestSuites,
  removeTestSuite,
} from "../api/testSuiteService";
import Test from "../components/app/Test/Test";
import { createLocator, getLocators } from "../api/locatorService";
import Locator from "../components/app/Locator/Locator";

type Route = {
  name?: string;
  path: string;
  element: React.ReactNode;
  isSideBar: boolean;
  icon?: React.ReactNode;
  children?: {
    name: string;
    path: string;
    element: React.ReactNode;
    isSideBar?: boolean;
  }[];
};

interface UseRoutesReturnType {
  routes: Route[];
  addTestSuite: (newTestSuite: string) => boolean;
  deleteTestSuite: (testSuiteId: number) => Promise<void>;
  addLocator: (newLocator: string) => boolean;
  deleteLocator: (LocatorId: number) => Promise<void>;
}

export const useRoutes = (staticRoutes: Route[]): UseRoutesReturnType => {
  const [routes, setRoutes] = useState<Route[]>(staticRoutes);

  const fetchModifiedRoutes = async () => {
    console.log("executed again");
    try {
      const testSuites = getTestSuites();
      const locators = getLocators();
      const childrenRoutesTest = testSuites?.map((testSuite) => ({
        name: testSuite.name,
        path: `/test/${testSuite.name}`,
        element: <Test />,
        isSideBar: true,
      }));
      const childrenRoutesLocator = locators?.map((locator) => ({
        name: locator.name,
        path: `/locator/${locator.name}`,
        element: <Locator />,
        isSideBar: true,
      }));
      const updatedRoutes = staticRoutes.map((route) => {
        if (route.name === "Test") {
          return { ...route, children: childrenRoutesTest };
        }
        if(route.name === "Locator"){
          return { ...route, children: childrenRoutesLocator };
        }
        return route;
      });
      console.log(updatedRoutes)
      setRoutes(updatedRoutes);
    } catch (error) {
      console.error("Error fetching test suites:", error);
    }
  };

  useEffect(() => {
    fetchModifiedRoutes();
  }, []);

  const addTestSuite = (newTestSuite: string) => {
    const response = createTestSuite(newTestSuite);
    if (response) {
      //Add your logic to add the test suite to the backend or state
      fetchModifiedRoutes(); // Refresh routes
      return true;
    } else {
      return false;
    }
  };

  const addLocator = (locator: string) => {
    const response = createLocator(locator);
    if (response) {
      //Add your logic to add the test suite to the backend or state
      fetchModifiedRoutes(); // Refresh routes
      return true;
    } else {
      return false;
    }
  };

  const deleteTestSuite = async (index: number) => {
    //Add your logic to delete the test suite from the backend or state
    removeTestSuite(index);
    fetchModifiedRoutes()
   // await fetchTestSuites(); // Refresh routes
  };

  const deleteLocator = async (index: number) => {
    //Add your logic to delete the test suite from the backend or state
    removeTestSuite(index);
   // await fetchTestSuites(); // Refresh routes
  };

  return {
    routes,
    addTestSuite,
    deleteTestSuite,
    addLocator,
    deleteLocator,
  };
};
