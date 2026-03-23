import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendOtp, verifyOtp } from "../../services/api.js";

export default function TeacherSignup() {

  const navigate = useNavigate();

  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'form'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError('');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await sendOtp(formData.email);
      setStep('otp');
      setOtpSent(true);
      setTimer(300);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      setStep('form');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim() || !emailPattern.test(formData.email) || formData.password.length < 6) {
      setError('Please fill all fields correctly');
      return;
    }
    const teacherData = { ...formData, verified: true };
    localStorage.setItem("teacherData", JSON.stringify(teacherData));
    alert("Teacher Account Created Successfully! 🎉");
    navigate("/teacher-setup");
  };

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 to-orange-200 p-6">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-yellow-700 mb-6">
          Teacher Signup
        </h2>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-4">
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
              className="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Get OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="grid gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">OTP sent to {formData.email}</div>
              <div className="text-xl font-bold text-yellow-600 mb-4">
                {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
              </div>
            </div>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="border p-3 rounded-lg text-center text-lg font-mono tracking-wider"
              value={otp}
              onChange={handleOtpChange}
              maxLength={6}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={timer > 0 || loading}
              className="bg-yellow-400 py-2 rounded-lg hover:bg-yellow-500 disabled:opacity-50 text-sm"
            >
              {timer > 0 ? `Resend (${timer}s)` : 'Resend OTP'}
            </button>
          </form>
        )}

        {step === 'form' && (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="bg-green-100 p-3 rounded-lg text-green-800 text-center font-medium">
              ✅ Email verified successfully!
            </div>
            <input
              type="text"
              name="name"
              placeholder="Teacher Name *"
              className="border p-3 rounded-lg"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password (6+ chars) *"
              className="border p-3 rounded-lg"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition font-semibold"
            >
              Create Account
            </button>
          </form>
        )}

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
