import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, Clock, ChefHat, Flame, Copy, Printer, Check, Image as ImageIcon, Download } from 'lucide-react';

const RecipeCard = ({ recipe, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  // Handle both old format (string) and new format (object with content and imageUrl)
  const recipeContent = typeof recipe === 'string' ? recipe : recipe.content;
  const recipeImage = typeof recipe === 'object' ? recipe.imageUrl : null;

  // Debug log
  React.useEffect(() => {
    console.log('Recipe data:', { recipe, recipeContent, recipeImage });
  }, [recipe]);

  const handleCopy = () => {
    navigator.clipboard.writeText(recipeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = () => {
    if (recipeImage) {
      const link = document.createElement('a');
      link.href = recipeImage;
      link.download = 'recipe-image.jpg';
      link.click();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="glass-card p-6 md:p-10 w-full max-w-4xl mt-8 relative"
    >
      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors z-10"
      >
        <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
      </motion.button>

      {/* AI Generated Food Image */}
      {recipeImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Image Container */}
          <div className="relative aspect-video w-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <ImageIcon className="w-12 h-12 text-blue-400 animate-pulse" />
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Loading image...</p>
                </div>
              </div>
            )}
            <img
              src={recipeImage}
              alt="AI Generated Recipe"
              className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                // Fallback to a default food image if loading fails
                e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop';
                setImageLoaded(true);
              }}
            />
            
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-full shadow-lg"
            >
              <ImageIcon className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">AI Generated</span>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Recipe Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        <div className="stat-badge">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>25 mins</span>
        </div>
        <div className="stat-badge">
          <ChefHat className="w-4 h-4 text-blue-600" />
          <span>Easy</span>
        </div>
        <div className="stat-badge">
          <Flame className="w-4 h-4 text-blue-600" />
          <span>~350 cal</span>
        </div>
      </motion.div>

      {/* Recipe Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="prose prose-lg max-w-none"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 
                className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-4" 
                {...props} 
              />
            ),
            h2: ({ node, ...props }) => (
              <h2 
                className="text-3xl font-display font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4 border-b-2 border-blue-200 dark:border-blue-800 pb-2" 
                {...props} 
              />
            ),
            h3: ({ node, ...props }) => (
              <h3 
                className="text-2xl font-display font-semibold text-blue-700 dark:text-blue-400 mt-6 mb-3" 
                {...props} 
              />
            ),
            p: ({ node, ...props }) => (
              <p 
                className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed text-base" 
                {...props} 
              />
            ),
            ul: ({ node, ...props }) => (
              <ul 
                className="list-none space-y-2 mb-6" 
                {...props} 
              />
            ),
            ol: ({ node, ...props }) => (
              <ol 
                className="list-decimal list-inside text-slate-700 dark:text-slate-300 mb-6 space-y-3 pl-2" 
                {...props} 
              />
            ),
            li: ({ node, children, ...props }) => (
              <li className="flex items-start gap-3" {...props}>
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{children}</span>
              </li>
            ),
            strong: ({ node, ...props }) => (
              <strong 
                className="font-bold text-blue-700 dark:text-blue-400" 
                {...props} 
              />
            ),
            em: ({ node, ...props }) => (
              <em 
                className="italic text-blue-600 dark:text-blue-500" 
                {...props} 
              />
            ),
            code: ({ node, inline, ...props }) => 
              inline ? (
                <code 
                  className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded font-mono text-sm" 
                  {...props} 
                />
              ) : (
                <code 
                  className="block bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 rounded-xl overflow-x-auto font-mono text-sm" 
                  {...props} 
                />
              ),
            blockquote: ({ node, ...props }) => (
              <blockquote 
                className="border-l-4 border-blue-500 pl-6 italic text-slate-600 dark:text-slate-400 my-6 bg-blue-50/50 dark:bg-blue-900/10 py-4 rounded-r-lg" 
                {...props} 
              />
            ),
            hr: ({ node, ...props }) => (
              <hr 
                className="my-8 border-blue-200 dark:border-blue-800" 
                {...props} 
              />
            ),
          }}
        >
          {recipeContent}
        </ReactMarkdown>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex flex-wrap justify-center gap-4 pt-8 border-t border-blue-200 dark:border-blue-800"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="glass-button flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Recipe
            </>
          )}
        </motion.button>
        
        {recipeImage && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadImage}
            className="glass-button flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Save Image
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.print()}
          className="glass-button flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default RecipeCard;
