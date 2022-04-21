import React, { useState } from "react";
import "./App.css";
//Components
import Form from "./components/Form";
import AgendaList from "./components/AgendaList";
//Images
import Rino from "./images/Rino.png";
import Ice from "./images/Ice.jpg";

function App() {
  const [inputText, setInputText] = useState("");
  const [agendas, setAgendas] = useState([]);
  const [filter, setFilter] = useState("all");

  return (
    <div>
      <div
        style={{
          background: `url(${Ice})`,
          height: "100vh",
          marginTop: "0px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderRadius: "20%",
        }}
      >
        <div className="App">
          {/* <img src={Rino} alt="Rino" className="background-img" /> */}
          <header>
            <h1>Sceduler</h1>
          </header>
          <Form
            agendas={agendas}
            setAgendas={setAgendas}
            inputText={inputText}
            setInputText={setInputText}
            setFilter={setFilter}
          />
          <AgendaList
            agendas={agendas}
            setAgendas={setAgendas}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
