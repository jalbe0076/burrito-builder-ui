import React from "react";
import "./Orders.css";

const Orders = ({orders, deleteOrder}) => {

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.parentNode.id)
    deleteOrder(e.target.parentNode.id)
  } 

  const orderEls = orders.map((order) => {
    return (
      <div className="order" key={order.id} id={order.id} >
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, i) => {
            return <li key={i}>{ingredient}</li>;
          })}
        </ul>
        <button id={order.id}  className="delete-btn" onClick={(e) => handleDelete(e)} >🗑️</button>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;
