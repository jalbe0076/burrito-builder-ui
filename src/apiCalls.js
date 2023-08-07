export const getOrders = async () => {
  const response = await fetch("http://localhost:3001/api/v1/orders")
  const data = await handleError(response);
  return data;
};

const handleError = (response) => {
  if(response.ok) {
    return response.json()
  } else {
    throw new Error(`HTTP ERROR: ${response.status}`)
  }
}
