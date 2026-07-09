import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/app/App";
import { ArticlePage } from "@/pages/ArticlePage";
import { HomePage } from "@/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "article/:id",
        element: <ArticlePage />,
      },
    ],
  },
]);
