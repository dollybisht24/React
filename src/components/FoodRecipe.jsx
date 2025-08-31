import React, { useState } from "react";

function FoodRecipe() {
  const [food, setFood] = useState(""); 
  const [recipe, setRecipe] = useState(null);

  
  const foodDatabase = {
    chicken: {
      image: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      fullRecipe:
        "Chicken Rice Bowl: 1 cup chicken, 1 cup cooked rice, spices, soy sauce. Cook chicken until golden, add rice and sauce, mix well.",
    },
    pizza: {
      image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      fullRecipe:
        "Pizza: Prepare dough, add tomato sauce, cheese, and toppings. Bake at 200°C for 15-20 minutes.",
    },
    broccoli: {
      image: "https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg",
      fullRecipe:
        "Broccoli Stir Fry: Chop broccoli, sauté with garlic, olive oil, and soy sauce. Cook until tender.",
    },
  };


  const showRecipe = () => {
    const key = food.toLowerCase();
    if (!food || !foodDatabase[key]) {
      alert("Recipe not found! Try chicken, pizza, or broccoli.");
      setRecipe(null);
      return;
    }
    setRecipe(foodDatabase[key]);
  };

  return (
    <div style={{ maxWidth: "450px", margin: "50px auto", textAlign: "center",  color:"red"}}>
      <h2>Food Recipe Generator</h2>

      
      <input
        type="text"
        placeholder="Enter food name (e.g., chicken)"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        style={{
          width: "90%",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />

     
      {food && (
        <div
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "10px",
            background: "#f9f9f9",
          }}
        >
          {food}
        </div>
      )}

      {/* Button to show recipe */}
      <button
        onClick={showRecipe}
        style={{
          
          padding: "10px 20px",
          borderRadius: "20px",
          backgroundColor: "#f13c0f",
          color: "white",
          border: "none",
          cursor: "pointer",
          width:"100px"
        }}
      >
        Recipe
      </button>

      
      {recipe && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#f0f0f0",
          }}
        >
          <img
            src={recipe.image}
            alt={food}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
          />
          <h3>{food}</h3>
          <p>{recipe.fullRecipe}</p>
        </div>
      )}
    </div>
  );
}

export default FoodRecipe;
