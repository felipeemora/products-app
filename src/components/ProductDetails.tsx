import { Product } from "../types"
import { formatCurrency } from "../utils";

type ProdcutDetailProps = {
  product: Product;
}

export const ProductDetails = ({ product }: ProdcutDetailProps) => {
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">
        {product.name}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {product.isAvailable ? 'Disponible' : 'No Disponible'}
      </td>
      <td className="p-3 text-lg text-gray-800 ">

      </td>
    </tr>
  )
}
