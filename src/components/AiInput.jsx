import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, UtensilsCrossed, Leaf, AlertCircle } from 'lucide-react';
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
      const recipe = await mockAIRecipeGeneration(ingredients, cuisine, dietaryPreferences);
      
      // Generate recipe image
      const imageUrl = await generateFoodImage(ingredients, cuisine);
      console.log('Generated image URL:', imageUrl); // Debug log
      
      onRecipeGenerated({
        content: recipe,
        imageUrl: imageUrl
      });
    } catch (err) {
      setError(err.message || 'Failed to generate recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateFoodImage = async (ingredients, cuisine) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Analyze ingredients to determine the best matching image
        const ingredientsList = ingredients.toLowerCase();
        const cuisineType = cuisine?.toLowerCase() || '';
        
        // Smart ingredient-to-image mapping
        let imageUrl = '';
        
        // Chicken dishes
        if (ingredientsList.includes('chicken')) {
          if (cuisineType.includes('indian') || ingredientsList.includes('curry')) {
            imageUrl = 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&h=600&fit=crop'; // butter chicken
          } else if (ingredientsList.includes('pasta') || cuisineType.includes('italian')) {
            imageUrl = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop'; // chicken pasta
          } else if (ingredientsList.includes('rice')) {
            imageUrl = 'https://images.unsplash.com/photo-1633945274309-e4d0b4e08d8a?w=800&h=600&fit=crop'; // chicken rice
          } else {
            imageUrl = 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=600&fit=crop'; // grilled chicken
          }
        }
        // Pasta dishes
        else if (ingredientsList.includes('pasta') || ingredientsList.includes('spaghetti')) {
          if (ingredientsList.includes('tomato') || ingredientsList.includes('marinara')) {
            imageUrl = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop'; // tomato pasta
          } else if (ingredientsList.includes('cream') || ingredientsList.includes('alfredo')) {
            imageUrl = 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=600&fit=crop'; // creamy pasta
          } else {
            imageUrl = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop'; // classic pasta
          }
        }
        // Pizza
        else if (ingredientsList.includes('pizza') || ingredientsList.includes('dough') || ingredientsList.includes('mozzarella')) {
          imageUrl = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop';
        }
        // Burger
        else if (ingredientsList.includes('burger') || ingredientsList.includes('beef') || ingredientsList.includes('patty')) {
          imageUrl = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop';
        }
        // Salad
        else if (ingredientsList.includes('salad') || ingredientsList.includes('lettuce') || (ingredientsList.includes('tomato') && ingredientsList.includes('cucumber'))) {
          imageUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop';
        }
        // Curry dishes
        else if (ingredientsList.includes('curry') || cuisineType.includes('indian')) {
          imageUrl = 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&h=600&fit=crop';
        }
        // Sushi/Japanese
        else if (ingredientsList.includes('sushi') || ingredientsList.includes('salmon') || cuisineType.includes('japanese')) {
          imageUrl = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop';
        }
        // Tacos/Mexican
        else if (ingredientsList.includes('taco') || ingredientsList.includes('tortilla') || cuisineType.includes('mexican')) {
          imageUrl = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop';
        }
        // Soup/Stew
        else if (ingredientsList.includes('soup') || ingredientsList.includes('stew') || ingredientsList.includes('broth')) {
          imageUrl = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop';
        }
        // Fish/Seafood
        else if (ingredientsList.includes('fish') || ingredientsList.includes('seafood') || ingredientsList.includes('shrimp') || ingredientsList.includes('prawn')) {
          imageUrl = 'https://images.unsplash.com/photo-1559737558-2f5a35f4523f?w=800&h=600&fit=crop';
        }
        // Rice dishes
        else if (ingredientsList.includes('rice') || ingredientsList.includes('biryani')) {
          imageUrl = 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800&h=600&fit=crop';
        }
        // Vegetables
        else if (ingredientsList.includes('vegetable') || ingredientsList.includes('vegan') || ingredientsList.includes('broccoli')) {
          imageUrl = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop';
        }
        // Dessert
        else if (ingredientsList.includes('dessert') || ingredientsList.includes('cake') || ingredientsList.includes('chocolate') || ingredientsList.includes('ice cream')) {
          imageUrl = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop';
        }
        // Breakfast
        else if (ingredientsList.includes('egg') || ingredientsList.includes('bacon') || ingredientsList.includes('pancake')) {
          imageUrl = 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop';
        }
        // Steak/Meat
        else if (ingredientsList.includes('steak') || ingredientsList.includes('meat')) {
          imageUrl = 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop';
        }
        // Noodles
        else if (ingredientsList.includes('noodle') || ingredientsList.includes('ramen')) {
          imageUrl = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop';
        }
        // Sandwich
        else if (ingredientsList.includes('sandwich') || ingredientsList.includes('bread')) {
          imageUrl = 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop';
        }
        // Cuisine-specific defaults
        else if (cuisineType.includes('italian')) {
          imageUrl = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop';
        }
        else if (cuisineType.includes('chinese')) {
          imageUrl = 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&h=600&fit=crop';
        }
        else if (cuisineType.includes('thai')) {
          imageUrl = 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop';
        }
        else if (cuisineType.includes('french')) {
          imageUrl = 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800&h=600&fit=crop';
        }
        // Default gourmet image
        else {
          imageUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop';
        }
        
        console.log('Matched ingredients:', ingredientsList, 'to image:', imageUrl);
        resolve(imageUrl);
      }, 800);
    });
  };

  const mockAIRecipeGeneration = (ingredients, cuisine, dietary) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cuisineText = cuisine ? `${cuisine} ` : '';
        const dietaryText = dietary ? ` (${dietary})` : '';
        
        const recipe = `# ${cuisineText}Gourmet Delight${dietaryText}

## Ingredients

${ingredients.split(',').map(ing => `- **${ing.trim()}**`).join('\n')}
- 2 tablespoons extra virgin olive oil
- Sea salt and freshly ground black pepper
- Fresh herbs (basil, parsley, or thyme)
- 2 cloves garlic, minced
- 1 lemon, zested and juiced

---

## Instructions

### Step 1: Preparation (5 minutes)

Begin by washing all your fresh ingredients under cold water. Pat them dry with a clean kitchen towel. Dice vegetables into uniform **1-inch pieces** for even cooking. This ensures everything cooks at the same rate and creates a visually appealing dish.

> **Chef's Tip:** Keep your ingredients at room temperature for 10 minutes before cooking for better flavor development.

### Step 2: Aromatic Base (3-4 minutes)

1. Heat a **large skillet** or sauté pan over medium heat
2. Add olive oil and let it shimmer (about 30 seconds)
3. Add minced garlic and sauté until fragrant (30-45 seconds)
4. Be careful not to burn the garlic—it should be golden, not brown

### Step 3: Main Cooking (12-15 minutes)

1. Add your primary ingredients to the pan
2. Season generously with **sea salt** and **freshly ground pepper**
3. Sauté, stirring occasionally, for 5-7 minutes
4. The ingredients should develop a light golden color
5. Add fresh herbs in the last 2 minutes of cooking

### Step 4: Finishing Touch (2 minutes)

- Drizzle with fresh lemon juice
- Toss everything together gently
- Taste and adjust seasoning as needed
- Let rest for 2-3 minutes before serving

---

## Serving Suggestions

🍽️ Serve hot over a bed of:
- Fluffy basmati rice
- Al dente pasta
- Crusty artisan bread
- Fresh garden salad

Pairs beautifully with a crisp white wine or sparkling water with lemon.

---

## Nutritional Information

| Nutrient | Amount |
|----------|--------|
| Calories | ~350 kcal |
| Protein | 12g |
| Carbs | 28g |
| Fat | 18g |

---

## Cooking Time

⏱️ **Prep Time:** 10 minutes  
👨‍🍳 **Cook Time:** 15 minutes  
⏰ **Total Time:** 25 minutes  
🍽️ **Servings:** 4 people

---

## Chef's Expert Tips

1. **Temperature Control:** Medium heat is your friend. Too high and you'll burn; too low and you'll steam.
2. **Freshness Matters:** Use the freshest ingredients you can find for maximum flavor.
3. **Taste as You Go:** Cooking is an art—trust your palate and adjust seasonings throughout.
4. **Presentation:** Garnish with fresh herbs and a drizzle of quality olive oil before serving.

---

*Bon Appétit! Enjoy your culinary masterpiece! 👨‍🍳✨*`;

        resolve(recipe);
      }, 2500);
    });
  };

  if (isLoading) {
    return <LoadingSpinner message="Crafting your perfect recipe..." showSkeleton={false} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Ingredients Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="floating-input-group"
      >
        <UtensilsCrossed className="absolute left-4 top-6 w-5 h-5 text-blue-500 z-10" />
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder=" "
          className="floating-input pl-12 min-h-[120px] resize-none"
          rows={4}
        />
        <label className="floating-label left-12">
          What ingredients do you have?
        </label>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 pl-12">
          Separate ingredients with commas (e.g., chicken, tomatoes, garlic, pasta)
        </p>
      </motion.div>

      {/* Cuisine and Dietary Preferences */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Cuisine Type
          </label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="floating-input cursor-pointer"
          >
            <option value="">Any Cuisine</option>
            <option value="Italian">🇮🇹 Italian</option>
            <option value="Mexican">🇲🇽 Mexican</option>
            <option value="Chinese">🇨🇳 Chinese</option>
            <option value="Indian">🇮🇳 Indian</option>
            <option value="Japanese">🇯🇵 Japanese</option>
            <option value="Thai">🇹🇭 Thai</option>
            <option value="French">🇫🇷 French</option>
            <option value="Mediterranean">🌊 Mediterranean</option>
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-blue-500" />
            Dietary Preferences
          </label>
          <select
            value={dietaryPreferences}
            onChange={(e) => setDietaryPreferences(e.target.value)}
            className="floating-input cursor-pointer"
          >
            <option value="">No Restrictions</option>
            <option value="Vegetarian">🥗 Vegetarian</option>
            <option value="Vegan">🌱 Vegan</option>
            <option value="Gluten-Free">🌾 Gluten-Free</option>
            <option value="Keto">🥑 Keto</option>
            <option value="Paleo">🦴 Paleo</option>
            <option value="Low-Carb">📉 Low-Carb</option>
          </select>
        </motion.div>
      </div>

      {/* Generate Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={generateRecipe}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full liquid-button flex items-center justify-center gap-3 text-xl py-5"
      >
        <Sparkles className="w-6 h-6" />
        Generate Recipe with AI
        <Sparkles className="w-6 h-6" />
      </motion.button>
    </motion.div>
  );
};

export default AiInput;
