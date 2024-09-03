import { safeParse } from "valibot";
import { DraftProductSchema, ProductsSchema } from "../schemas";
import axios from "axios";

type ProductData = {
  [k: string]: FormDataEntryValue
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price
    });
    

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price
      });
    } else {
      throw new Error('Datos no válidos');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data: { products } } = await axios(url);
    const result = safeParse(ProductsSchema, products);
    if (result.success) {
      return result.output;
    } else {
      throw new Error('Hubo un error');
    }
  } catch (error) {
    console.log("🚀 ~ getProducts ~ error:", error)
  }
}