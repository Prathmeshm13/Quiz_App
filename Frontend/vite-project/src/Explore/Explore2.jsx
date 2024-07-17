import React, { useEffect, useState } from 'react';
import './QuizPage.css';
import { useDispatch, useSelector } from 'react-redux';
import QuizCard from './QuizCard';
import RegList from './RegList';
import { fetchQuizzes } from '../../features/quiz';

const QuizPage = () => {
  const dispatch = useDispatch();
  const quizes = useSelector(state => state.quizes[0]);
  const user = useSelector(state => state.user);
  const [todaydate, setTodayDate] = useState({});
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quizzes when the component mounts
    dispatch(fetchQuizzes());
    const currentDate = new Date();
    setTodayDate(currentDate);
  }, []);

  useEffect(() => {
    // Sort quizzes based on quizDate when quizes state updates
    if (quizes && quizes.length > 0) {
      const sortedQuizzes = [...quizes].sort((a, b) => new Date(a.quizDate) - new Date(b.quizDate));
      // Filter only upcoming quizzes
      const upcoming = sortedQuizzes.filter(quiz => new Date(quiz.quizDate) >= new Date(new Date().getTime()-quiz.quizDuration*60000));
      setUpcomingQuizzes(upcoming.slice(0, 2)); // Take only the first two upcoming quizzes
    }
  }, [quizes, todaydate]);

  return (
    <div className="quiz-page">
      <h2>Upcoming Quizzes</h2>
      <div className="upcoming-quizzes">
        {upcomingQuizzes.map((quiz) => (
          <div key={quiz.id}><QuizCard quiz={quiz} userEmail={user} /></div>
        ))}
      </div>
      <div className="past-quizzes">
        <h2>Past Quizzes</h2>
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Quiz</th>
              <th>Date</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {quizes && quizes.map((quiz) => (
              <RegList key={quiz.id} quiz={quiz} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizPage;
