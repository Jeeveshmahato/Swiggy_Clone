import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        movie: "",
      },
    };
    console.log("constructor");
  }
  async componentDidMount() {
    const data = await fetch("https://dummyapi.online/api/movies");
    const json = await data.json();
    // console.log(json[0]);
    this.setState({
      user: json[0],
    });
    console.log("mont");
   this.timer = setInterval(() => {
      console.log("setinterval");
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    console.log("Child un");
  }

  componentDidUpdate() {
    console.log("update");
  }
  render() {
    console.log("render");
    const { movie, rating } = this.state.user;
    return (
      <div>
        <h1>{movie}</h1>
        <p>{rating}</p>
      </div>
    );
  }
}
export default UserClass;
