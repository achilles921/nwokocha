import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { observer } from 'mobx-react';

import Home from './views/Home';

// styles
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div id="app">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default observer(App);
