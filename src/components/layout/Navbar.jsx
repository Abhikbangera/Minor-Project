import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-indigo-600">
        EduKids
      </h1>

      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}