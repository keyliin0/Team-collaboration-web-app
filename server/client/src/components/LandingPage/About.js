import React from "react";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="title">
          <h2>Features</h2>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <i className="far fa-calendar-alt" />
              <h3>Shared Calendar</h3>
              <p>
                Everyone has a calendar that they use to keep track of important
                dates, events, and activities (or almost everyone). And, every
                workplace, group of people or team has numerous aspects of life
                that they have to keep up with.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <i className="far fa-comments" />
              <h3>Realtime Group Chat</h3>
              <p>
                Time and Money. If group chatting is used regularly by your
                business, it can eliminate the need for extra telephone lines,
                reduce long distance calls and improve productivity.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <i className="fas fa-tasks" />
              <h3>Task management</h3>
              <p>
                Task management are used by individuals, teams and organizations
                that help complete projects more efficiently by organizing and
                prioritizing related tasks.
              </p>
            </div>
          </div>{" "}
          <div className="col-md-4">
            <div className="card">
              <i className="far fa-bell" />
              <h3>Realtime Notifications</h3>
              <p>
                Users can receive updates and notifications directly as they
                happen. This helps to increase user engagement.
              </p>
            </div>
          </div>{" "}
          <div className="col-md-4">
            <div className="card">
              <i className="fas fa-users" />
              <h3>Groups</h3>
              <p>Users can create groups and invite other users to join.</p>
            </div>
          </div>{" "}
          <div className="col-md-4">
            <div className="card">
              <i className="far fa-envelope" />
              <h3>Custom Mailbox</h3>
              <p>Custom mailbox where you can send and recieve e-mails.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
