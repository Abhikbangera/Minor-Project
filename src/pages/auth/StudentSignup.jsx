import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function StudentSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    fatherName: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name) {
      alert("Please enter your name");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Enter a valid email");
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      alert("Phone number must be 10 digits");
      return false;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    return true;
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

  // Email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(formData.email)) {
    alert("Please enter a valid email");
    return;
  }

  // Password length check
  if (formData.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  // Get existing students
  const existingStudents =
    JSON.parse(localStorage.getItem("students")) || [];

  // Save student
  const updatedStudents = [...existingStudents, formData];

  localStorage.setItem("students", JSON.stringify(updatedStudents));

  // Save current logged-in student
  localStorage.setItem("studentData", JSON.stringify(formData));

  alert("Student Account Created Successfully");

  navigate("/student-setup");
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-200 to-indigo-200 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Student Signup
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="date"
            name="dob"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="fatherName"
            placeholder="Father / Guardian Name"
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

          <input
            type="tel"
            name="phone"
            placeholder="Parent Phone Number"
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
            className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/student-login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
