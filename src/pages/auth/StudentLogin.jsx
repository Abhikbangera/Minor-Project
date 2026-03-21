import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function StudentLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
  e.preventDefault();

  const storedStudent = JSON.parse(localStorage.getItem("studentData"));

  if (!storedStudent) {
    alert("No account found. Please signup first.");
    return;
  }

  if (
    storedStudent.email === formData.email &&
    storedStudent.password === formData.password
  ) {
    alert("Login Successful");

    // Redirect to class & language selection page
    navigate("/student-setup");

  } else {
    alert("Invalid Email or Password");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-200 to-indigo-200 p-6">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Student Login
        </h2>

        <form onSubmit={handleLogin} className="grid gap-4">

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/student-signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}
