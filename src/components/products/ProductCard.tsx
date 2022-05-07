import React from 'react'
import {IProduct} from '../../types'
import {Link} from 'react-router-dom'

interface IProps {
    product: IProduct
}
const ProductCard: React.FC<IProps> = (props) => {
    const {product} = props
    return (
        <div className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
            <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                <img
                    src={product?.thumbnail}
                    alt={product?.title}
                    className="w-full h-full object-center object-cover"
                />
            </div>
            <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                    <Link to={`/product/${product?.title}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product?.title}
                    </Link>
                </h3>

            </div>
        </div>
    )
}
export default ProductCard
