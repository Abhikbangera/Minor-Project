import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function TeacherSignup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // 🔥 VALIDATION
  if (
    !formData.name ||
    !formData.email ||
    !formData.password
  ) {
    alert("Please fill all required fields");
    return;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(formData.email)) {
    alert("Enter a valid email");
    return;
  }

  // Password validation
  if (formData.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  // 🔥 SAVE TEACHER
  localStorage.setItem("teacherData", JSON.stringify(formData));

  alert("Teacher Account Created Successfully");

  navigate("/teacher-setup");
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 to-orange-200 p-6">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-yellow-700 mb-6">
          Teacher Signup
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">

          <input
            type="text"
            name="name"
            placeholder="Teacher Name"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          {/* OTP Section */}
          <div className="flex gap-2">

            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              className="border p-3 rounded-lg flex-1"
              onChange={handleChange}
            />

            <button
              type="button"
              className="bg-yellow-400 px-4 rounded-lg hover:bg-yellow-500"
            >
              Send OTP
            </button>

          </div>

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/teacher-login"
            className="text-yellow-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}
