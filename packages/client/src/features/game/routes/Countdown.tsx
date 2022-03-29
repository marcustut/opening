import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

const SESSIONTIMEINSECONDS = 2700;

export const CountDown: React.FC = () => {
  const [seconds, setSeconds] = useState(SESSIONTIMEINSECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s != 0 ? s - 1 : s));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeLeft = () => {
    const splittedMin = (seconds / 60).toString().split('.')[0];
    const splittedSec = seconds - parseInt(splittedMin) * 60;

    return `${splittedMin}:${
      splittedSec < 10 ? '0' + splittedSec.toString() : splittedSec.toString()
    }`;
  };

  return (
    // FIXME: Issue with height and width
    <div
      style={{
        width: '100vh',
        height: '100vh',
        margin: 'auto',
        padding: '1.75rem',
      }}
    >
      <CircularProgressbar
        text={timeLeft()}
        value={seconds}
        maxValue={SESSIONTIMEINSECONDS}
        strokeWidth={5}
        styles={{
          text: { fill: '#FFF', fontFamily: 'Lato', fontSize: '1.5rem', fontWeight: 'black' },
          path: {
            strokeLinecap: 'butt',
            stroke: '#0dcb21',
          },
          trail: {
            stroke: 'red',
          },
        }}
      />
    </div>
  );
};
