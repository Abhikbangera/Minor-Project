import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentSetup() {

  const navigate = useNavigate();

  const [selection, setSelection] = useState({
    class: "",
    language: ""
  });

  const handleSubmit = (e) => {
  e.preventDefault();

  const students =
    JSON.parse(localStorage.getItem("students")) || [];

  const currentStudent =
    JSON.parse(localStorage.getItem("studentData"));

  const updatedStudents = students.map((s) =>
    s.email === currentStudent.email
      ? { ...s, ...selection } // add class + language
      : s
  );

  localStorage.setItem("students", JSON.stringify(updatedStudents));
  localStorage.setItem("studentPreferences", JSON.stringify(selection));

  navigate("/student-dashboard");
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-200 via-purple-200 to-indigo-200 p-6">

      {/* App Name */}
      <div className="text-2xl font-bold text-indigo-700 mb-10">
        EduKids 🎓
      </div>

      <div className="flex items-center justify-center">

        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl">

          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
            Choose Your Learning Preferences
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Class Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Select Your Class
              </h3>

              <div className="grid grid-cols-3 gap-4">

                {[1,2,3,4,5,6].map((cls) => (
                  <div
                    key={cls}
                    onClick={() => setSelection({ ...selection, class: cls })}
                    className={`p-4 rounded-xl text-center cursor-pointer border transition
                      ${
                        selection.class === cls
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-100 hover:bg-indigo-200"
                      }`}
                  >
                    Class {cls}
                  </div>
                ))}

              </div>
            </div>

            {/* Language Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Select Learning Language
              </h3>

              <div className="grid grid-cols-3 gap-4">

                {["English","Hindi","Punjabi"].map((lang) => (
                  <div
                    key={lang}
                    onClick={() =>
                      setSelection({ ...selection, language: lang })
                    }
                    className={`p-4 rounded-xl text-center cursor-pointer border transition
                      ${
                        selection.language === lang
                        ? "bg-green-500 text-white"
                        : "bg-green-100 hover:bg-green-200"
                      }`}
                  >
                    {lang}
                  </div>
                ))}

              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition text-lg font-semibold"
            >
              Continue
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}
