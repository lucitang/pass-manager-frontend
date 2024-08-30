import React from "react";

import { Routing } from "./Routes";
import { Provider } from "react-redux";
import { store } from "./State/Store";

function App() {
  return ( 
    <Provider store={store} >
      <Routing />
    </Provider>
  );
}

export default App;
