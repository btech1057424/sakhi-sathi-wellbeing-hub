import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeScreen from '@/components/WelcomeScreen';
import Layout from '@/components/Layout';
import Home from './Home';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    navigate('/home');
  };

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default Index;
