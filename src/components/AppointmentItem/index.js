import "./index.css";

const AppointmentItem = (props) => {
  const { appointmentsDetails, toggleIsStarred } = props;
  const { id, title, date, isStarred } = appointmentsDetails;
  const starredImage = isStarred
    ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
    : "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png";

  const onClickStar = () => {
    toggleIsStarred(id);
  };
  return (
    <>
      <li className="appointment-item">
        <div className="header-container">
          <h1 className="title">{title}</h1>
          <button className="star-button" onClick={onClickStar}>
            <img src={starredImage} className="star" alt="star" />
          </button>
        </div>
        <p className="date">{date}</p>
      </li>
    </>
  );
};

export default AppointmentItem;
