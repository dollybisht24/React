import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, ChefHat, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ onAuthClick }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="glass-nav w-full px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg"
          >
            <ChefHat className="w-7 h-7 text-white" strokeWidth={2.5} />
          </motion.div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              AI Recipe Studio
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium hidden sm:block tracking-wide">
              Professional Culinary AI Assistant
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 20 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-amber-600" />
            )}
          </motion.button>

          {isAuthenticated ? (
            <>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Welcome back,
                </p>
                <p className="font-bold text-amber-600 dark:text-amber-400">
                  {user.name}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="glass-button flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAuthClick}
              className="liquid-button"
            >
              Get Started
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
