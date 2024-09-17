import React, { useState, useEffect } from 'react';

interface Recipe {
  id: string;
  name: string;
  // Add other recipe properties as needed
}

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/recipes');
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
      <button onClick={fetchRecipes}>Refresh Recipes</button>
    </div>
  );
}

export default Recipes;