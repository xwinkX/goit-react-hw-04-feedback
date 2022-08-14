import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from 'components/Notification/Notification';
import { useState } from "react";


export default function App() {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = { good, neutral, bad };
  
  const countFeedback = option => {
    switch (option) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        return;
    }
  }
    
    const countTotalFeedback = () => {
      const total = bad + neutral + good;
      return total;
    };

    const countPositiveFeedbackPercentage = () => {
       const positiveFeedback = Math.round(
        (good / countTotalFeedback()) * 100
      );
      return positiveFeedback;
    };

  
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '30px',
          fontSize: 30,
          color: '#010101'
        }}
      >
        <Section title={'Please leave feedback'}>
          <FeedbackOptions options={Object.keys(feedback)} onLeaveFeedback={countFeedback} />
        </Section>
        <Section title={'Statistics'}>
          {countTotalFeedback() === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
        
      </div>
    );
  };


