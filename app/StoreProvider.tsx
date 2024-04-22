"use client";
import React from "react";

import { Provider } from "react-redux";
import { store } from "./lib/Store";

function StoreProvider({ children }: { children: any }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;