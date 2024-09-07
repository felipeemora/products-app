import { ActionFunctionArgs, redirect } from "react-router-dom";
import { addProduct, removeProduct, updateAvailable, updateProduct, } from "../services/ProductService";

// Actions son para modificxar datos existentes - formularios
export async function newProductAction({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  
  let error = '';

  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }

  if (error.length) {
    return error;
  }

  await addProduct(data);

  return redirect('/');
}

export async function editProductAction({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  
  let error = '';

  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }

  if (error.length) {
    return error;
  }


  if ( params.id !== undefined ) {
    await updateProduct(data, +params.id);
  }

  return redirect('/');
}

export async function removeProductAction({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await removeProduct(+params.id);
  }
  return redirect('/');
}

export async function updateAvailableAction({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateAvailable(+data.id)

  return {}
}