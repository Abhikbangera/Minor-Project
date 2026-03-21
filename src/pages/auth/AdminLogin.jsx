import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // temporary login
    navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 to-purple-200">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">

        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Admin Username"
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}