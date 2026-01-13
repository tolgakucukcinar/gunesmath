import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { QuizView } from './components/QuizView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="lesson/:topicId/:subTopicId" element={<LessonView />} />
        <Route path="quiz/:topicId/:subTopicId" element={<QuizView />} />
      </Route>
    </Routes>
  );
}

export default App;
