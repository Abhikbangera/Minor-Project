import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SubjectPage() {

  const { subject } = useParams();
  const navigate = useNavigate();

  const [subjectChapters, setSubjectChapters] = useState([]);

  const pref = JSON.parse(localStorage.getItem("studentPreferences"));
  const studentClass = pref?.class;

  useEffect(() => {

    const syllabus =
      JSON.parse(localStorage.getItem("syllabusData")) || {};

    const classData = syllabus[studentClass] || {};

    const chaptersData = classData[subject] || [];

    setSubjectChapters(chaptersData);

  }, [studentClass, subject]);

  const icons = ["📘","📗","📙","📕","📓","📔","📒"];

  return (

    <div className="min-h-screen bg-gradient-to-r from-sky-200 via-purple-200 to-indigo-200 p-10">

      {/* Title */}
      <h1 className="text-4xl font-bold text-indigo-700 mb-10">
        {subject} Chapters 📚
      </h1>

      {/* Chapter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {subjectChapters.length === 0 ? (
          <p className="text-gray-700">
            No chapters available yet.
          </p>
        ) : (

          subjectChapters.map((chapter, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition cursor-pointer"
            >

              {/* Icon */}
              <div className="text-4xl mb-3">
                {icons[index % icons.length]}
              </div>

              {/* Chapter Title */}
              <h2 className="text-xl font-bold text-indigo-700 mb-4">
                {typeof chapter === "string" ? chapter : chapter.title}
              </h2>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${Math.floor(Math.random()*70)+10}%` }}
                ></div>
              </div>

              {/* Button */}
              <button
                onClick={() =>
                  navigate(`/chapter/${subject}/${chapter.title || chapter}`)

                }
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Start Learning
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}
