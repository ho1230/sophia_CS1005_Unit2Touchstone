document.addEventListener("DOMContentLoaded", function () {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  const favoriteCount = document.querySelector("#favorite-count");
  const favoriteList = document.querySelector("#favorite-list");
  
  // Load saved favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem("northStarFavorites")) || [];
  
  // Update the page when the user clicks a favorite button
  favoriteButtons.forEach(function (button) {
    const productName = button.dataset.product;
    // Show previously saved favorites
    if (favorites.includes(productName)) {
      button.textContent = "Remove From Favor";
      button.classList.add("favorited");
    } else {
      button.textContent = "Add to Favor";
      button.classList.remove("favorited");
    }
    
    button.addEventListener("click", function () {
      if (favorites.includes(productName)) {
        // Remove product from favorites
        favorites = favorites.filter(function (item) {
            return item != productName;
        });
        button.textContent = "Add to Favor";
        button.classList.remove("favorited");
      } else {
          // Add product to favorites
          favorites.push(productName);
          button.textContent = "Remove From Favor";
          button.classList.add("favorited");
      }
      // Save favorites
      localStorage.setItem(
        "northStarFavorites",
        JSON.stringify(favorites)
      );
      updateFavorites();
    });
  });
  
  // Display the favorites list
  function updateFavorites() {
    favoriteCount.textContent = favorites.length;
    favoriteList.innerHTML = "";
    if (favorites.length == 0) {
      favoriteList.innerHTML = "<p>No favorite products yet.</p>";
      return;
    }
    favorites.forEach(function (product) {
      const item = document.createElement("li");
      item.textContent = product;
      favoriteList.appendChild(item);
    });
  }
  
  // Display saved favorites when the page loads
  updateFavorites();
});
