import "./index.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import AppointmentItem from "../AppointmentItem";

const Appointments = () => {
  const [titleInput, setTitleInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const onChangeTitleInput = (event) => {
    setTitleInput(event.target.value);
  };

  const onChangeDateInput = (event) => {
    setDateInput(event.target.value);
  };

  const onAddAppointment = (event) => {
    event.preventDefault();
    const formattedDate = dateInput
      ? format(new Date(dateInput), "dd MMMM yyyy, EEEE")
      : "";

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    };
    //console.log(newAppointment);
    setAppointmentsList((prevAppointmentsList) => [
      ...prevAppointmentsList,
      newAppointment,
    ]);
    setTitleInput("");
    setDateInput("");
  };
  //console.log(appointmentsList);

  const toggleIsStarred = (id) => {
    const allArray = appointmentsList.map((eachAppointment) => {
      if (eachAppointment.id === id) {
        return { ...eachAppointment, isStarred: !eachAppointment.isStarred };
      }
      return eachAppointment;
    });
    setAppointmentsList(allArray);
  };

  const onFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

  const getFilteredArray = () => {
    if (isFilterActive) {
      return appointmentsList.filter(
        (eachAppointment) => eachAppointment.isStarred === true
      );
    }
    return appointmentsList;
  };
  const filteredArray = getFilteredArray();

  const filterClassName = isFilterActive ? "filter-filled" : "filter-empty";
  return (
    <>
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={onAddAppointment}>
                <h1 className="add-appointment-heading">Add Appointments</h1>
                <label htmlFor="title" className="label">
                  TTILE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredArray.map((eachAppointment) => (
                <AppointmentItem
                  appointmentsDetails={eachAppointment}
                  key={eachAppointment.id}
                  toggleIsStarred={toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
