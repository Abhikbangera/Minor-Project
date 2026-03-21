export default function EduBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Floating Math Symbols */}
      <span className="absolute text-5xl text-indigo-400 float-slow top-20 left-20">+</span>
      <span className="absolute text-4xl text-pink-400 float-medium top-60 right-20">÷</span>
      <span className="absolute text-6xl text-green-400 float-slow bottom-20 left-40">×</span>
      <span className="absolute text-5xl text-yellow-400 float-medium bottom-40 right-40">−</span>

      {/* Books */}
      <span className="absolute text-5xl float-fast top-40 left-1/2">📚</span>
      <span className="absolute text-4xl float-medium bottom-32 right-1/3">📖</span>

      {/* Stars */}
      <span className="absolute text-3xl text-yellow-300 animate-pulse top-10 right-20">⭐</span>
      <span className="absolute text-2xl text-yellow-300 animate-pulse bottom-10 left-20">⭐</span>

      {/* Bubbles */}
      <div className="absolute w-16 h-16 bg-blue-300 opacity-40 rounded-full float-medium top-1/3 left-10"></div>
      <div className="absolute w-20 h-20 bg-pink-300 opacity-40 rounded-full float-slow bottom-20 right-10"></div>

    </div>
  );
}