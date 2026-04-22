import { useState } from "react";
import "./App.css";
import "./Components/TopBar.jsx"
import TopBar from "./Components/TopBar.jsx";
export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TopBar/>
    </>
  );
}
