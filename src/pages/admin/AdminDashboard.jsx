import { useEffect, useState } from "react";

export default function AdminDashboard() {

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [syllabus, setSyllabus] = useState({});

  const [form, setForm] = useState({
    class: "",
    subject: "",
    chapter: ""
  });

  // 🔄 LOAD DATA
  useEffect(() => {

    const allStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    const teacherData =
      JSON.parse(localStorage.getItem("teacherData"));

    const teacherPref =
      JSON.parse(localStorage.getItem("teacherPreferences"));

    const storedSyllabus =
      JSON.parse(localStorage.getItem("syllabusData")) || {};

    setStudents(allStudents);
    setSyllabus(storedSyllabus);

    if (teacherData && teacherPref) {
      setTeachers([{
        name: teacherData.name,
        class: teacherPref.class,
        language: teacherPref.language
      }]);
    }

  }, []);

  // ➕ ADD SYLLABUS
  const addSyllabus = () => {

    const { class: cls, subject, chapter } = form;

    if (!cls || !subject || !chapter) {
      alert("Fill all fields");
      return;
    }

    let updated = { ...syllabus };

    if (!updated[cls]) updated[cls] = {};
    if (!updated[cls][subject]) updated[cls][subject] = [];

    updated[cls][subject].push(chapter);

    setSyllabus(updated);
    localStorage.setItem("syllabusData", JSON.stringify(updated));

    setForm({ class: "", subject: "", chapter: "" });
  };

  // ❌ DELETE CHAPTER
  const deleteChapter = (cls, subject, chapter) => {

    let updated = { ...syllabus };

    updated[cls][subject] =
      updated[cls][subject].filter(c => c !== chapter);

    setSyllabus(updated);
    localStorage.setItem("syllabusData", JSON.stringify(updated));
  };

  // ✏️ EDIT CHAPTER
  const editChapter = (cls, subject, oldChapter) => {

    const newChapter = prompt("Edit chapter name:", oldChapter);

    if (!newChapter) return;

    let updated = { ...syllabus };

    updated[cls][subject] =
      updated[cls][subject].map(c =>
        c === oldChapter ? newChapter : c
      );

    setSyllabus(updated);
    localStorage.setItem("syllabusData", JSON.stringify(updated));
  };

  // ❌ DELETE STUDENT
  const deleteStudent = (email) => {
    const updated = students.filter(s => s.email !== email);
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
  };

  // ❌ DELETE TEACHER
  const deleteTeacher = () => {
    localStorage.removeItem("teacherData");
    localStorage.removeItem("teacherPreferences");
    setTeachers([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100 p-8">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard 👑
      </h1>

      {/* OVERVIEW */}
      <div className="grid grid-cols-2 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3>Total Students 👨‍🎓</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {students.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3>Total Teachers 👩‍🏫</h3>
          <p className="text-3xl font-bold text-purple-600">
            {teachers.length}
          </p>
        </div>

      </div>

      {/* STUDENTS */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-xl font-bold mb-4">Students</h2>

        {students.length === 0 ? (
          <p>No students available</p>
        ) : students.map((s, i) => (

          <div key={i} className="flex justify-between items-center mb-2">

            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-gray-600">
                Class {s.class}
              </p>
            </div>

            <button
              onClick={() => deleteStudent(s.email)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

      {/* TEACHERS */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-xl font-bold mb-4">Teachers</h2>

        {teachers.length === 0 ? (
          <p>No teachers available</p>
        ) : teachers.map((t, i) => (

          <div key={i} className="flex justify-between items-center mb-2">

            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-600">
                Class {t.class} | {t.language}
              </p>
            </div>

            <button
              onClick={deleteTeacher}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

      {/* ADD SYLLABUS */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-xl font-bold mb-4">
          Manage Syllabus 📚
        </h2>

        <div className="grid gap-3">

          <input
            placeholder="Class"
            value={form.class}
            onChange={(e) =>
              setForm({ ...form, class: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Chapter"
            value={form.chapter}
            onChange={(e) =>
              setForm({ ...form, chapter: e.target.value })
            }
            className="border p-2 rounded"
          />

          <button
            onClick={addSyllabus}
            className="bg-indigo-600 text-white p-2 rounded"
          >
            Add Chapter
          </button>

        </div>

      </div>

      {/* DISPLAY SYLLABUS */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">Syllabus</h2>

        {Object.keys(syllabus).length === 0 ? (
          <p>No syllabus added</p>
        ) : Object.keys(syllabus).map(cls => (

          <div key={cls} className="mb-4">

            <h3 className="font-bold">Class {cls}</h3>

            {Object.keys(syllabus[cls]).map(sub => (

              <div key={sub} className="ml-4">

                <p className="font-semibold">{sub}</p>

                {syllabus[cls][sub].map(ch => (

                  <div key={ch} className="flex justify-between ml-6">

                    <span>{ch}</span>

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          editChapter(cls, sub, ch)
                        }
                        className="text-blue-500"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() =>
                          deleteChapter(cls, sub, ch)
                        }
                        className="text-red-500"
                      >
                        ❌
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            ))}

          </div>

        ))}

      </div>

    </div>
  );
}
