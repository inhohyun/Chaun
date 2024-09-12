import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Calendar from './pages/Home/Calendar/Calendar';
import Quest from './pages/Home/Quest/Quest';
import ExerciseRecommend from './pages/Exercise/Recommend/Recommend';
import Exercise from './pages/Exercise/Exercise';
import Record from './pages/Record/Record'
import BodyDetail from './pages/Record/BodyDetail'

export default function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/home/calendar" element={<Calendar />} />
          <Route path="/home/quest" element={<Quest />} />
          <Route path="/exercise/recommend" element={<ExerciseRecommend />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/record" element={<Record />} />
          <Route path="/record/bodyDetail" element={<BodyDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

