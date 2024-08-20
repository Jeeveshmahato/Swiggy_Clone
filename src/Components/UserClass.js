import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {name} = this.props
    return (
      <div>
        <h1>User Profile</h1>
        <p>Name: {name}</p>
        {/* <p>Email: {email}</p>
        <p>Age: {age}</p> */}
      </div>
    );
  }
}
export default UserClass;