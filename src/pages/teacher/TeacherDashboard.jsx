import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ KEEP ONLY ONE CHART IMPORT
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [teacherPref, setTeacherPref] = useState({});
  const [activeTab, setActiveTab] = useState("students");

  const [analytics, setAnalytics] = useState({
    total: 0,
    average: 0,
    topStudent: "",
    weakStudent: "",
  });

  const [chartData, setChartData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [quizForm, setQuizForm] = useState({
    class: "",
    subject: "",
    chapter: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    answer: "",
    marks: "", // ✅ ADD THIS
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    const prefData = localStorage.getItem("teacherPreferences");
    const teacherData = localStorage.getItem("teacherData");

    if (!prefData) {
      navigate("/teacher-setup");
      return;
    }

    if (!teacherData) {
      navigate("/teacher-login");
      return;
    }

    const pref = JSON.parse(prefData);
    const teacher = JSON.parse(teacherData);

    const mergedData = {
      ...pref,
      name: teacher.name,
    };

    setTeacherPref(mergedData);

    // ✅ REAL STUDENTS
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];

    const filtered = allStudents.filter(
      (s) => String(s.class) === String(pref.class),
    );

    setStudents(filtered);
    // 🤖 AI INSIGHTS
    if (filtered.length > 0) {
      let insights = [];

      // 1. Weak & Strong students
      filtered.forEach((student) => {
        const progress = student.progress || {};

        Object.entries(progress).forEach(([sub, val]) => {
          if (val < 40) {
            insights.push(`${student.name} is weak in ${sub}`);
          }
          if (val > 80) {
            insights.push(`${student.name} is performing excellent in ${sub}`);
          }
        });
      });

      // 2. Subject-level analysis
      const subjectTotals = {};
      const subjectCounts = {};

      filtered.forEach((student) => {
        const progress = student.progress || {};

        Object.entries(progress).forEach(([sub, val]) => {
          subjectTotals[sub] = (subjectTotals[sub] || 0) + val;
          subjectCounts[sub] = (subjectCounts[sub] || 0) + 1;
        });
      });

      Object.keys(subjectTotals).forEach((sub) => {
        const avg = subjectTotals[sub] / subjectCounts[sub];

        if (avg < 50) {
          insights.push(`Class performance is low in ${sub}`);
        }
      });

      setAiInsights(insights);
    }

    // 🏆 LEADERBOARD LOGIC
    if (filtered.length > 0) {
      const ranked = filtered.map((s) => {
        const progressValues = Object.values(s.progress || {});

        const avg =
          progressValues.length > 0
            ? progressValues.reduce((a, b) => a + b, 0) / progressValues.length
            : 0;

        return {
          name: s.name,
          avg: Math.round(avg),
        };
      });

      ranked.sort((a, b) => b.avg - a.avg);

      setLeaderboard(ranked);
    }

    // 📊 CHART DATA
    if (filtered.length > 0) {
      const subjectTotals = {};
      const subjectCounts = {};

      filtered.forEach((student) => {
        const progress = student.progress || {};

        Object.entries(progress).forEach(([subject, value]) => {
          subjectTotals[subject] = (subjectTotals[subject] || 0) + value;

          subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
        });
      });

      const subjects = Object.keys(subjectTotals);

      const averages = subjects.map((sub) =>
        Math.round(subjectTotals[sub] / subjectCounts[sub]),
      );

      setChartData({
        labels: subjects,
        datasets: [
          {
            label: "Average Progress (%)",
            data: averages,
            backgroundColor: [
              "#6366f1",
              "#f59e0b",
              "#10b981",
              "#ef4444",
              "#3b82f6",
            ],
          },
        ],
      });
    }

    // 🔥 ANALYTICS
    if (filtered.length > 0) {
      let totalProgress = 0;

      const studentAverages = filtered.map((s) => {
        const progressValues = Object.values(s.progress || {});
        const avg =
          progressValues.length > 0
            ? progressValues.reduce((a, b) => a + b, 0) / progressValues.length
            : 0;

        totalProgress += avg;

        return { name: s.name, avg };
      });

      const averageClassProgress = totalProgress / filtered.length;

      const top = studentAverages.reduce((a, b) => (a.avg > b.avg ? a : b));

      const weak = studentAverages.reduce((a, b) => (a.avg < b.avg ? a : b));

      setAnalytics({
        total: filtered.length,
        average: Math.round(averageClassProgress),
        topStudent: top.name,
        weakStudent: weak.name,
      });
    }
  }, [navigate]);

  const downloadReport = (student) => {
    const progress = student.progress || {};

    const content = `
Student Name: ${student.name}
Class: ${student.class}

Progress:
${Object.entries(progress)
  .map(([sub, val]) => `${sub}: ${val}%`)
  .join("\n")}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${student.name}_report.txt`;
    a.click();
  };
  const saveQuiz = () => {
    const data = JSON.parse(localStorage.getItem("quizData")) || {};

    const cls = quizForm.class;
    const subject = quizForm.subject.toLowerCase();
    const chapter = quizForm.chapter.toLowerCase();

    const { question, option1, option2, option3, answer } = quizForm;

    if (!cls || !subject || !chapter || !question) {
      alert("Fill all fields");
      return;
    }

    if (!data[cls]) data[cls] = {};
    if (!data[cls][subject]) data[cls][subject] = {};
    if (!data[cls][subject][chapter]) {
      data[cls][subject][chapter] = [];
    }

    data[cls][subject][chapter].push({
  question,
  options: [option1, option2, option3],
  answer,
  marks: Number(quizForm.marks) || 1
});


    localStorage.setItem("quizData", JSON.stringify(data));

    alert("Quiz Added ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-orange-100 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-orange-600">EduKids 👩‍🏫</h1>

        <div className="bg-white px-5 py-3 rounded-xl shadow text-right">
          <p className="font-bold text-lg">
            👩‍🏫 {teacherPref.name || "Teacher"}
          </p>

          <p className="text-gray-600">Class {teacherPref.class || "-"}</p>

          <p className="text-gray-600">
            Language: {teacherPref.language || "-"}
          </p>
        </div>
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-600">Students 👨‍🎓</h3>
          <p className="text-2xl font-bold text-orange-600">
            {analytics.total}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-600">Avg Progress 📈</h3>
          <p className="text-2xl font-bold text-green-600">
            {analytics.average}%
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-600">Top Student 🏆</h3>
          <p className="text-xl font-bold text-indigo-600">
            {analytics.topStudent || "-"}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-600">Needs Help 📉</h3>
          <p className="text-xl font-bold text-red-500">
            {analytics.weakStudent || "-"}
          </p>
        </div>
      </div>

      {/* CHART */}
      {chartData && (
        <div className="bg-white p-6 rounded-xl shadow mb-10 h-[300px] md:h-[400px]">
          <h2 className="text-xl font-bold mb-4">Subject Performance 📊</h2>

          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
      {/* 🏆 LEADERBOARD */}
      {leaderboard.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Leaderboard 🏆
          </h2>

          {leaderboard.map((student, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-2"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {index === 0 && "🥇"}
                  {index === 1 && "🥈"}
                  {index === 2 && "🥉"}
                  {index > 2 && `#${index + 1}`}
                </span>

                <p className="font-semibold">{student.name}</p>
              </div>

              <p className="font-bold text-indigo-600">{student.avg}%</p>
            </div>
          ))}
        </div>
      )}

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("students")}
          className={`px-4 py-2 rounded-lg text-white ${
            activeTab === "students" ? "bg-orange-500" : "bg-gray-400"
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setActiveTab("ai")}
          className={`px-4 py-2 rounded-lg text-white ${
            activeTab === "ai" ? "bg-purple-500" : "bg-gray-400"
          }`}
        >
          AI Assistant
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`px-4 py-2 rounded-lg text-white ${
            activeTab === "quiz" ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          Add Quiz
        </button>
      </div>

      {/* STUDENTS */}
      {activeTab === "students" && (
        <div className="grid md:grid-cols-2 gap-6">
          {students.length === 0 ? (
            <p>No students found</p>
          ) : (
            students.map((student, i) => {
              const progress = student.progress || {};

              return (
                <div key={i} className="bg-white p-6 rounded-xl shadow">
                  <h2>{student.name}</h2>

                  {Object.entries(progress).map(([sub, val]) => (
                    <div key={sub}>
                      <p>{sub}</p>
                      <div className="w-full bg-gray-200 h-2">
                        <div
                          className="bg-green-500 h-2"
                          style={{ width: `${val}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>
      )}
      {/* 🤖 AI TAB */}
      {activeTab === "ai" && (
        <div className="bg-white p-6 rounded-xl shadow mt-6">
          <h2 className="text-xl font-bold mb-4">AI Insights 🤖</h2>

          {aiInsights.length === 0 ? (
            <p className="text-gray-600">No insights available yet.</p>
          ) : (
            <ul className="space-y-3">
              {aiInsights.map((insight, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  {insight}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* 🧠 QUIZ TAB */}
      {activeTab === "quiz" && (
        <div className="bg-white p-6 rounded-xl shadow mt-6">
          <h2 className="text-xl font-bold mb-4">Add Quiz ❓</h2>

          <div className="grid gap-3">
            <input
              placeholder="Class"
              onChange={(e) =>
                setQuizForm({ ...quizForm, class: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Subject"
              onChange={(e) =>
                setQuizForm({ ...quizForm, subject: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Chapter"
              onChange={(e) =>
                setQuizForm({ ...quizForm, chapter: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Question"
              onChange={(e) =>
                setQuizForm({ ...quizForm, question: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Option 1"
              onChange={(e) =>
                setQuizForm({ ...quizForm, option1: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Option 2"
              onChange={(e) =>
                setQuizForm({ ...quizForm, option2: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Option 3"
              onChange={(e) =>
                setQuizForm({ ...quizForm, option3: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Correct Answer"
              onChange={(e) =>
                setQuizForm({ ...quizForm, answer: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              placeholder="Marks for this question"
              onChange={(e) =>
                setQuizForm({
                  ...quizForm,
                  marks: e.target.value,
                })
              }
              className="border p-2 rounded"
            />

            <button
              onClick={saveQuiz}
              className="bg-green-600 text-white p-2 rounded"
            >
              Save Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
