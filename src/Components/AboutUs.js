import USer from "./User";
import UserClass from "./UserClass";
import React from "react";

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    console.log("Parent contrus");
  }
  componentDidMount() {
    console.log("Parent Mont");
  }
  render() {
    console.log("Parent render");

    return (
      <div>
        <h1>About Us</h1>
        <p>This is our about us page.</p>
        <USer />
      </div>
    );
  }
}

export default AboutUs;
