import { getTestSuites } from "../api/testSuiteService";
import Test from "../components/app/Test/Test";

type Route = {
  name: string;
  path: string;
  element: React.ReactNode;
};

// export const getChildrenRoutes = () =>
//   getTestSuites().map((testSuite, index) => ({
//     name: testSuite.name,
//     path: "/" + testSuite.name,
//     element: <Test />,
//   }));
