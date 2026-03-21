import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [language, setLanguage] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("studentData"));
    const pref = JSON.parse(localStorage.getItem("studentPreferences"));
    const savedProgress =
      JSON.parse(localStorage.getItem("progressData")) || {};

    if (student) {
      setStudentName(student.name);
    }

    if (pref) {
      setStudentClass(pref.class);
      setLanguage(pref.language);

      let coreSubjects = [];

      if (Number(pref.class) <= 5) {
        coreSubjects = ["Math", "EVS", "English"];
      } else {
        coreSubjects = ["Math", "Science", "Social Science", "English"];
      }

      let languageSubjects = ["Hindi"];

      if (pref.language === "Punjabi") {
        languageSubjects.push("Punjabi");
      }

      const finalSubjects = [...coreSubjects, ...languageSubjects];

      setSubjects(finalSubjects);
    }

    setProgress(savedProgress);
  }, []);

  const subjectIcons = {
    Math: "📘",
    EVS: "🌱",
    Science: "🔬",
    "Social Science": "🌍",
    English: "📖",
    Hindi: "📝",
    Punjabi: "✍️",
  };

  const updateProgress = (subject) => {

  const currentProgress =
    JSON.parse(localStorage.getItem("progressData")) || {};

  const newValue = (currentProgress[subject] || 0) + 20;

  const updated = {
    ...currentProgress,
    [subject]: newValue > 100 ? 100 : newValue
  };

  localStorage.setItem("progressData", JSON.stringify(updated));

  // 🔥 SAVE INSIDE STUDENTS ARRAY
  const students =
    JSON.parse(localStorage.getItem("students")) || [];

  const currentStudent =
    JSON.parse(localStorage.getItem("studentData"));

  const updatedStudents = students.map((s) =>
    s.email === currentStudent.email
      ? { ...s, progress: updated }
      : s
  );

  localStorage.setItem("students", JSON.stringify(updatedStudents));

  setProgress(updated);
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-200 via-purple-200 to-indigo-200">
      {/* HEADER */}

      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-4xl font-bold text-indigo-700">EduKids 🎓</h1>

        <div className="bg-white px-6 py-3 rounded-xl shadow text-right">
          <p className="font-bold text-lg">👦 {studentName}</p>

          <p className="text-gray-600">Class {studentClass}</p>

          <p className="text-gray-600">Language: {language}</p>
        </div>
      </div>

      {/* WELCOME BANNER */}

      <div className="mx-10 mb-10 bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-indigo-700">
            Welcome Back {studentName}! 👋
          </h2>

          <p className="text-gray-600">
            Continue learning and complete your chapters.
          </p>
        </div>

        <div className="text-5xl">🚀</div>
      </div>

      {/* SUBJECT SECTION */}

      <div className="px-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your Subjects 📚
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {subjects.map((subject) => {
            const percent = progress[subject] || 0;

            const radius = 40;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percent / 100) * circumference;

            return (
              <div
                key={subject}
                onClick={() => {
                  updateProgress(subject);
                  navigate(`/subject/${subject}`);
                }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:scale-110 hover:shadow-2xl transition cursor-pointer text-center"
              >
                {/* ICON */}

                <div className="text-4xl mb-2">{subjectIcons[subject]}</div>

                {/* SUBJECT NAME */}

                <h3 className="text-lg font-bold text-indigo-700 mb-4">
                  {subject}
                </h3>

                {/* PROGRESS RING */}

                <div className="flex justify-center mb-3 relative">
                  <svg width="100" height="100">
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="transparent"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="#6366f1"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>

                  <div className="absolute top-8 text-sm font-bold">
                    {percent}%
                  </div>
                </div>

                {/* STARS */}

                <div className="text-yellow-400 text-lg">
                  {percent >= 20 && "⭐"}
                  {percent >= 40 && "⭐"}
                  {percent >= 60 && "⭐"}
                  {percent >= 80 && "⭐"}
                  {percent >= 100 && "⭐"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOTIVATION */}

      <div className="mx-10 mt-14 bg-white rounded-2xl shadow-lg p-6 text-center">
        <h3 className="text-xl font-bold text-indigo-700">🌟 Keep Going!</h3>

        <p className="text-gray-600">
          Complete chapters and unlock more stars!
        </p>
      </div>
    </div>
  );
}
