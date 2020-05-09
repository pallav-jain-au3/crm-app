import React from "react";
class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h1>Home</h1>
          </div>
          <div className="col-4">
            <h1>Profile</h1>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
