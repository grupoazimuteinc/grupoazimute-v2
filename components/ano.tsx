import React, { useState, useEffect } from 'react';

const Ano = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return <span>{currentYear}</span>;
};

export default Ano;