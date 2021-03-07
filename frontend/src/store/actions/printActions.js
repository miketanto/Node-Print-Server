import axios from 'axios';

export const printJob = (order_id,printType,fooditem_id,payment_data) => {
  return (dispatch) => {
    console.log(order_id);
    console.log(printType)
    return axios.post(`http://localhost:5000/print/${printType}`,{order_id:order_id, fooditem_id:fooditem_id, payment_data:payment_data})
  }
}
