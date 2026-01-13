import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  completedTopics: string[];
  markTopicComplete: (id: string) => void;
  quizScores: Record<string, number>;
  saveQuizScore: (id: string, score: number) => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  mascotVisible: boolean;
  toggleMascot: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from localStorage
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedTopics');
    return saved ? JSON.parse(saved) : [];
  });

  const [quizScores, setQuizScores] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('quizScores');
    return saved ? JSON.parse(saved) : {};
  });

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [mascotVisible, setMascotVisible] = useState(true);

  // Persist changes
  useEffect(() => {
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('quizScores', JSON.stringify(quizScores));
  }, [quizScores]);

  const markTopicComplete = (id: string) => {
    if (!completedTopics.includes(id)) {
      setCompletedTopics(prev => [...prev, id]);
    }
  };

  const saveQuizScore = (id: string, score: number) => {
    setQuizScores(prev => ({ ...prev, [id]: score }));
  };

  const toggleAudio = () => setAudioEnabled(prev => !prev);
  const toggleMascot = () => setMascotVisible(prev => !prev);

  return (
    <ProgressContext.Provider value={{
      completedTopics,
      markTopicComplete,
      quizScores,
      saveQuizScore,
      audioEnabled,
      toggleAudio,
      mascotVisible,
      toggleMascot
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
