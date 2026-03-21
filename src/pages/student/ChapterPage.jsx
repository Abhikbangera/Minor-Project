import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ChapterPage() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [data, setData] = useState(null);
  const [submitted, setSubmitted] = useState(false); // ✅ NEW

  const { subject, chapter } = useParams();

  const quizData = JSON.parse(localStorage.getItem("quizData")) || {};
  const pref = JSON.parse(localStorage.getItem("studentPreferences"));

  // 🔥 normalize chapter (Fractions → fraction)
  const normalizedChapter =
    decodeURIComponent(chapter).toLowerCase().replace(/s$/, "");

  const quiz =
    quizData[pref?.class]?.[
      subject.toLowerCase()
    ]?.[
      normalizedChapter
    ] || [];

  useEffect(() => {
    const pref = JSON.parse(localStorage.getItem("studentPreferences"));
    const syllabus =
      JSON.parse(localStorage.getItem("syllabusData")) || {};

    const classData = syllabus[pref.class] || {};
    const subjectData = classData[subject] || [];

    const chapterData = subjectData.find(
      (c) => c.title === chapter
    );

    setData(chapterData);
  }, [subject, chapter]);

  if (!data) return <p className="p-8">Loading...</p>;

  const handleAnswer = (qIndex, option) => {
    if (submitted) return; // ✅ prevent change after submit

    setAnswers({
      ...answers,
      [qIndex]: option,
    });
  };

  const submitQuiz = () => {
    let total = 0;
    let maxMarks = 0;

    quiz.forEach((q, i) => {
      maxMarks += q.marks || 1;

      if (answers[i] === q.answer) {
        total += q.marks || 1;
      }
    });

    setScore({
      obtained: total,
      total: maxMarks,
    });

    setSubmitted(true); // ✅ IMPORTANT

    // SAVE SCORE
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const studentData = JSON.parse(localStorage.getItem("studentData"));

    const updated = students.map((s) => {
      if (s.email === studentData.email) {
        if (!s.quizScores) s.quizScores = {};

        s.quizScores[`${subject}-${chapter}`] = {
          obtained: total,
          total: maxMarks,
        };
      }
      return s;
    });

    localStorage.setItem("students", JSON.stringify(updated));
  };

  return (
    <div className="p-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        {data.title}
      </h1>

      {/* CONTENT */}
      <div className="mb-6 bg-white p-5 rounded-xl shadow">
        <h2 className="font-bold text-lg mb-2">📖 Content</h2>
        <p className="text-gray-700">{data.content}</p>
      </div>

      {/* QUIZ */}
      <div className="mb-6 bg-white p-5 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">Quiz ❓</h2>

        {quiz.length === 0 ? (
          <p className="text-gray-500">No quiz available</p>
        ) : (
          quiz.map((q, i) => (
            <div key={i} className="mb-4">

              <p className="font-semibold">
                {q.question} ({q.marks || 1} marks)
              </p>

              {q.options.map((opt, idx) => (

                <button
                  key={idx}
                  disabled={submitted} // ✅ disable after submit
                  onClick={() => handleAnswer(i, opt)}

                  className={`block w-full text-left p-2 my-1 rounded transition ${
                    
                    submitted
                      ? opt === q.answer
                        ? "bg-green-500 text-white" // ✅ correct
                        : answers[i] === opt
                        ? "bg-red-500 text-white" // ❌ wrong
                        : "bg-gray-200"
                      : answers[i] === opt
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"

                  }`}
                >
                  {opt}

                </button>

              ))}

              {/* ✅ SHOW CORRECT ANSWER */}
              {submitted && (
                <p className="text-sm mt-1 text-green-700">
                  Correct Answer: {q.answer}
                </p>
              )}

            </div>
          ))
        )}

        {quiz.length > 0 && (
          <button
            onClick={submitQuiz}
            disabled={submitted}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            Submit Quiz
          </button>
        )}

        {/* SCORE */}
        {score && (
          <div className="mt-6 bg-indigo-50 p-4 rounded-lg">

            <h3 className="text-lg font-bold">
              Your Score 🎯
            </h3>

            <p className="text-xl font-semibold text-indigo-700">
              {score.obtained} / {score.total}
            </p>

          </div>
        )}

      </div>

      {/* EXERCISES */}
      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="font-bold text-lg mb-2">
          📝 Exercises
        </h2>

        {data.exercises?.map((ex, i) => (
          <p key={i} className="text-gray-700">
            • {ex}
          </p>
        ))}

      </div>

    </div>
  );
}
