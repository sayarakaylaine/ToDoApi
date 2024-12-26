import React from "react";
import { TodoProvider } from "./contexts/TodoContext.js";
import HomeScreen from "./components/HomeScreen.js";

export default function App() {
  return (
    <TodoProvider>
      <HomeScreen />
    </TodoProvider>
  );
}

