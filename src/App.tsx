import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import {
  LandingPage,
  ErrorPage,
  GamePage,
  Fallback
} from "./Routes/routes";

let router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />
    // children: [
    //   {
    //     path: "",
    //     element: <Outlet />,
    //     errorElement: <RootErrorBoundary />,
    //     children: [
    //       {
    //         path: "projects/:projectId",
    //         element: <Project />,
    //         errorElement: <ProjectErrorBoundary />,
    //         loader: projectLoader,
    //       },
    //     ],
    //   },
    // ],
  },
  {
    path: "games/:gameId",
    element: <GamePage />,
  },
]);

// if (import.meta.hot) {
//   import.meta.hot.dispose(() => router.dispose());
// }

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}