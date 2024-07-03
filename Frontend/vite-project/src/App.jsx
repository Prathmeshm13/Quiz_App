import { useState } from 'react';
import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Details from './SignUp/Details';
import QuizForm from './CreateQuiz/CreateQuiz';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import AddQuestionForm from './CreateQuiz/Create Questions/CreateQuestion';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="signup" element={<Details />} />
            <Route path="quiz/create-quiz" element={<QuizForm />} />
            <Route path="quiz/add-question" element={<AddQuestionForm/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
