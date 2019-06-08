import React from "react";

const Header = () => {
  return (
    <header>
      <div className="bg-image" />
      <div className="overlay" />
      <div className="home-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="content">
                <h1>Connect and collaborate!</h1>
                <p>
                  A collaboration tool that helps you communicate, set
                  objectives and assign tasks. Its big advantage: it has a
                  simple visual design so it’s easy to understand and work with.
                </p>{" "}
                <a href="/auth/google">
                  <button className="white-btn">Sign in with Google</button>
                </a>
                <a href="/auth/demo">
                  <button className="blue-btn">Try without login</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
