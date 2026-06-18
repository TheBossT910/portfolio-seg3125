import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/memory-game/Navbar';
import Footer from '../../components/memory-game/Footer';

// Palette
// #780000  deep burgundy
// #c1121f  red (primary CTA / wrong-answer accent)
// #fdf0d5  cream (page bg)
// #003049  navy (primary text, correct-answer accent)
// #669bbc  medium blue (secondary UI)
// #aed9e0  light blue (borders, muted backgrounds)

// TODO: combine this Nav with Nav component
// const Navbar = ({ difficulty }) => {
//   const isHard = difficulty === 'Hard';
//   return (
//     <nav className="sticky top-0 z-50 bg-[#fdf0d5]/95 backdrop-blur-md border-b-2 border-[#aed9e0] px-8 py-4 flex justify-between items-center">
//       <div className="flex items-center gap-3">
//         <div className="bg-[#003049] text-[#fdf0d5] p-2 rounded-xl">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
//           </svg>
//         </div>
//         <span className="text-2xl font-black tracking-tight text-[#003049]">MotorMemory</span>
//       </div>

//       <div className="hidden md:flex bg-white rounded-full p-1 border-2 border-[#aed9e0] gap-1">
//         <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#003049] text-white font-bold text-sm">
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           Play
//         </button>
//         <button className="flex items-center gap-2 px-6 py-2 rounded-full text-[#003049] hover:bg-[#aed9e0]/40 font-bold text-sm transition-colors">
//           Leaderboard
//         </button>
//       </div>

//       <button className="flex items-center gap-2 bg-white hover:bg-[#aed9e0]/30 border-2 border-[#aed9e0] px-3 py-1.5 rounded-full transition-colors">
//         <div className="w-8 h-8 rounded-full bg-[#669bbc] text-white flex items-center justify-center font-black text-sm">
//           {isHard ? 'YK' : 'FR'}
//         </div>
//         <span className="font-bold text-[#003049] hidden md:block text-sm pr-1">
//           {isHard ? 'Yuki' : 'Fernando'}
//         </span>
//       </button>
//     </nav>
//   );
// };

// game data
const gameData = [
  {
    id: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCWV5oLQ5jMsQfLnpIvqWko5vevbVfRpkfaQ&s',
    images: [
      'https://placehold.co/400x280/aed9e0/003049?text=Honda+NSX',
      'https://placehold.co/400x280/fdf0d5/003049?text=Toyota+Supra',
      'https://placehold.co/400x280/669bbc/fdf0d5?text=Nissan+GT-R',
      'https://placehold.co/400x280/003049/fdf0d5?text=Mazda+RX-7',
    ],
    brand: 'Honda',
    model: 'NSX',
    color: 'White',
    country: 'Japan',
    year: 1990,
    question: 'What brand made this car?',
    options: ['Honda', 'Toyota', 'Lexus', 'Subaru'],
    answer: 'Honda',
  },
  {
    id: 2,
    image: 'https://www.classicvwbugs.com/wp-content/uploads/2023/08/DSC_0134.jpg',
    images: [
      'https://placehold.co/400x280/e2e8f0/003049?text=VW+Beetle',
      'https://placehold.co/400x280/fdf0d5/c1121f?text=Mini+Cooper',
      'https://placehold.co/400x280/669bbc/fdf0d5?text=Fiat+500',
      'https://placehold.co/400x280/aed9e0/003049?text=VW+Golf',
    ],
    brand: 'Volkswagen',
    model: 'Beetle',
    color: 'Blue',
    country: 'Germany',
    year: 1965,
    question: 'Which iconic model was this blue car?',
    options: ['Golf', 'Beetle', 'Mini Cooper', 'Fiat 500'],
    answer: 'Beetle',
  },
  {
    id: 3,
    image: 'https://s3.us-east-2.amazonaws.com/prod.mm.com/img/carforsale/20250121_1994_Porsche_911_S_001_a.jpeg',
    images: [
      'https://placehold.co/400x280/fdf0d5/c1121f?text=Yellow+911',
      'https://placehold.co/400x280/003049/fdf0d5?text=Red+Ferrari',
      'https://placehold.co/400x280/c1121f/fdf0d5?text=Silver+Lambo',
      'https://placehold.co/400x280/669bbc/003049?text=Black+Bugatti',
    ],
    brand: 'Porsche',
    model: '911',
    color: 'Yellow',
    country: 'Germany',
    year: 1973,
    question: 'What color was the Porsche 911?',
    options: ['Red', 'Yellow', 'Silver', 'Black'],
    answer: 'Yellow',
  },
  {
    id: 4,
    image: 'https://bringatrailer.com/wp-content/uploads/2023/08/1999_ford_mustang-gt-coupe_dsc9915-48833.jpg',
    images: [
      'https://placehold.co/400x280/c1121f/fdf0d5?text=Ford+Mustang',
      'https://placehold.co/400x280/003049/fdf0d5?text=Dodge+Challenger',
      'https://placehold.co/400x280/669bbc/fdf0d5?text=Chevy+Camaro',
      'https://placehold.co/400x280/aed9e0/003049?text=Pontiac+GTO',
    ],
    brand: 'Ford',
    model: 'Mustang',
    color: 'Red',
    country: 'USA',
    year: 1968,
    question: 'Which American pony car is this?',
    options: ['Mustang', 'Challenger', 'Camaro', 'GTO'],
    answer: 'Mustang',
  },
  {
    id: 5,
    image: 'https://carsales.pxcrush.net/carsales/cars/private/4hifaaxd5y4e2hbdr2g31t5to.jpg?pxc_method=fitfill&pxc_bgtype=self&pxc_size=720,480',
    images: [
      'https://placehold.co/400x280/669bbc/fdf0d5?text=Toyota+Corolla',
      'https://placehold.co/400x280/fdf0d5/003049?text=Honda+Civic',
      'https://placehold.co/400x280/aed9e0/003049?text=Mazda+3',
      'https://placehold.co/400x280/003049/aed9e0?text=Nissan+Sentra',
    ],
    brand: 'Toyota',
    model: 'Corolla',
    color: 'Silver',
    country: 'Japan',
    year: 2001,
    question: 'What model is this silver Japanese car?',
    options: ['Corolla', 'Civic', 'Mazda 3', 'Sentra'],
    answer: 'Corolla',
  },
  {
    id: 6,
    image: 'https://bringatrailer.com/wp-content/uploads/2019/04/1987_ferrari_testarossa_15565992725d565ef66e7dffTD-11-e1558111852393.jpg?fit=940%2C625',
    images: [
      'https://placehold.co/400x280/780000/fdf0d5?text=Ferrari+Testarossa',
      'https://placehold.co/400x280/003049/fdf0d5?text=Lamborghini+Countach',
      'https://placehold.co/400x280/c1121f/fdf0d5?text=Maserati+Ghibli',
      'https://placehold.co/400x280/669bbc/fdf0d5?text=Alfa+Romeo+GTV',
    ],
    brand: 'Ferrari',
    model: 'Testarossa',
    color: 'Black',
    country: 'Italy',
    year: 1984,
    question: 'Which Italian supercar is shown here?',
    options: ['Testarossa', 'Countach', 'Ghibli', 'GTV'],
    answer: 'Testarossa',
  },
];

// countdown timer
const useCountdown = (seconds, active, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!active) return;
    if (timeLeft <= 0) { onExpire(); return; }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, active, onExpire]);

  return timeLeft;
};

// progress bar
const ProgressBar = ({ current, total, phase }) => (
  <div className="w-full mb-10">
    <div className="flex justify-between items-center mb-3">
      <span className="text-xs font-black uppercase tracking-widest text-[#669bbc]">
        {phase === 'memorize' ? 'Observation' : 'Recall'} · {current + 1} of {total}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-8 rounded-full transition-all duration-500 ${
              i < current ? 'bg-[#669bbc]' : i === current ? 'bg-[#003049]' : 'bg-[#aed9e0]/50'
            }`}
          />
        ))}
      </div>
    </div>
  </div>
);

// timer ring
const TimerRing = ({ timeLeft, maxTime }) => {
  const pct = timeLeft / maxTime;
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  const color = timeLeft > maxTime * 0.5 ? '#003049' : timeLeft > maxTime * 0.25 ? '#c1121f' : '#780000';

  return (
    <div className="flex flex-col items-center">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="#aed9e0" strokeWidth="8" />
        <circle
          cx="45" cy="45" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
        />
        <text x="45" y="52" textAnchor="middle" fontSize="22" fontWeight="900" fill={color} fontFamily="sans-serif">
          {timeLeft}
        </text>
      </svg>
      <span className="text-xs font-bold text-[#003049]/50 -mt-1">seconds</span>
    </div>
  );
};

const GamePage = () => {
  const [difficulty, setDifficulty] = useState('Easy'); // 'Easy' | 'Medium' | 'Hard'
  const isTimedMode = difficulty !== 'Easy';
  const MEMORIZE_TIME = difficulty === 'Hard' ? 10 : 30;
  const QUIZ_TIME = difficulty === 'Hard' ? 10 : 30;

  const [phase, setPhase] = useState('memorize');   // 'memorize' | 'quiz' | 'finished'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackState, setFeedbackState] = useState(null);  // null | 'correct' | 'incorrect'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const currentCar = gameData[currentIndex];

  // memorize timer (timed modes only)
  const handleMemorizeExpire = useCallback(() => {
    setPhase('quiz');
    setCurrentIndex(0);
    setTimerActive(false);
  }, []);
  const memorizeTimeLeft = useCountdown(MEMORIZE_TIME, timerActive && phase === 'memorize', handleMemorizeExpire);

  // quiz timer (timed modes only)
  const handleQuizExpire = useCallback(() => {
    advanceQuiz(true); // treat as skip on timeout
  }, [currentIndex]);
  const quizTimeLeft = useCountdown(QUIZ_TIME, timerActive && phase === 'quiz' && !feedbackState, handleQuizExpire);

  useEffect(() => {
    if (isTimedMode) setTimerActive(true);
  }, [isTimedMode]);

  useEffect(() => {
    if (phase === 'quiz' && !quizStartTime) setQuizStartTime(Date.now());
  }, [phase]);

  // navigation (Easy / memorize)
  const handleNext = () => {
    if (currentIndex < gameData.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setPhase('quiz');
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  // quiz answer
  const handleAnswerClick = (option) => {
    if (feedbackState === 'correct' || userAnswers[currentCar.id]) return;
    setSelectedAnswer(option);
    setUserAnswers(prev => ({ ...prev, [currentCar.id]: option }));

    if (option === currentCar.answer) {
      setFeedbackState('correct');
      setTimerActive(false);
      setTimeout(() => advanceQuiz(), 1100);
    } else {
      setFeedbackState('incorrect');
    }
  };

  const advanceQuiz = (isSkip = false) => {
    if (isSkip && !userAnswers[currentCar.id]) {
      setUserAnswers(prev => ({ ...prev, [currentCar.id]: 'Skipped' }));
    }
    setFeedbackState(null);
    setSelectedAnswer(null);
    setTimerActive(isTimedMode);

    if (currentIndex < gameData.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setTimeTaken(quizStartTime ? Math.round((Date.now() - quizStartTime) / 1000) : 0);
      setPhase('finished');
    }
  };

  const resetGame = () => {
    setPhase('memorize');
    setCurrentIndex(0);
    setUserAnswers({});
    setFeedbackState(null);
    setSelectedAnswer(null);
    setQuizStartTime(null);
    setTimeTaken(0);
    setTimerActive(isTimedMode);
  };

  // ── Derived stats ──
  const correctCount = gameData.filter(car => userAnswers[car.id] === car.answer).length;
  const skippedCount = Object.values(userAnswers).filter(a => a === 'Skipped').length;
  const accuracy = gameData.length ? Math.round((correctCount / gameData.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#fdf0d5] font-sans text-[#003049] selection:bg-[#c1121f] selection:text-white flex flex-col">
      <Navbar difficulty={difficulty} showDifficultySelector={true} />

      {/* demo difficulty switcher */}
      <div className="flex justify-center gap-2 py-3 bg-[#aed9e0]/20 border-b border-[#aed9e0]">
        <span className="text-xs font-bold text-[#003049]/50 self-center">Demo mode:</span>
        {['Easy', 'Medium', 'Hard'].map(d => (
          <button
            key={d}
            onClick={() => { setDifficulty(d); resetGame(); }}
            className={`text-xs px-3 py-1 rounded-full font-bold border transition-colors ${
              difficulty === d ? 'bg-[#003049] text-white border-[#003049]' : 'bg-white text-[#003049] border-[#aed9e0]'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-10 flex flex-col">

        {/* memorize phase */}
        {phase === 'memorize' && (
          <>
            <ProgressBar current={currentIndex} total={gameData.length} phase="memorize" />

            <div className="mb-4 flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-black text-[#003049]">Study these cars carefully</h1>
                <p className="text-sm text-[#003049]/50 mt-1 font-medium">
                  {isTimedMode
                    ? 'The quiz will begin automatically when the timer runs out.'
                    : 'Take your time. Press Next when ready. Start Quiz on the last card.'}
                </p>
              </div>
              {isTimedMode && <TimerRing timeLeft={memorizeTimeLeft} maxTime={MEMORIZE_TIME} />}
            </div>

            {/* hard mode */}
            {difficulty === 'Hard' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gameData.map((car) => (
                  <div
                    key={car.id}
                    className="bg-white rounded-2xl overflow-hidden border-2 border-[#aed9e0] shadow-sm"
                  >
                    <img src={car.image} alt={car.brand} className="w-full h-36 object-cover" />
                    <div className="p-3 bg-[#003049] text-white text-center">
                      <p className="font-black text-sm">{car.brand} {car.model}</p>
                      <p className="text-xs text-[#aed9e0]/80">{car.color} · {car.year} · {car.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* easy mode */
              <>
                <div className="bg-white rounded-[2rem] overflow-hidden border-2 border-[#aed9e0] shadow-xl mb-6">
                  <img
                    src={currentCar.image}
                    alt={currentCar.brand}
                    className="w-full h-[380px] md:h-[440px] object-cover"
                  />
                  {/* info overlay*/}
                  <div className="p-6 flex items-center justify-between flex-wrap gap-4 bg-[#003049]">
                    <div>
                      <p className="text-white font-black text-2xl">{currentCar.brand} {currentCar.model}</p>
                      <p className="text-[#aed9e0] text-sm font-medium">{currentCar.year} · {currentCar.country}</p>
                    </div>
                    <span className="bg-[#aed9e0]/20 border border-[#aed9e0]/40 text-[#aed9e0] text-sm font-bold px-4 py-1.5 rounded-full">
                      {currentCar.color}
                    </span>
                  </div>
                </div>

                {/* navigation uses similarity (both buttons same height) */}
                <div className="flex gap-4">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-lg border-2 transition-all ${
                      currentIndex === 0
                        ? 'bg-white/50 text-[#003049]/25 border-[#aed9e0]/40 cursor-not-allowed'
                        : 'bg-white text-[#003049] border-[#aed9e0] hover:bg-[#aed9e0]/20 hover:-translate-x-0.5'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-lg bg-[#003049] text-white hover:bg-[#002236] hover:translate-x-0.5 transition-all shadow-lg shadow-[#003049]/20"
                  >
                    {currentIndex === gameData.length - 1 ? 'Start Quiz' : 'Next'}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                        d={currentIndex === gameData.length - 1
                          ? 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                          : 'M14 5l7 7m0 0l-7 7m7-7H3'}
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* quiz phase */}
        {phase === 'quiz' && (
          <>
            <ProgressBar current={currentIndex} total={gameData.length} phase="quiz" />

            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-black text-[#003049] leading-tight">
                  {currentCar.question}
                </h1>
                {isTimedMode && (
                  <p className="text-sm text-[#003049]/50 mt-1 font-medium">Select your answer before the timer runs out.</p>
                )}
              </div>
              {isTimedMode && !feedbackState && (
                <TimerRing timeLeft={quizTimeLeft} maxTime={QUIZ_TIME} />
              )}
            </div>

            {/* large image context */}
            <div className="bg-white rounded-[2rem] overflow-hidden border-2 border-[#aed9e0] shadow-xl mb-6">
              <img src={currentCar.image} alt="Question" className="w-full h-64 md:h-80 object-cover" />
            </div>

            {/* 4-option grid. Has a common region via the same bg grouping them */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {currentCar.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentCar.answer;

                let style = 'bg-white text-[#003049] border-2 border-transparent hover:border-[#669bbc] hover:shadow-md hover:-translate-y-0.5';
                if (feedbackState && isSelected) {
                  style = feedbackState === 'correct'
                    ? 'bg-[#003049] text-white border-2 border-[#003049] scale-[1.02] shadow-lg'
                    : 'bg-[#c1121f]/10 text-[#c1121f] border-2 border-[#c1121f]';
                } else if (feedbackState === 'correct' && isCorrect && !isSelected) {
                  style = 'bg-[#003049] text-white border-2 border-[#003049]';
                } else if (feedbackState === 'correct' && !isCorrect) {
                  style = 'bg-gray-100 text-gray-400 border-2 border-transparent opacity-50';
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswerClick(option)}
                    disabled={feedbackState === 'correct'}
                    className={`py-7 px-5 rounded-2xl font-black text-xl transition-all duration-200 ${style}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* feedback */}
            <div className="h-14 flex items-center justify-center">
              {feedbackState === 'incorrect' && (
                <div className="flex items-center gap-2 bg-[#c1121f]/10 border-2 border-[#c1121f]/30 px-6 py-3 rounded-2xl text-[#c1121f] font-bold text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Incorrect.
                </div>
              )}
            </div>

            {/* skip button */}
            <div className="flex justify-end mt-2">
              <button
                onClick={() => advanceQuiz(true)}
                disabled={feedbackState === 'correct'}
                className="flex items-center gap-2 text-sm font-bold text-[#669bbc] hover:text-[#003049] transition-colors group disabled:opacity-40"
              >
                Skip question
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* finished phase */}
        {phase === 'finished' && (
          <div className="flex flex-col">
            <h1 className="text-4xl font-black text-[#003049] text-center mb-10 tracking-tight">
              Performance Summary
            </h1>

            {/* Stats row. Uses similarity (identical card shape groups them) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: 'Score', value: `${correctCount}/${gameData.length}` },
                { label: 'Accuracy', value: `${accuracy}%` },
                { label: 'Time', value: `${timeTaken}s` },
                { label: 'Skipped', value: skippedCount },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-3xl p-6 border-2 border-[#aed9e0] flex flex-col items-center text-center">
                  <span className="text-xs font-black uppercase tracking-widest text-[#669bbc] mb-2">{label}</span>
                  <span className="text-4xl font-black text-[#003049]">{value}</span>
                </div>
              ))}
            </div>

            {/* question breakdown proximity groups each card's content */}
            <h2 className="text-2xl font-black text-[#003049] mb-6 pb-3 border-b-2 border-[#aed9e0]">
              Question Breakdown
            </h2>
            <div className="flex flex-col gap-8 mb-16">
              {gameData.map((car, index) => {
                const userAnswer = userAnswers[car.id] || 'Skipped';
                const isCorrect = userAnswer === car.answer;

                return (
                  <div
                    key={car.id}
                    className="flex flex-col md:flex-row bg-white rounded-[2rem] overflow-hidden border-2 border-[#aed9e0] shadow-md"
                  >
                    <div className="md:w-[55%] relative flex-shrink-0">
                      <img src={car.image} alt={car.brand} className="w-full h-52 md:h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#003049]/90 via-[#003049]/30 to-transparent flex items-end p-6">
                        <div className="text-white">
                          <span className="text-xs font-black uppercase tracking-widest text-[#aed9e0] block mb-1">
                            Question {index + 1}
                          </span>
                          <p className="text-lg font-bold leading-snug">{car.question}</p>
                        </div>
                      </div>
                    </div>

                    {/* answer panels */}
                    <div className="md:w-[45%] flex flex-col p-6 gap-4 bg-[#fdf0d5]/60">
                      <div className="flex-1 bg-white rounded-2xl border-2 border-[#aed9e0] p-5 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-black uppercase tracking-widest text-[#669bbc] mb-2">Your Answer</span>
                        <span className={`text-3xl font-black ${isCorrect ? 'text-[#003049]' : 'text-[#c1121f]'}`}>
                          {userAnswer}
                        </span>
                      </div>

                      <div className={`rounded-2xl p-5 flex flex-col items-center justify-center text-white ${
                        isCorrect ? 'bg-[#003049]' : 'bg-[#780000]'
                      }`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          {isCorrect
                            ? <svg className="w-5 h-5 text-[#aed9e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                            : <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                          }
                          <span className="text-xs font-black uppercase tracking-widest opacity-80">
                            {isCorrect ? 'Correct!' : 'Correct Answer'}
                          </span>
                        </div>
                        <span className="text-2xl font-black">{car.answer}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* play again */}
            <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center pb-12">
              <h2 className="text-3xl font-black mb-3 text-[#003049]">Ready for another round?</h2>
              <p className="text-[#003049]/60 font-medium mb-8">Try a different category or push for a harder difficulty.</p>
              <button
                onClick={resetGame}
                className="w-full bg-[#c1121f] text-white py-5 rounded-2xl text-xl font-black hover:bg-[#780000] shadow-xl shadow-[#c1121f]/25 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
              >
                Play Again
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GamePage;