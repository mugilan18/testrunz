import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import AppRouter from "./Components/RouterComponent/RouterComponent";
import Container from "@material-ui/core/Container";

import Appuserstate from "../src/Components/RouterComponent/user/data/Appuserstate"


function App() {
  
  return (
    <div>
      <Appuserstate >
      <NavBar />
      <Container>
        <AppRouter />
      </Container>
      </Appuserstate>
    </div>
  );
}

export default App;
