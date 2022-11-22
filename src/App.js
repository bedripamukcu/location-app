import "./App.css";
import Header from "./components/Header";
import styled from "styled-components";
import Back from "./components/Back";

function App() {
  return (
    <div>
      <Header />
      <Main>
        <Back/>
      </Main>
    </div>
  );
}

export default App;

const Main = styled.main`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;
