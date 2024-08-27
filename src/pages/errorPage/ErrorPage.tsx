import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#49674a] text-white">
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="flex  items-center gap-3">
        <Link
          to="/"
          className="px-6 py-3 font-semibold bg-[#c8d1c9] text-black rounded-lg hover:bg-[#dbe1db]"
        >
          Go to Home
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 font-semibold bg-[#c8d1c9] text-black rounded-lg hover:bg-[#dbe1db]"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
