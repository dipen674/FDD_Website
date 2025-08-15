// Vegan Recipes Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Recipe data
    const recipes = {
        1: {
            title: "Rainbow Buddha Bowl",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            time: "30 min",
            difficulty: "Easy",
            calories: "420 cal",
            ingredients: [
                "1 cup cooked quinoa",
                "1 cup chickpeas, rinsed and drained",
                "1 avocado, sliced",
                "1 cup cherry tomatoes, halved",
                "1 cup shredded carrots",
                "1 cup shredded purple cabbage",
                "1 cup cucumber, sliced",
                "2 cups fresh spinach",
                "2 tbsp sesame seeds",
                "¼ cup tahini",
                "2 tbsp lemon juice",
                "1 tbsp maple syrup",
                "1 clove garlic, minced",
                "Water to thin as needed"
            ],
            instructions: [
                "Prepare all vegetables as directed and arrange in sections in a large bowl.",
                "In a small bowl, whisk together tahini, lemon juice, maple syrup, and garlic.",
                "Add water 1 tablespoon at a time until dressing reaches desired consistency.",
                "Drizzle dressing over the bowl and sprinkle with sesame seeds.",
                "Serve immediately and enjoy!"
            ]
        },
        2: {
            title: "Quinoa Power Salad",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            time: "25 min",
            difficulty: "Easy",
            calories: "380 cal",
            ingredients: [
                "1 cup quinoa, rinsed",
                "2 cups vegetable broth",
                "1 cup cherry tomatoes, halved",
                "1 cucumber, diced",
                "1 red bell pepper, diced",
                "½ red onion, finely chopped",
                "½ cup chopped parsley",
                "¼ cup chopped mint",
                "⅓ cup lemon juice",
                "3 tbsp olive oil",
                "1 tsp Dijon mustard",
                "Salt and pepper to taste"
            ],
            instructions: [
                "In a medium saucepan, combine quinoa and vegetable broth. Bring to a boil, then reduce heat to low, cover, and simmer for 15 minutes.",
                "Remove from heat and let stand for 5 minutes. Fluff with a fork and allow to cool.",
                "In a large bowl, combine cooled quinoa, tomatoes, cucumber, bell pepper, red onion, parsley, and mint.",
                "In a small bowl, whisk together lemon juice, olive oil, Dijon mustard, salt, and pepper.",
                "Pour dressing over salad and toss to combine. Serve chilled or at room temperature."
            ]
        },
        3: {
            title: "Creamy Mushroom Pasta",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            time: "35 min",
            difficulty: "Medium",
            calories: "520 cal",
            ingredients: [
                "12 oz pasta (fettuccine or penne)",
                "2 tbsp olive oil",
                "1 onion, diced",
                "3 cloves garlic, minced",
                "16 oz mixed mushrooms, sliced",
                "1 cup raw cashews, soaked",
                "1 cup vegetable broth",
                "2 tbsp nutritional yeast",
                "1 tbsp lemon juice",
                "Salt and pepper to taste",
                "Fresh parsley for garnish"
            ],
            instructions: [
                "Cook pasta according to package directions. Drain and set aside.",
                "Heat olive oil in a large skillet over medium heat. Add onions and sauté for 3-4 minutes until translucent.",
                "Add garlic and mushrooms, cooking for 8-10 minutes until mushrooms are tender and browned.",
                "While mushrooms cook, drain cashews and blend with vegetable broth, nutritional yeast, lemon juice, salt, and pepper until completely smooth.",
                "Pour cashew cream sauce into the skillet with mushrooms and stir to combine. Simmer for 2-3 minutes until slightly thickened.",
                "Add cooked pasta to the skillet and toss to coat with sauce. Cook for an additional 1-2 minutes.",
                "Serve hot, garnished with fresh parsley."
            ]
        },
        4: {
            title: "Chocolate Avocado Mousse",
            image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            time: "15 min",
            difficulty: "Easy",
            calories: "280 cal",
            ingredients: [
                "2 ripe avocados",
                "¼ cup cocoa powder",
                "¼ cup maple syrup",
                "2 tbsp almond milk",
                "1 tsp vanilla extract",
                "Pinch of salt",
                "Fresh berries for garnish"
            ],
            instructions: [
                "Cut avocados in half, remove pits, and scoop flesh into a food processor.",
                "Add cocoa powder, maple syrup, almond milk, vanilla extract, and salt.",
                "Process until completely smooth, scraping down sides as needed.",
                "Taste and adjust sweetness if needed.",
                "Divide into serving dishes and refrigerate for at least 30 minutes.",
                "Garnish with fresh berries before serving."
            ]
        },
        5: {
            title: "Energy Bliss Balls",
            image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            time: "20 min",
            difficulty: "Easy",
            calories: "180 cal",
            ingredients: [
                "1 cup pitted dates",
                "1 cup walnuts or almonds",
                "2 tbsp chia seeds",
                "2 tbsp flax seeds",
                "2 tbsp cocoa powder",
                "1 tsp vanilla extract",
                "Pinch of salt",
                "Shredded coconut for rolling"
            ],
            instructions: [
                "Soak dates in warm water for 10 minutes to soften, then drain.",
                "In a food processor, pulse nuts until finely chopped.",
                "Add dates, chia seeds, flax seeds, cocoa powder, vanilla, and salt.",
                "Process until mixture comes together and forms a sticky dough.",
                "Roll into 1-inch balls and coat with shredded coconut.",
                "Refrigerate for at least 1 hour before serving."
            ]
        },
        6: {
            title: "Blueberry Pancakes",
            image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            time: "25 min",
            difficulty: "Easy",
            calories: "320 cal",
            ingredients: [
                "1 cup all-purpose flour",
                "1 tbsp baking powder",
                "1 tbsp sugar",
                "¼ tsp salt",
                "1 cup almond milk",
                "1 tbsp apple cider vinegar",
                "1 tbsp vegetable oil",
                "1 tsp vanilla extract",
                "1 cup fresh blueberries",
                "Maple syrup for serving"
            ],
            instructions: [
                "In a small bowl, combine almond milk and apple cider vinegar. Set aside to curdle.",
                "In a large bowl, whisk together flour, baking powder, sugar, and salt.",
                "Add vegetable oil and vanilla to the almond milk mixture.",
                "Pour wet ingredients into dry ingredients and stir until just combined (do not overmix).",
                "Gently fold in blueberries.",
                "Heat a non-stick skillet over medium heat and lightly grease with oil.",
                "Pour ¼ cup batter for each pancake and cook until bubbles form on the surface.",
                "Flip and cook for another 1-2 minutes until golden brown.",
                "Serve warm with maple syrup."
            ]
        }
    };

    // DOM elements
    const modal = document.getElementById('recipeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMeta = document.getElementById('modalMeta');
    const modalImage = document.getElementById('modalImage');
    const ingredientList = document.getElementById('ingredientList');
    const instructionList = document.getElementById('instructionList');
    const modalClose = document.getElementById('modalClose');
    const viewBtns = document.querySelectorAll('.view-btn');
    const saveBtns = document.querySelectorAll('.save-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');

    // Show modal function
    function showRecipe(recipeId) {
        const recipe = recipes[recipeId];
        if (!recipe) return;
        
        modalTitle.textContent = recipe.title;
        modalMeta.textContent = `${recipe.time} | ${recipe.difficulty} | ${recipe.calories}`;
        modalImage.src = recipe.image;
        
        // Populate ingredients
        ingredientList.innerHTML = '';
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientList.appendChild(li);
        });
        
        // Populate instructions
        instructionList.innerHTML = '';
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionList.appendChild(li);
        });
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners for view buttons
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const recipeId = btn.getAttribute('data-recipe');
            showRecipe(recipeId);
        });
    });

    // Close modal when clicking close button
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside of modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Bookmark functionality
    saveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('saved');
            this.innerHTML = this.classList.contains('saved') ? 
                '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';
                
            // Add animation effect
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // Recipe filtering functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter recipes
            recipeCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});