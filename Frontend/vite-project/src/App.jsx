import { useState } from 'react';
import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Details from './SignUp/Details';
import QuizForm from './CreateQuiz/CreateQuiz';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import AddQuestionForm from './CreateQuiz/Create Questions/CreateQuestion';
import Login from './SignUp/Login';
import Home from './Home/Home';
import Explore from './Explore/Explore';
import QuizPage from './Explore/Explore2';
import Quiz from './Quiz/Quiz';
import Leaderboard from './Leaderboard/Leaderboard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home/>} />
            <Route path="signup" element={<Details />} />
            <Route path="login" element={<Login />} />
            <Route path="quiz/create-quiz" element={<QuizForm />} />
            <Route path="quiz/add-question" element={<AddQuestionForm/>} />
            <Route path="/explore" element={<QuizPage/>} />
            <Route path="/quiz" element={<Quiz/>}></Route>
            <Route path='/leaderboard'element={<Leaderboard/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
