import React, { useState, useEffect } from 'react';

const Home: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <div>Home works!</div>
      <div>
        Time remaining: {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default Home;
