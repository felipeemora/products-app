import { Link, Form, useActionData, useLoaderData } from "react-router-dom"
import { ErrorMessage } from "../components/ErrorMessage";
import { Product } from "../types";
import { ProductForm } from "./ProductForm";

const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false }
]

export const EditProduct = () => {

  const product = useLoaderData() as Product;
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link to={'/'} className="rounded-md bg-indigo-600 p-3 font-bold text-white shadow-sm hover:bg-indigo-500">
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form
        className="mt-10"
        method="POST"
      >
        <ProductForm product={product} />
        
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="isAvailable"
          >Disponibilidad:</label>
          <select
            id="isAvailable"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="isAvailable"
            defaultValue={product?.isAvailable.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Editar Producto"
        />
      </Form>
    </>
  )
}
