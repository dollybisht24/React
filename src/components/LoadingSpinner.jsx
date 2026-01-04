import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, ChefHat } from 'lucide-react';

const LoadingSpinner = ({ message = 'Generating your gourmet recipe...', showSkeleton = false }) => {
  if (showSkeleton) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-3xl space-y-6"
      >
        {/* Skeleton Header */}
        <div className="space-y-3">
          <div className="skeleton h-10 w-3/4" />
          <div className="skeleton h-6 w-1/2" />
        </div>

        {/* Skeleton Stats */}
        <div className="flex gap-4">
          <div className="skeleton h-12 w-32 rounded-full" />
          <div className="skeleton h-12 w-32 rounded-full" />
          <div className="skeleton h-12 w-32 rounded-full" />
        </div>

        {/* Skeleton Content */}
        <div className="space-y-4">
          <div className="skeleton h-8 w-1/3" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-5/6" />
          <div className="skeleton h-4 w-4/5" />
          
          <div className="skeleton h-8 w-1/3 mt-6" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-3/4" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16"
    >
      {/* Animated Chef Icon */}
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 10, 0],
          y: [0, -10, 0, -5, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-50 animate-pulse" />
        <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-full shadow-lg">
          <ChefHat className="w-16 h-16 text-white" />
        </div>
      </motion.div>

      {/* Premium Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="mb-6"
      >
        <Loader2 className="w-12 h-12 text-blue-500" />
      </motion.div>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-700 dark:text-slate-300 font-semibold text-lg mb-2 text-center"
      >
        {message}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-slate-600 dark:text-slate-400 text-sm text-center max-w-md"
      >
        Our AI chef is carefully crafting the perfect recipe and generating a stunning food image just for you
      </motion.p>

      {/* Animated Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-2 mt-6"
      >
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay 
            }}
            className="w-2.5 h-2.5 bg-amber-500 rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;
