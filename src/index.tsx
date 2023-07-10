import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(<App />);

// ReactDOM.render(<App />, rootElement); <- react 18환경에서 17버전으로 컴파일되도록 만들어준다.
