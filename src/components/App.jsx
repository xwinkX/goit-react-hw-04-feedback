import React from 'react';
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from 'components/Notification/Notification';

class App extends React.Component {
  
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  countTotalFeedback = () => {
    const state = this.state;
    const total = state.bad + state.neutral + state.good;
    return total;
  };

  countPositiveFeedbackPercentage = () => {
    const good = this.state.good;
    const positiveFeedback = Math.round(
      (good / this.countTotalFeedback()) * 100
    );
    return positiveFeedback;
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // // justifyContent: 'center',
          // alignItems: 'center',
          marginLeft: '30px',
          fontSize: 30,
          color: '#010101'
        }}
      > 
        <Section title={'Please leave feedback'}>
          <FeedbackOptions options={Object.keys(this.state)} onLeaveFeedback={this.countFeedback}/>
         </Section>
        <Section title={'Statistics'}>
            {this.countTotalFeedback() === 0 ? (
        <Notification message="There is no feedback" />
      ) : (
            <Statistics
          good={this.state.good}
          neutral={this.state.neutral}
          bad={this.state.bad}
          total={ this.countTotalFeedback()}
          positivePercentage={this.countPositiveFeedbackPercentage() }
              />
                )}
        </Section>
        
      </div>
    );
  };
}

export default App;