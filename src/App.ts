import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";

const AppRoutes = () => {
  let routes = useRoutes([{ path: "/", element: <Layout /> }]);
  return routes;
};

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
