import { Route } from "react-router-dom";
import { Route as R, routes } from "./routes";

export const Router = routes.map((route:R) => {
  if (route.children) {
    return (
      <>
        {route.children.map((childRoute) => {
        //   if (childRoute.children) {
        //     return (
        //       <>
        //         {childRoute.children.map((childRouteChild) => (
        //           <Route
        //             key={route.path + childRoute.path + childRouteChild.path}
        //             path={route.path + childRoute.path + childRouteChild.path}
        //             element={childRoute.path}
        //           />
        //         ))}
        //       </>
        //     );
        //   }
          return (
            <Route
              key={route.path + childRoute.path}
              path={route.path + childRoute.path}
              element={childRoute.element}
            />
          );
        })}
      </>
    );
  }
  return (
    <Route
      key={route.path}
      path={route.path}
      element={route.element}
    />
  );
});
