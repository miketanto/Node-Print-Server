import axios from 'axios';

export const printJob = (order_id,printType,fooditem_id,payment_data) => {
  return (dispatch) => {
    console.log(order_id);
    console.log(printType)
    return axios.post(`http://localhost:8080/print/${printType}`,{order_id:order_id, fooditem_id:fooditem_id, payment_data:payment_data})
  }
}

export const saveTaxFile = () => {
  return (dispatch) => {
    console.log();
    return axios.post(`http://localhost:8080/print/saveTaxFile`)
  }
}

