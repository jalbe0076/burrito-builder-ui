export const getOrders = async () => {
  const response = await fetch("http://localhost:3001/api/v1/orders")
  const data = await handleError(response);
  return data;
};

export const postOrder = async (newBurrito) => {
  const response = await fetch("http://localhost:3001/api/v1/orders", {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newBurrito)
  })
  const data = await handleError(response);
  return data;
};

export const deleteOrder = async (id) => {
  return await fetch(`http://localhost:3001/api/v1/orders/${id}`, {
    method: 'DELETE'
  })
};

const handleError = (response) => {
  if(response.ok) {
    return response.json()
  } else {
    throw new Error(`HTTP ERROR: ${response.status}`)
  }
}
