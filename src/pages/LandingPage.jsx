import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/layout/AnimatedBackground";
import { TypeAnimation } from "react-type-animation";
export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-sky-200 via-purple-200 to-indigo-200">
      <Navbar />
      <AnimatedBackground />
      {/* FLOATING SHAPES */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-70 float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-300 rounded-full opacity-70 float"></div>
      <div className="absolute top-40 right-40 w-16 h-16 bg-green-300 rounded-full opacity-70 float"></div>

      {/* HERO */}
      <section className="flex flex-col items-center text-center py-24 px-6 relative z-10">
        <h1 className="text-5xl font-bold text-indigo-700 mb-6">EduKids 🎓</h1>

        <TypeAnimation
          sequence={[
            "Fun Learning for Classes 1–6 📚",
            2000,
            "Interactive Quizzes and Visual Lessons 🧠",
            2000,
            "Learn in English, Hindi, and Punjabi 🌍",
            2000,
            "AI Powered Learning Assistant 🤖",
            2000,
            "Join Thousands of Happy Learners! 🎉",
            3000,
          ]}
          wrapper="p"
          speed={50}
          repeat={Infinity}
          className="text-xl text-gray-700 max-w-xl mb-8"
        />

        <div className="flex gap-4">
          <Link
            to="/student-signup"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg hover:scale-105 transition"
          >
            Student Signup
          </Link>

          <Link
            to="/teacher-signup"
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl text-lg hover:scale-105 transition"
          >
            Teacher Signup
          </Link>
        </div>
      </section>

      {/* LANGUAGE SECTION */}

      <section className="py-16 bg-white text-center relative z-10">
        <h2 className="text-3xl font-bold text-indigo-700 mb-10">
          Learn in Your Language 🌍
        </h2>

        <div className="flex justify-center gap-10 flex-wrap">
          <div className="bg-sky-100 p-8 rounded-xl shadow-md w-40 hover:scale-110 transition">
            <h3 className="text-xl font-bold">English</h3>
          </div>

          <div className="bg-yellow-100 p-8 rounded-xl shadow-md w-40 hover:scale-110 transition">
            <h3 className="text-xl font-bold">हिन्दी</h3>
          </div>

          <div className="bg-green-100 p-8 rounded-xl shadow-md w-40 hover:scale-110 transition">
            <h3 className="text-xl font-bold">ਪੰਜਾਬੀ</h3>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section className="py-20 px-8 text-center bg-gradient-to-r from-indigo-100 to-sky-100">
        <h2 className="text-3xl font-bold text-indigo-700 mb-12">
          Why Choose EduKids? 🚀
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2">Visual Learning</h3>
            <p>Learn with diagrams, pictures and fun examples.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2">Quiz Practice</h3>
            <p>Fun quizzes after every chapter.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2">AI Learning Assistant</h3>
            <p>Ask questions anytime and get simple answers.</p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-12">
          How EduKids Works 📚
        </h2>

        <div className="grid md:grid-cols-3 gap-10 px-8">
          <div className="bg-sky-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-3">1️⃣ Choose Your Language</h3>
            <p>Learn in English, Hindi, or Punjabi based on your preference.</p>
          </div>

          <div className="bg-yellow-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-3">2️⃣ Explore Subjects</h3>
            <p>
              Study Math, Science, EVS and more with fun visuals and lessons.
            </p>
          </div>

          <div className="bg-green-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-3">3️⃣ Practice with Quizzes</h3>
            <p>Test your knowledge and track your learning progress.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
