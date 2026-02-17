import { useState } from "react";
import "./App.css";
import MainDiv from "./components/__organisms/maindiv/maindiv";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MainDiv />
    </>
  );
}

export default App;
