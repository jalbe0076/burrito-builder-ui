import { useEffect, useState } from "react";
import "./App.css";
import { getOrders, postOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const data = await getOrders()
        console.log(data)
        setOrders(data.orders)
      } catch (err) {
        console.error("Error fetching:", err)
      }
    })()

  }, []);

  const addOrder = (newBurrito) => {
    postOrder(newBurrito);
    setOrders(prev => [...prev, newBurrito])
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm orders={orders} addOrder={addOrder} />
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
