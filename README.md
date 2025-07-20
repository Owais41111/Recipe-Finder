# Recipe Finder 🍲

Welcome to the **Recipe Finder** web app! This project helps you discover recipes from various categories, save your favorites, and customize your experience with different color themes and dark mode! 🎨

## Features 🌟

- **Search Recipes**: Find recipes by name using the search bar.
- **Category Filters**: Browse through categories like Beef, Chicken, Vegan, and more by clicking on category icons.
- **Favorites**: Save your favorite recipes and view them later.
- **Theme Customization**: Choose from multiple color themes or toggle dark mode for a personalized experience.
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop views.
  
## Demo 🎥

[Click here to view the live demo](https://owais41111.github.io/Recipe-Finder/)

---

## Table of Contents 📚

- [Installation 🛠️](#installation)
- [Usage 📜](#usage)
- [Features 🌟](#features)
- [Contributing 🤝](#contributing)
- [License 📄](#license)

---

## Installation 🛠️

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Owais41111/Recipe-Finder
   ```

2. **Open the `index.html` file** in your browser to get started! No server setup is required, as this is a front-end only app.

---

## Usage 📜

- **Search for Recipes**: Simply type your query in the search bar and hit "Search" to find recipes.
- **Filter by Category**: Click on one of the category icons to filter recipes (e.g., Beef, Chicken, Pasta, etc.).
- **Save to Favorites**: Click the star button on a recipe to save it to your favorites (up to a maximum of 5). You can add personal notes for each favorite!
- **View Favorites**: Open the "Show Favorites" button to view all the recipes you've saved.
- **Customize the Theme**: Use the "Select Color Theme" dropdown to switch between different themes, or toggle dark mode using the "Toggle Dark Mode" button.

---

## Technologies Used ⚙️

- **HTML**: Structure of the web page.
- **CSS**: Styling and layout, including custom themes and animations.
- **JavaScript**: Dynamic functionality like recipe fetching, favorites, and theme switching.

---

## Code Breakdown 🖥️

### HTML (`index.html`)

The core structure of the Recipe Finder app, containing:
- **App Title**: Displays "🍲 Recipe Finder".
- **Top Controls**: Theme toggle, color theme selection, and favorites button.
- **Category Icons**: Icons for various recipe categories (e.g., Beef, Chicken, etc.).
- **Search Bar**: Allows users to search for recipes by name.
- **Recipe Results**: Displays fetched recipes from TheMealDB API.
  
### CSS (`style.css`)

- **Global Base Styles**: Defines base colors, button styles, transitions, and layout.
- **Theme Variants**: Supports multiple themes, including default, blue, green, purple, and teal.
- **Category Icons**: Hover effects to enhance user interactivity.
- **Recipe Cards**: Beautifully styled recipe cards with ingredient lists and instructions.
  
### JavaScript (`script.js`)

- **Toggle Theme**: Switches between light and dark modes and handles theme selection.
- **Search and Filter**: Fetches recipes from TheMealDB API and filters based on user input or category.
- **Favorites**: Allows users to add, view, and delete favorites using localStorage.


---

## Contributing 🤝

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new pull request.

We welcome contributions from the community! 🙌

---

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements 🙏

- **TheMealDB API**: The source of our recipe data.
- **FontAwesome**: For providing beautiful icons.
