import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-sky-200 via-purple-200 to-indigo-200 px-6">

      {/* Title */}
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">
        Welcome to EduKids 🎓
      </h1>

      <p className="text-gray-700 mb-10 text-center max-w-md">
        Select your role to continue learning or managing the platform.
      </p>

      {/* Role Cards */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* Student */}
        <Link
          to="/student-signup"
          className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition text-center w-60"
        >
          <div className="text-5xl mb-4">🧒</div>

          <h2 className="text-xl font-bold text-indigo-700 mb-2">
            Student
          </h2>

          <p className="text-gray-600 text-sm">
            Learn subjects, take quizzes, and track your progress.
          </p>
        </Link>

        {/* Teacher */}
        <Link
          to="/teacher-signup"
          className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition text-center w-60"
        >
          <div className="text-5xl mb-4">👩‍🏫</div>

          <h2 className="text-xl font-bold text-yellow-600 mb-2">
            Teacher
          </h2>

          <p className="text-gray-600 text-sm">
            Monitor student progress and assign quizzes.
          </p>
        </Link>

        {/* Admin */}
        <Link
          to="/admin-login"
          className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition text-center w-60"
        >
          <div className="text-5xl mb-4">⚙️</div>

          <h2 className="text-xl font-bold text-green-600 mb-2">
            Admin
          </h2>

          <p className="text-gray-600 text-sm">
            Manage users, syllabus, and platform data.
          </p>
        </Link>

      </div>

    </div>
  );
}