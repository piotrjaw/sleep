import React from "react";

const SignIn = () => {
  const SignUp = (e) => {
    e.preventDefault();
    const str = "/api/auth/google";
    window.open(str, "_self");
  };

  return (
    <div
      className="pt-5 text-light min-vh-100 d-flex flex-wrap align-content-center justify-content-center text-center
    "
    >
      <form onSubmit={SignUp}>
        <div className="">
          <h1>Sleep Tracker</h1>
          {/* <sub>Created by plastik for Codementor.io</sub> */}
        </div>
        <button className="mt-3">Sign in with Google</button>
      </form>
    </div>
  );
};

export default SignIn;
