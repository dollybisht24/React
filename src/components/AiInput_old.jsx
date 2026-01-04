import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const AiInput = ({ onRecipeGenerated }) => {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock AI Recipe Generation
      // In production, replace this with actual API call to OpenAI GPT-4 or similar
      const recipe = await mockAIRecipeGeneration(ingredients, cuisine, dietaryPreferences);
      onRecipeGenerated(recipe);
    } catch (err) {
      setError(err.message || 'Failed to generate recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const mockAIRecipeGeneration = (ingredients, cuisine, dietary) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cuisineText = cuisine ? `${cuisine} ` : '';
        const dietaryText = dietary ? ` (${dietary})` : '';
        
        const recipe = `# 🍳 Delicious ${cuisineText}Recipe${dietaryText}

## Ingredients
${ingredients.split(',').map(ing => `- ${ing.trim()}`).join('\n')}
- Olive oil
- Salt and pepper to taste
- Fresh herbs (optional)

## Instructions

### Step 1: Preparation
Wash and prepare all your ingredients. Dice vegetables into uniform pieces for even cooking.

### Step 2: Cooking
1. Heat a large pan over medium heat
2. Add olive oil and let it heat up
3. Add your main ingredients and sauté for 5-7 minutes

### Step 3: Seasoning
- Season generously with salt and pepper
- Add fresh herbs for extra flavor
- Taste and adjust seasoning as needed

### Step 4: Final Touch
Let the dish rest for 2-3 minutes before serving. This allows the flavors to meld together beautifully.

## Serving Suggestions
Serve hot with a side of fresh salad or crusty bread. Pairs wonderfully with a glass of wine!

## Cooking Time
- **Prep Time:** 10 minutes
- **Cook Time:** 15 minutes
- **Total Time:** 25 minutes

## Servings
Serves 4 people

---

**Chef's Tip:** Always taste your food as you cook and adjust seasonings accordingly. Cooking is an art, not an exact science!

Enjoy your delicious meal! 👨‍🍳✨`;

        resolve(recipe);
      }, 2000); // Simulate API delay
    });
  };

  // Real API implementation example (commented out)
  /*
  const generateRecipeWithAPI = async (ingredients, cuisine, dietary) => {
    const apiKey = 'YOUR_OPENAI_API_KEY';
    const prompt = `Create a detailed recipe using these ingredients: ${ingredients}. 
                    ${cuisine ? `Cuisine style: ${cuisine}.` : ''} 
                    ${dietary ? `Dietary preferences: ${dietary}.` : ''}
                    Format the recipe with clear sections: ingredients, instructions, cooking time, and serving suggestions.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  };
  */

  if (isLoading) {
    return <LoadingSpinner message="Creating your perfect recipe..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      <div>
        <label className="block text-orange-700 font-bold mb-2 text-lg">
          🥗 What ingredients do you have?
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="E.g., chicken, tomatoes, garlic, pasta..."
          className="glass-input min-h-[100px] resize-none"
          rows={4}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-orange-700 font-bold mb-2">
            🌍 Cuisine Type (Optional)
          </label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="glass-input"
          >
            <option value="">Any Cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
            <option value="Indian">Indian</option>
            <option value="Japanese">Japanese</option>
            <option value="Thai">Thai</option>
            <option value="French">French</option>
            <option value="Mediterranean">Mediterranean</option>
          </select>
        </div>

        <div>
          <label className="block text-orange-700 font-bold mb-2">
            🥑 Dietary Preferences (Optional)
          </label>
          <select
            value={dietaryPreferences}
            onChange={(e) => setDietaryPreferences(e.target.value)}
            className="glass-input"
          >
            <option value="">No Restrictions</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Keto">Keto</option>
            <option value="Paleo">Paleo</option>
            <option value="Low-Carb">Low-Carb</option>
          </select>
        </div>
      </div>

      <motion.button
        onClick={generateRecipe}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full glow-button text-xl py-5"
      >
        ✨ Generate Recipe with AI
      </motion.button>
    </motion.div>
  );
};

export default AiInput;
