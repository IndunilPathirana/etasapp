import { useState, useEffect, useCallback } from "react";
import {
  createTestSuite,
  getTestSuites,
  removeTestSuite,
} from "../api/testSuiteService";
import Test from "../components/app/Test/Test";

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
}

export const useRoutes = (staticRoutes: Route[]): UseRoutesReturnType => {
  const [routes, setRoutes] = useState<Route[]>(staticRoutes);

  const fetchTestSuites = (async () => {
    console.log("executed again")
    try {
      const testSuites = getTestSuites();
      const childrenRoutes = testSuites.map((testSuite) => ({
        name: testSuite.name,
        path: `/test/${testSuite.name}`,
        element: <Test />,
        isSideBar: true,
      }));
      const updatedRoutes = staticRoutes.map((route) => {
        if (route.name === "Test") {
          return { ...route, children: childrenRoutes };
        }
        return route;
      });
      setRoutes(updatedRoutes);
    } catch (error) {
      console.error("Error fetching test suites:", error);
    }
  });

  useEffect(() => {
    fetchTestSuites();
  }, []);

  const addTestSuite =  (newTestSuite: string) => {
    createTestSuite(newTestSuite);
    // Add your logic to add the test suite to the backend or state
     fetchTestSuites(); // Refresh routes
     return true
  };

  const deleteTestSuite = async (index: number) => {
    // Add your logic to delete the test suite from the backend or state
    removeTestSuite(index);
    await fetchTestSuites(); // Refresh routes
  };

  return {
    routes,
    addTestSuite,
    deleteTestSuite,
  };
};
