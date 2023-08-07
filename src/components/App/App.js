import { useEffect, useState } from "react";
import "./App.css";
import { getOrders, postOrder, deleteOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const data = await getOrders()
        setOrders(data.orders)
      } catch (err) {
        console.error("Error fetching:", err)
      }
    })()

  }, []);

  const addOrder = async (newBurrito) => {
    const order = await postOrder(newBurrito);
    setOrders(prev => [...prev, order])
  }

  const handleDeleteOrder = (id) => {
    deleteOrder(id);
    const filteredOrders = orders.filter(order => order.id !== parseInt(id))
    setOrders(filteredOrders)
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder} />
      </header>

      <Orders orders={orders} deleteOrder={handleDeleteOrder} />
    </main>
  );
}

export default App;
