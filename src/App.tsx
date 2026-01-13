import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { QuizView } from './components/QuizView';
import { GamesHub } from './components/GamesHub';
import { NumberRush } from './components/games/NumberRush';
import { FractionMatch } from './components/games/FractionMatch';
import { GeoDetective } from './components/games/GeoDetective';
import { ProgressProvider } from './context/ProgressContext';

function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="lesson/:topicId/:subTopicId" element={<LessonView />} />
          <Route path="quiz/:topicId/:subTopicId" element={<QuizView />} />
          <Route path="games" element={<GamesHub />} />
          <Route path="games/number-rush" element={<NumberRush />} />
          <Route path="games/fraction-match" element={<FractionMatch />} />
          <Route path="games/geo-detective" element={<GeoDetective />} />
        </Route>
      </Routes>
    </ProgressProvider>
  );
}

export default App;
