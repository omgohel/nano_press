import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import { Header } from "./components/UI/Header/Header";
import News from "./components/UI/News/News";

const App = () => {
  return (
    <div>
      <Header />
      <News />
    </div>
  );
};

export default App;
