import Username from "../utils/UserContext";
import User from "../utils/UserContext";
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
      <div className="max-w-[800px] mx-auto px-3 sm:px-4 md:px-5 py-6 sm:py-8 md:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-title mb-2 sm:mb-3">
          About Us
        </h1>
        <p className="text-sm sm:text-base text-slate-muted mb-6 sm:mb-8 leading-relaxed">
          This is our about us page. We are passionate about delivering the best food
          experience right to your doorstep.
        </p>

        <div className="bg-slate-bg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-border">
          <USer />
          <Username.Consumer>
            {(User) => (
              <p className="text-sm sm:text-base font-medium text-slate-title mt-3 sm:mt-4">
                Welcome, {User.localUser}
              </p>
            )}
          </Username.Consumer>
        </div>
      </div>
    );
  }
}

export default AboutUs;
