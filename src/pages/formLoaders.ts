import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { getProductById, getProducts } from "../services/ProductService";

// Loaders son para obtener datos
export async function productsLoader() {
  return await getProducts();
}

export async function editDataLoader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      return redirect('/');
    }

    return product;
  }
}