import React from "react";

//Component consists of the top adding agendas and the dropdown for sorting
const Form = ({inputText, setInputText, agendas, setAgendas, setFilter}) => {
  //Activates when input is changed in the text field
  //Sets input text to whatever is typed in the box
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };
  
  //Activates when input is submitted
  //Adds the agenda to the array of agendas and erases the inputText current data
  const submitAgendaHandler = (e) =>{
    //Prevents the default refreshing page
    e.preventDefault();
    //Submitting the agenda
    setAgendas([
      ...agendas, {text: inputText, finished: false, date: new Date(), id:agendas.length+inputText}
    ]);
    //Resetting the InputText after submitting the agenda
    setInputText("");
  }

  const filterHandler = (e) => {
    setFilter(e.target.value);
  }

  return (
    <form>
      <input value={inputText} onChange={inputTextHandler} type="text" className="agenda-input" />
      <button onClick={submitAgendaHandler} className="agenda-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={filterHandler} name="agendas" className="filter-agenda">
          {/* modify here for the list of filter items */}
          <option value="all">All</option>
          <option value="finished">Finished</option>
          <option value="unfinished">Unfinished</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
