import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { sendOtp, verifyOtp } from "../../services/api.js";

export default function StudentSignup() {
  const navigate = useNavigate();

const [step, setStep] = useState('email'); // 'email' | 'otp' | 'form'
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    fatherName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [otpSent, setOtpSent] = useState(false);

  // Handle input changes for main form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError('');
  };

  // Validate full form (step 3)
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) {
      setError("Please enter your name");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Enter a valid email");
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      setError("Phone number must be 10 digits");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await sendOtp(formData.email);
      setStep('otp');
      setOtpSent(true);
      setTimer(300); // Reset 5min timer
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    try {
      await verifyOtp(formData.email, otp);
      setStep('form'); // Move to full form
    } catch (err) {
      setError(err.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  // Submit full form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Get existing students
    const existingStudents = JSON.parse(localStorage.getItem("students")) || [];
    const studentData = { ...formData, verified: true };

    // Save student
    const updatedStudents = [...existingStudents, studentData];
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    // Save current logged-in student
    localStorage.setItem("studentData", JSON.stringify(studentData));

    alert("Student Account Created Successfully! 🎉");
    navigate("/student-setup");
  };

  // OTP Timer countdown
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-200 to-indigo-200 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Student Signup
        </h2>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="grid gap-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="border p-3 rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button 
              type="submit" 
              disabled={loading || !formData.email}
              className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Get OTP'}
            </button>
            <p className="text-sm text-gray-500 text-center">
              Enter your email to receive OTP
            </p>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="grid gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">
                OTP sent to {formData.email}
              </div>
              <div className="text-2xl font-mono font-bold text-indigo-600 mb-4">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="border p-3 rounded-lg text-center text-xl tracking-widest"
              value={otp}
              onChange={handleOtpChange}
              maxLength={6}
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading || timer > 0}
              className="bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 text-sm"
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
            </button>
          </form>
        )}

        {step === 'form' && (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="text-green-600 text-center font-semibold mb-4">
              ✅ Email verified! Complete your profile.
            </div>
            <input
              type="text"
              name="name"
              placeholder="Student Name *"
              className="border p-3 rounded-lg"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="border p-3 rounded-lg"
              value={formData.age}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dob"
              className="border p-3 rounded-lg"
              value={formData.dob}
              onChange={handleChange}
            />
            <input
              type="text"
              name="fatherName"
              placeholder="Father / Guardian Name"
              className="border p-3 rounded-lg"
              value={formData.fatherName}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Parent Phone Number *"
              className="border p-3 rounded-lg"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password *"
              className="border p-3 rounded-lg"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Create Account
            </button>
          </form>
        )}

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/student-login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
