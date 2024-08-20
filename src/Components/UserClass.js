import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      count2: 2,
    };
    console.log(this.props.name + "Child Cons");
  }
  componentDidMount() {
    console.log(this.props.name + "Child Mount");
  }

  render() {
    console.log(this.props.name + "Child render");
    const { name } = this.props;
    const { count, count2 } = this.state;
    return (
      <div>
        <h1>User Profile</h1>
        <p>Name: {name}</p>
        <p>Email: {count}</p>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Click me
        </button>
        <p>Age: {count2}</p>
      </div>
    );
  }
}
export default UserClass;
