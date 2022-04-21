import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Agenda = ({ agenda, agendas, setAgendas, saveLocalAgendas }) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [overdue, setOverdue] = useState(false);

  useEffect(() => {
    isAfter();
  }, []);

  useEffect(() => {
    saveLocalAgendas();
  }, [datePickerOpen]);

  //Runs when the Delete Button on an agenda is pressed
  //Deletes the agenda from the array
  const deleteHandler = () => {
    setAgendas(agendas.filter((el) => el.id !== agenda.id));
  };

  //Runs when Finish Button on an agenda is pressed
  //Sets the agenda finish property to true
  const finishHandler = () => {
    setAgendas(
      agendas.map((a) => {
        if (a.id === agenda.id) {
          return {
            ...a,
            finished: !a.finished,
          };
        }
        return a;
      })
    );
  };

  const tagHandler = () => {};

  //Runs when Timer Button on an agenda is pressed
  //Sets datePicker to open and allow choosing date
  const timerHandler = () => {
    setDatePickerOpen(!datePickerOpen);
  };

  const setSelectedDate = (date) => {
    agenda.date = date;
    timerHandler();
  };

  //Checks to see if the date from agenda is older than today's date
  //    if it is, it will set overdue to true
  const isAfter = () => {
    const today = new Date();
    if (agenda.date.getFullYear() > today.getFullYear()) {
      setOverdue(false);
    } else if (agenda.date.getFullYear() === today.getFullYear()) {
      if (agenda.date.getMonth() > today.getMonth()) {
        setOverdue(false);
      } else if (agenda.date.getMonth() === today.getMonth()) {
        if (agenda.date.getDate() >= today.getDate()) {
          setOverdue(false);
        } else {
          setOverdue(true);
        }
      } else {
        setOverdue(true);
      }
    } else {
      setOverdue(true);
    }
  };

  return (
    <React.Fragment>
      <div className="agenda">
        <div
          className={`date ${overdue ? "overdue" : ""}`}
        >{`${agenda.date.getFullYear()}/${
          agenda.date.getMonth() + 1
        }/${agenda.date.getDate()}`}</div>
        <li className={`agenda-item ${agenda.finished ? "finished" : ""} `}>
          {agenda.text}
        </li>
        <button onClick={finishHandler} className="finish-btn">
          <i className="fas fa-check"></i>
        </button>
        <button onClick={tagHandler} className="tag-btn">
          <i className="fas fa-tag"></i>
        </button>
        <button onClick={timerHandler} className="timer-btn">
          <i className="fas fa-calendar-day"></i>
        </button>
        <div className="date-picker">
          <DatePicker
            selected={agenda.date}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            open={datePickerOpen}
          />
        </div>
        <button onClick={deleteHandler} className="delete-btn">
          <i className="fas fa-trash"></i>
        </button>
      </div>
      <div className="agenda"></div>
    </React.Fragment>
  );
};

export default Agenda;
