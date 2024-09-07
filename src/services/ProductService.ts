import { safeParse , number, parse, string, transform, pipe} from "valibot";
import { DraftProductSchema, ProductSchema, ProductsSchema } from "../schemas";
import axios from "axios";
import { Product } from "../types";
import { toBoolean } from "../utils";

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

export async function getProductById(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data: { product } } = await axios(url);
    const result = safeParse(ProductSchema, product);
    if (result.success) {
      return result.output;
    } else {
      throw new Error('Hubo un error');
    }
  } catch (error) {
    console.log("🚀 ~ getProductById ~ error:", error);
  }
}

export async function updateProduct(data:ProductData, id: Product['id']) {
  try {
    const NumberSchema = pipe(string(), transform(Number), number());

    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      isAvailable: toBoolean(data.isAvailable.toString())
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }
  } catch (error) {
    console.log("🚀 ~ updateProduct ~ error:", error)
  }
}

export async function removeProduct(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log("🚀 ~ removeProduct ~ error:", error)
  }
}

export async function updateAvailable(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log("🚀 ~ removeProduct ~ error:", error)
  }
}