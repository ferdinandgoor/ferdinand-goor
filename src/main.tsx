import React from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./router";
import "./globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error('React mount point "#root" was not found.');
}

hydrateRoot(
  root,
  <React.StrictMode>
    <RouterProvider router={createRouter()} />
  </React.StrictMode>
);
