import React, { Fragment, useState } from "react";

const EditSleep = ({ sleep }) => {
  const [time, setTime] = useState(sleep.time);

  // edit sleep function
  const updateTime = async (e) => {
    e.preventDefault();
    try {
      const body = { time };
      const response = await fetch(
        `/api/sleeps/${sleep.sleep_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-light"
        data-bs-toggle="modal"
        data-bs-target={`#id${sleep.sleep_id}`}
      >
        Edit Sleep
      </button>

      <div
        className="modal"
        id={`id${sleep.sleep_id}`}
        onClick={() => setTime(sleep.time)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Sleep</h4>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                onClick={() => setTime(sleep.time)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
                onClick={(e) => updateTime(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => setTime(sleep.time)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditSleep;
