import React, { Fragment, useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";

import EditSleep from "./EditSleep";
import DrawChart from "./DrawChart";

const ListSleep = () => {
  const [sleeps, setSleeps] = useState([]);

  const user = useContext(UserContext);

  const deleteSleep = async (id) => {
    try {
      const deleteSleep = await fetch(`/api/sleeps/${id}`, {
        method: "DELETE",
      });
      setSleeps(sleeps.filter((sleep) => sleep.sleep_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSleeps = async () => {
    try {
      const user_id = user.id;
      const response = await fetch(`/api/sleeps/${user_id}`);
      const jsonData = await response.json();

      setSleeps(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSleeps();
  }, []);

  return (
    <Fragment>
      <table
        className="table mt-5 text-center table-hover text-light"
        id="tsleep"
      >
        <thead>
          <tr>
            <th>Hour</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sleeps.map((sleep) => (
            <tr key={sleep.sleep_id}>
              <td>{sleep.time}</td>
              <td>{new Date(sleep.date).toDateString()}</td>
              <td>
                <EditSleep sleep={sleep} />
              </td>
              <td>
                <button
                  className="btn btn-light"
                  onClick={() => deleteSleep(sleep.sleep_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <DrawChart sleeps={sleeps} />
      </div>
    </Fragment>
  );
};

export default ListSleep;
