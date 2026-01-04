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
      gradient: 'from-amber-400 to-orange-600'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get restaurant-quality recipes in seconds with detailed instructions and timing',
      gradient: 'from-orange-500 to-amber-700'
    },
    {
      icon: Target,
      title: 'Fully Customizable',
      description: 'Support for dietary preferences, cuisine types, and ingredient substitutions',
      gradient: 'from-amber-600 to-orange-800'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header onAuthClick={() => setShowAuthForm(true)} />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          {/* Split-Screen Hero Section */}
          {!generatedRecipe && (
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full mb-16">
              {/* Left: Text & AI Inputs */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Hero Text */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                      <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                        Transform Ingredients
                      </span>
                      <br />
                      <span className="text-slate-800 dark:text-slate-100">
                        Into Culinary Magic
                      </span>
                    </h2>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl"
                  >
                    Professional AI-powered recipes with stunning food imagery. 
                    Enter your ingredients and let our culinary AI create restaurant-quality dishes.
                  </motion.p>

                  {/* Trust Badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-4 items-center"
                  >
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Instant Generation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">AI Food Images</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Professional Quality</span>
                    </div>
                  </motion.div>
                </div>

                {/* AI Input Card */}
                {!isAuthenticated ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="ai-input-card p-8 space-y-6"
                  >
                    <div className="text-center space-y-3">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl">
                        <span className="text-4xl">🔐</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        Start Your Culinary Journey
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Create a free account to unlock unlimited AI-generated recipes
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAuthForm(true)}
                      className="w-full liquid-button flex items-center justify-center gap-3 py-4 text-lg"
                    >
                      <Sparkles className="w-5 h-5" />
                      Get Started Free
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="ai-input-card p-8"
                  >
                    <AiInput onRecipeGenerated={handleRecipeGenerated} />
                  </motion.div>
                )}
              </motion.div>

              {/* Right: Hero Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 1, -1, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="hero-image-container relative"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-600/20 blur-3xl -z-10"></div>
                  
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=1400&fit=crop&q=80"
                    alt="Professional Gourmet Dish"
                    className="w-full h-[600px] object-cover"
                  />
                  
                  {/* Overlay Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-8 right-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100 text-lg">AI-Generated Recipes</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">With professional food photography</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          )}

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

