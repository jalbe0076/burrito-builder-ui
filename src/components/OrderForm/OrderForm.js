import { useState } from "react";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const newBurrito = {
      name: name,
      ingredients: ingredients
    }
    if(name && ingredients.length) {
      addOrder(newBurrito)
      clearInputs();
    }
  }

  const addIngredient = (e) => {
    e.preventDefault();
    if(!ingredients.includes(e.target.name)) {
      setIngredients(prev => [...prev, e.target.name])
    }
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => addIngredient(e)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p className="order-selections">Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
