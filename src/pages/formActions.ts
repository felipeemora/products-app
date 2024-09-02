import { ActionFunctionArgs } from "react-router-dom";
import { addProduct } from "../services/ProductService";

export async function newProductAction({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  
  let error = '';

  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }

  if (error.length) {
    return error;
  }

  addProduct(data);

  return {};
}
