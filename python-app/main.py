from flask import Flask, jsonify, request, render_template

import os

app = Flask(__name__)

# Sample recipes data
recipes = [
    {"id": 1, "name": "Pasta Carbonara", "ingredients": ["spaghetti", "eggs", "bacon", "parmesan cheese"]},
    {"id": 2, "name": "Chicken Stir Fry", "ingredients": ["chicken", "vegetables", "soy sauce", "rice"]},
    {"id": 3, "name": "Vegetable Soup", "ingredients": ["carrots", "celery", "onions", "vegetable broth"]}
]

@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    return jsonify(recipes)

@app.route('/api/recipe/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    recipe = next((r for r in recipes if r['id'] == recipe_id), None)
    if recipe:
        return jsonify(recipe)
    return jsonify({"error": "Recipe not found"}), 404




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))