import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import AiInput from './components/AiInput';
import RecipeCard from './components/RecipeCard';
import { ChefHat, Sparkles, Zap, Target } from 'lucide-react';
import './index.css';

const AppContent = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const { isAuthenticated, isLoading } = useAuth();

  const handleRecipeGenerated = (recipe) => {
    setGeneratedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setGeneratedRecipe(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="premium-spinner"></div>
      </div>
    );
  }

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Intelligence',
      description: 'Advanced culinary AI creates personalized gourmet recipes tailored to your ingredients',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get restaurant-quality recipes in seconds with detailed instructions and timing',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      icon: Target,
      title: 'Fully Customizable',
      description: 'Support for dietary preferences, cuisine types, and ingredient substitutions',
      gradient: 'from-blue-600 to-blue-800'
    }
  ];

  return (
    <div className="min-h-screen pb-16">
      <Header onAuthClick={() => setShowAuthForm(true)} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          {/* Hero Section */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center mb-12 max-w-4xl"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 5, 0],
                y: [0, -10, 0, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
              className="relative inline-block mb-6"
            >
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative text-8xl md:text-9xl">
                <ChefHat className="w-24 h-24 md:w-32 md:h-32 mx-auto text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                Culinary AI Studio
              </span>
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Transform ordinary ingredients into extraordinary meals with the power of AI.
              <span className="block mt-2 text-lg text-slate-600 dark:text-slate-400">
                Your personal chef assistant, available 24/7.
              </span>
            </motion.p>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-card p-8 md:p-12 w-full max-w-5xl mb-12"
          >
            {!isAuthenticated ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-7xl mb-8">🔐</div>
                <h3 className="text-4xl font-display font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-4">
                  Begin Your Culinary Journey
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-10 text-lg max-w-md mx-auto">
                  Create an account to unlock unlimited gourmet recipes powered by advanced AI
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAuthForm(true)}
                  className="liquid-button text-xl"
                >
                  Get Started Free
                </motion.button>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center">
                <AiInput onRecipeGenerated={handleRecipeGenerated} />
              </div>
            )}
          </motion.div>

          {/* Recipe Display */}
          <AnimatePresence>
            {generatedRecipe && (
              <RecipeCard recipe={generatedRecipe} onClose={handleCloseRecipe} />
            )}
          </AnimatePresence>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mt-16 w-full max-w-6xl"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass-card p-8 text-center group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </motion.div>
                  <h3 className="text-xl font-display font-bold text-slate-800 dark:text-slate-200 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-8 mt-20 border-t border-slate-200 dark:border-slate-700"
      >
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          Crafted with <span className="text-red-500">❤️</span> and AI • © 2026 AI Recipe Studio
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
          Premium Culinary Experience Powered by Advanced AI
        </p>
      </motion.footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthForm && (
          <AuthForm onClose={() => setShowAuthForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

