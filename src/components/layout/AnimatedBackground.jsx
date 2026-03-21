export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Stars */}
      <div className="absolute top-20 left-20 text-yellow-300 text-3xl animate-pulse">⭐</div>
      <div className="absolute top-40 right-32 text-yellow-300 text-2xl animate-pulse">⭐</div>
      <div className="absolute bottom-40 left-40 text-yellow-300 text-3xl animate-pulse">⭐</div>

      {/* Floating Books */}
      <div className="absolute top-32 left-1/3 text-4xl float">📚</div>
      <div className="absolute bottom-32 right-1/4 text-4xl float">📖</div>

      {/* Floating Pencils */}
      <div className="absolute top-60 right-20 text-3xl float">✏️</div>
      <div className="absolute bottom-20 left-20 text-3xl float">🖍️</div>

      {/* Bubbles */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-pink-300 rounded-full opacity-50 float"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-50 float"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-300 rounded-full opacity-50 float"></div>

      {/* Confetti */}
      <div className="absolute top-1/3 right-1/3 text-xl animate-bounce">🎉</div>
      <div className="absolute bottom-1/3 left-1/3 text-xl animate-bounce">🎊</div>

    </div>
  );
}