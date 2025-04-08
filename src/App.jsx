import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [genre, setGenre] = useState(null);
  const scienceQuestions = [
    { q: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter"], answer: "Mars" },
    { q: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], answer: "Carbon Dioxide" },
    { q: "What’s the speed of light (km/s)?", options: ["300,000", "150,000", "500,000"], answer: "300,000" },
    { q: "What’s H2O?", options: ["Salt", "Water", "Sugar"], answer: "Water" },
    { q: "What’s the largest organ in the body?", options: ["Brain", "Liver", "Skin"], answer: "Skin" },
    { q: "What element is a diamond made of?", options: ["Carbon", "Silicon", "Gold"], answer: "Carbon" },
    { q: "What’s the boiling point of water (°C)?", options: ["0", "100", "50"], answer: "100" },
    { q: "What gas makes up most of Earth’s atmosphere?", options: ["Oxygen", "Nitrogen", "Helium"], answer: "Nitrogen" },
    { q: "What’s the smallest unit of matter?", options: ["Atom", "Molecule", "Cell"], answer: "Atom" },
    { q: "What planet has the most moons?", options: ["Jupiter", "Saturn", "Earth"], answer: "Saturn" },
    { q: "What’s the primary source of Earth’s energy?", options: ["Sun", "Moon", "Core"], answer: "Sun" },
    { q: "What acid is in your stomach?", options: ["Hydrochloric", "Sulfuric", "Nitric"], answer: "Hydrochloric" },
    { q: "What’s the hardest natural substance?", options: ["Diamond", "Iron", "Quartz"], answer: "Diamond" },
    { q: "What’s the most abundant element in the universe?", options: ["Hydrogen", "Oxygen", "Carbon"], answer: "Hydrogen" },
    { q: "What force keeps us on Earth?", options: ["Gravity", "Magnetism", "Friction"], answer: "Gravity" },
  ];
  const historyQuestions = [
    { q: "Who discovered America?", options: ["Columbus", "Vespucci", "Magellan"], answer: "Columbus" },
    { q: "What year was the Declaration signed?", options: ["1776", "1789", "1800"], answer: "1776" },
    { q: "Who was Egypt’s last pharaoh?", options: ["Cleopatra", "Ramses", "Tut"], answer: "Cleopatra" },
    { q: "What war started in 1939?", options: ["WW1", "WW2", "Cold War"], answer: "WW2" },
    { q: "Who painted the Mona Lisa?", options: ["Da Vinci", "Picasso", "Monet"], answer: "Da Vinci" },
    { q: "What empire built the Colosseum?", options: ["Roman", "Greek", "Ottoman"], answer: "Roman" },
    { q: "Who was the first U.S. President?", options: ["Washington", "Lincoln", "Jefferson"], answer: "Washington" },
    { q: "What year did the Titanic sink?", options: ["1912", "1905", "1920"], answer: "1912" },
    { q: "Who wrote the Declaration of Independence?", options: ["Jefferson", "Franklin", "Adams"], answer: "Jefferson" },
    { q: "What war ended in 1945?", options: ["WW1", "WW2", "Vietnam"], answer: "WW2" },
    { q: "Who was the first man on the moon?", options: ["Armstrong", "Aldrin", "Gagarin"], answer: "Armstrong" },
    { q: "What ancient wonder was in Babylon?", options: ["Gardens", "Pyramid", "Statue"], answer: "Gardens" },
    { q: "Who led the French Revolution?", options: ["Napoleon", "Robespierre", "Louis XVI"], answer: "Robespierre" },
    { q: "What year did the Berlin Wall fall?", options: ["1989", "1991", "1985"], answer: "1989" },
    { q: "Who invented the printing press?", options: ["Gutenberg", "Edison", "Bell"], answer: "Gutenberg" },
  ];
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [allAnswered, setAllAnswered] = useState(false);

  const startGame = (chosenGenre) => {
    setGenre(chosenGenre);
    const qList = chosenGenre === 'science' ? scienceQuestions : historyQuestions;
    const shuffled = [...qList].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setShowIntro(true);
    setTimeout(() => setShowIntro(false), 2000);
  };

  const resetGame = () => {
    setCurrentQ(0);
    setScore(0);
    setAnswered(0);
    setTimeLeft(30);
    setGameOver(false);
    setAllAnswered(false);
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setShowIntro(true);
    setTimeout(() => setShowIntro(false), 2000);
  };

  useEffect(() => {
    if (genre && timeLeft > 0 && !showIntro) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [genre, timeLeft, showIntro]);

  const handleAnswer = (selected) => {
    const correct = questions[currentQ].answer;
    if (selected === correct) {
      setScore(score + 1);
    }
    setAnswered(answered + 1);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setAllAnswered(true);
      setGameOver(true);
    }
  };

  const getTheme = () => {
    if (genre === 'science') {
      return { background: '#6F8FAF', button: '#007bff', textColor: '#000' };
    }
    if (genre === 'history') {
      return { background: '#5C4033', button: '#d2b48c', textColor: '#fff' };
    }
    return { background: '#242424', button: '#666', textColor: '#fff' };
  };

  const theme = getTheme();

  useEffect(() => {
    document.body.style.color = theme.textColor;
    return () => {
      document.body.style.color = null;
    };
  }, [theme]);

  return (
    <div className="App" style={{
      backgroundColor: `${theme.background}cc`,
      color: theme.textColor,
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      padding: '2rem'
    }}>
      <h1>Trivia Rush</h1>
      {!gameStarted ? (
        <div className="start-screen">
          <h2>Enter Your Name</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
          />
          <button onClick={() => username && setGameStarted(true)} disabled={!username}>
            Start
          </button>
        </div>
      ) : !genre ? (
        <div className="genre-select">
          <h2>Pick a Genre, {username}</h2>
          <button 
            onClick={() => startGame('science')}
            style={{ backgroundColor: genre ? theme.button : '#007bff' }}>🔬Science</button>
          <button 
            onClick={() => startGame('history')}
            style={{ backgroundColor: genre ? theme.button : '#8b4513' }}>📜History</button>
        </div>
      ) : showIntro ? (
        <div className="intro intro fade">
          <h2>Get Ready, {username}!</h2>
          <p>You have 30 seconds, think fast!</p>
        </div>
      ) : gameOver ? (
        <div className="results results fade">
          {allAnswered ? (
            <>
              <h2>Wow, {username}!</h2>
              <p>You crushed it—answered all {questions.length} questions in 30 seconds!</p>
              <p>Score: {score} / {answered}</p>
              <p>Thanks for playing—legend!</p>
            </>
          ) : (
            <>
              <h2>Game Over, {username}!</h2>
              <p>You're fast, but you weren’t fast enough!</p>
              <p>Score: {score} / {answered}</p>
            </>
          )}
          <button onClick={resetGame}>Play Again?</button>
          <button onClick={() => {
            setGameStarted(false);
            setGenre(null);
            setQuestions([]);
            setUsername('');
            setCurrentQ(0);
            setScore(0);
            setAnswered(0);
            setTimeLeft(30);
            setGameOver(false);
            setAllAnswered(false);
            setShowIntro(false);
            }}>Nah.</button>
        </div>
      ) : (
        <div className="game game fade">
          <div className="timer">Time Left: {timeLeft}s</div>
          <h2>{questions[currentQ].q}</h2>
          <div className="options">
            {questions[currentQ].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;