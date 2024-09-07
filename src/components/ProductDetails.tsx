import { Form, useFetcher, useNavigate } from "react-router-dom";
import { Product } from "../types"
import { formatCurrency } from "../utils";

type ProdcutDetailProps = {
  product: Product;
}

export const ProductDetails = ({ product }: ProdcutDetailProps) => {

  // useFetcher para ejecutar acciones directamente sombre la misma pagina, sin redirecionar
  const fetcher = useFetcher();
  const navigate = useNavigate();

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">
        {product.name}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">

        {/* value={product.id} para que al action me llege el id y no el valor true o false */}
        <fetcher.Form method="POST" action="">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${product.isAvailable ? 'text-black': 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {product.isAvailable ? 'Disponible' : 'No Disponible'}
          </button>
        </fetcher.Form>        
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >Editar</button>

          {/* OnSubmit se ejecuta antes del acion, el action redireciona a la otra pagina con el action de eliminar */}
          <Form
            className="w-full"
            method="POST"
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm('¿Eliminar?')) {
                e.preventDefault();
              }
            }}
          >
            <input type="submit" value={'Eliminar'} className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"/>
          </Form>
        </div>
      </td>
    </tr>
  )
}
