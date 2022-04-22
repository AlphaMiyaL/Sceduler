import React, {useState, useEffect} from "react";
//Components
import Agenda from './Agenda';

const AgendaList = ({agendas, setAgendas, filter}) => {
  const [filteredAgendas, setFilteredAgendas] = useState([]);

  //Runs once at start of app
  //Loads the agendas from the Local Storage
  useEffect(() => {
    getLocalAgendas();
  }, []);

  //Runs everytime filter state changes
  //runs filterHandler everytime filter state is updated
  useEffect(() =>{
    filterHandler();
    saveLocalAgendas();
  }, [filter, agendas]);

  //Saves a filtered copy of the agenda array based on which state filter is in
  const filterHandler = () =>{
    switch(filter){
      case 'finished':
        setFilteredAgendas(agendas.filter(agenda => agenda.finished === true));
        break;
      case 'unfinished':
        setFilteredAgendas(agendas.filter(agenda => agenda.finished === false));
        break;
      default:
        setFilteredAgendas(agendas)
        break;
    }
  }

  //Saving to Local Storage
  const saveLocalAgendas = () => {
      localStorage.setItem('agendas', JSON.stringify(agendas));
  }

  //Loads exisitng agendas from Local Storage
  const getLocalAgendas = () =>{
    if(localStorage.getItem('agendas')===null){
      localStorage.setItem('agendas', JSON.stringify([]));
    }
    else{
      let agendaLocal = JSON.parse(localStorage.getItem("agendas"))
      for(let agenda of agendaLocal){
        let parsedDate = new Date();
        parsedDate.setFullYear(parseInt(agenda.date.substring(0,5)));
        parsedDate.setMonth(parseInt(agenda.date.substring(6,8))-1);
        parsedDate.setDate(parseInt(agenda.date.substring(8,10))-1);
        agendaLocal.date = parsedDate;
        setAgendas(agendas => [...agendas, {text: agenda.text, finished: agenda.finished, date: parsedDate, id:agenda.id}]);
      }
    }
  }

  return (
    <div className="agenda-container">
      <ul className="agenda-list">
          {filteredAgendas.map(agenda => (
            <Agenda 
             key={agenda.id}
             agenda={agenda} 
             agendas={agendas} 
             setAgendas={setAgendas}
             saveLocalAgendas = {saveLocalAgendas}
             />
          ))}
      </ul>
    </div>
  );
};

export default AgendaList;
