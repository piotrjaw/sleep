import React, { Fragment, useState, useContext } from "react";
import { UserContext } from "./UserContext";

const InputSleep = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const user = useContext(UserContext);
  const user_id = user.id;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { time, date, user_id };
      const response = fetch("/api/sleeps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setTime("");
      setDate("");
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center mt-5">Sleep Tracker</h1>
      <div className="d-flex justify-content-center">
        <form className="mt-5 w-25" onSubmit={onSubmitForm}>
          <div className="form-outline">
            <label>How many hours did you sleep?</label>
            <input
              type="text"
              className="form-control mt-1 "
              value={time}
              placeholder="hours"
              onChange={(e) => setTime(e.target.value)}
            ></input>
          </div>
          <div className="mt-4">
            <label>Select Date</label>
            <input
              type="date"
              className="form-control mt-1"
              value={date}
              placeholder="date"
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
          <input type="hidden" value={user_id} />
          <button className="btn btn-success mt-4">Add</button>
        </form>
      </div>
      {/* <p>your id is: {user_id}</p> */}
    </Fragment>
  );
};

export default InputSleep;
