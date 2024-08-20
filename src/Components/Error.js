import { useRouteError } from "react-router-dom";
const Error = () => {
    const error = useRouteError();
  return (
    <div>
      <h1>Ooops....</h1>
      <p>The page you are looking for could not be found.</p>
      <h3>{error.status}:{error.statusText}</h3>
    </div>
  );
};
export default Error;
