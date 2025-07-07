import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeScreen from '@/components/WelcomeScreen';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    navigate('/join');
  };

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  // This should never be reached as we navigate to /join
  return null;
};

export default Index;
