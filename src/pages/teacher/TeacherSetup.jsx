import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherSetup() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    class: "",
    language: ""
  });

  const handleSelect = (type, value) => {
    setData({
      ...data,
      [type]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.class || !data.language) {
      alert("Please select class and language");
      return;
    }

    localStorage.setItem("teacherPreferences", JSON.stringify(data));

    navigate("/teacher-dashboard");
  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 flex items-center justify-center p-6">

      {/* MAIN CARD */}
      <div className="backdrop-blur-lg bg-white/70 p-10 rounded-3xl shadow-2xl w-full max-w-2xl">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-2">
          EduKids 👩‍🏫
        </h1>

        <p className="text-center text-gray-700 mb-8">
          Set up your teaching preferences
        </p>

        {/* CLASS SECTION */}
        <div className="mb-8">

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Select Class 📚
          </h2>

          <div className="grid grid-cols-3 gap-4">

            {[1,2,3,4,5,6].map((cls) => (

              <div
                key={cls}
                onClick={() => handleSelect("class", String(cls))}
                className={`p-4 rounded-xl text-center cursor-pointer font-bold transition
                ${data.class === String(cls)
                  ? "bg-orange-500 text-white scale-105 shadow-lg"
                  : "bg-white hover:bg-orange-100"
                }`}
              >
                Class {cls}
              </div>

            ))}

          </div>

        </div>


        {/* LANGUAGE SECTION */}
        <div className="mb-8">

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Select Language 🌍
          </h2>

          <div className="grid grid-cols-3 gap-4">

            {["English","Hindi","Punjabi"].map((lang) => (

              <div
                key={lang}
                onClick={() => handleSelect("language", lang)}
                className={`p-4 rounded-xl text-center cursor-pointer font-bold transition
                ${data.language === lang
                  ? "bg-purple-500 text-white scale-105 shadow-lg"
                  : "bg-white hover:bg-purple-100"
                }`}
              >
                {lang}
              </div>

            ))}

          </div>

        </div>


        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-bold hover:scale-105 hover:bg-indigo-700 transition"
        >
          Continue 🚀
        </button>

      </div>

    </div>

  );
}