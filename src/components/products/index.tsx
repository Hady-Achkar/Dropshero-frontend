import React from 'react'
import ProductCard from './ProductCard'
import {AppState} from '../../reducers'
import {useSelector} from 'react-redux'

const Index = () => {
    const {products} = useSelector((state: AppState) => state.products)

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-3">
                    {products.length > 0 &&
                    products.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </div>
            </div>
        </div>
    )
}
export default Index
