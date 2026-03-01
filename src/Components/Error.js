import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-5 text-center">
      <h1 className="text-5xl sm:text-7xl font-extrabold text-swiggy-orange mb-3 sm:mb-4">
        {error?.status || "404"}
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-title mb-1.5 sm:mb-2">
        {error?.statusText || "Page Not Found"}
      </h2>
      <p className="text-sm sm:text-base text-slate-muted mb-6 sm:mb-8 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-swiggy-orange text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-swiggy-orange-dark transition-colors shadow-button"
      >
        GO TO HOME
      </Link>
    </div>
  );
};
export default Error;
