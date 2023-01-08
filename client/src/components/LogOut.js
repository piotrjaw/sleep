import React from "react";

const LogOut = () => {
  const SignOut = (e) => {
    e.preventDefault();
    const str = `/api/auth/logout`;
    window.open(str, "_self");
  };

  return (
    <div className="text-center mt-5">
      <form onSubmit={SignOut}>
        <button className="mt-3">Log Out</button>
      </form>
    </div>
  );
};

export default LogOut;
