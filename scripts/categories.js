
function categoryToTitle(categoryId) {
  const map = {
    DogsToys: "Dog Toys",
    DogsTreats: "Treats & Snacks",
    DogsCare: "Grooming & Hygiene",
    DogFood: "Dry & Wet Food",
    DogsWalk: "Walking & Outdoor Gear",
    DogsBeds: "Beds & Blankets",
    DogsGadget: "Dog Gadgets",
    DogsFashion: "Clothing & Accessories",
    DogsTravel: "Travel & Transport Products"
  };
  return map[categoryId] || categoryId;
}
