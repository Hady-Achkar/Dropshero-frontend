import {HeartIcon} from '@heroicons/react/outline'
import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid'

import React, {Fragment, useCallback, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {startAddToFavorites, startRemoveFavorites} from '../../actions'
import {AppState} from '../../reducers'

interface IProps {
    productId: string
}

const AddToFavorites: React.FC<IProps> = (props) => {
    const dispatch = useDispatch()
    const {
        user: {favorites},
    } = useSelector((state: AppState) => state.auth)
    const {productId} = props

    const isFavorite = useMemo(() => {
        return favorites.find((item) => item._id === productId)
    }, [productId, favorites])

    const handleAddFavorite = () => {
        dispatch(startAddToFavorites(productId))
    }

    const handleDeleteFavorite = () => {
        dispatch(startRemoveFavorites(productId))
    }
    return (
        <div className="mt-6">
            <div className="mt-10 flex sm:flex-col">
                {!isFavorite ? (
                    <button
                        onClick={handleAddFavorite}
                        className=" sm:w-full flex-1 shadow-sm bg-red-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
                    >
                        <HeartIcon
                            className="h-6 w-6 flex-shrink-0 mx-2"
                            aria-hidden="true"
                        />
                        اضافة الى المفضلات
                    </button>
                ) : (
                    <button
                        onClick={handleDeleteFavorite}
                        className="sm:w-full flex-1 shadow-sm bg-red-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500 "
                    >
                        <HeartIconFilled
                            className="h-6 w-6 flex-shrink-0 mx-2"
                            aria-hidden="true"
                        />
                        ازالة من قائمة المفضلات
                    </button>
                )}
            </div>
        </div>
    )
}

export default AddToFavorites
