import React, {useReducer} from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes";
import { AppProvider, initialState } from "./context/context";
import reducer from "./context/reducer";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <AppProvider value={{state, dispatch}}>
        <h1>Hola mundo</h1>
      {/* <Router>
        {AppRouter.map(route => (
          <Route
            key={route.id}
            component={route.main}
            path={route.path}
            exact={route.exact}
          />
        ))}
      </Router> */}
      </AppProvider>
    </div>
  );
};

export default App;
