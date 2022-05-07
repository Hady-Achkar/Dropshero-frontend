import React, {Fragment, useCallback} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon, FilterIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import {useDispatch} from 'react-redux'
import {
	sortCost,
	sortDate,
	startInitializeProducts,
	filterCategory,
} from '../../actions'
import {DateSortingType, SortingOptions} from '../../types'
import {categories} from '../../data/categories'

const sortOptions = [
	{name: 'سعر الشراء', role: SortingOptions.PRICE, current: true},
	{name: 'من الأجدد للأقدم', role: SortingOptions.DESC_DATE, current: false},
	{name: 'من الاقدم للأجدد', role: SortingOptions.ASC_DATE, current: false},
]

const Filters = () => {
	const dispatch = useDispatch()
	const handleSort = useCallback(
		(role: SortingOptions) => {
			switch (role) {
				case SortingOptions.PRICE:
					dispatch(sortCost())
					break
				case SortingOptions.ASC_DATE:
					dispatch(sortDate(DateSortingType.ASC))
					break
				case SortingOptions.DESC_DATE:
					dispatch(sortDate(DateSortingType.DESC))
					break
				default:
					return
			}
		},
		[dispatch]
	)

	const handleClearAll = useCallback(() => {
		dispatch(startInitializeProducts())
	}, [dispatch])
	return (
		<div className="bg-slate-50">
			{/* Filters */}
			<Disclosure
				as="div"
				aria-labelledby="filter-heading"
				className="max-w-2xl mx-auto flex justify-between items-center bg-slate-50"
			>
				<div className="py-4">
					<div className="max-w-xl py-4 mx-auto flex space-x-6 text-sm px-4 sm:px-6 lg:px-8">
						<Menu as="div" className="relative">
							<Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
								اختر التصنيف
								<ChevronDownIcon
									className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
									aria-hidden="true"
								/>
							</Menu.Button>

							<Transition
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div className="py-1">
										{categories.map((option, index) => (
											<Menu.Item key={index}>
												{({active}) => (
													<button
														onClick={() => {
															dispatch(filterCategory(option.value))
														}}
														className={classNames(
															option.current
																? 'font-medium text-gray-900'
																: 'text-gray-500',
															active ? 'bg-gray-100' : '',
															'block text-right w-full px-4 py-2 text-sm'
														)}
													>
														{option.label}
													</button>
												)}
											</Menu.Item>
										))}
									</div>
								</Menu.Items>
							</Transition>
						</Menu>

						<div className="pr-6">
							<button
								type="button"
								className="text-gray-500"
								onClick={handleClearAll}
							>
								إلغاء الفلتر
							</button>
						</div>
					</div>
				</div>

				<div className="py-4">
					<div className="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<Menu as="div" className="relative inline-block">
							<div className="flex">
								<Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
									ترتيب حسب
									<ChevronDownIcon
										className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
										aria-hidden="true"
									/>
								</Menu.Button>
							</div>

							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div className="py-1">
										{sortOptions.map((option) => (
											<Menu.Item key={option.name}>
												{({active}) => (
													<button
														onClick={() => handleSort(option.role)}
														className={classNames(
															option.current
																? 'font-medium text-gray-900'
																: 'text-gray-500',
															active ? 'bg-gray-100' : '',
															'block px-4 py-2 text-sm'
														)}
													>
														{option.name}
													</button>
												)}
											</Menu.Item>
										))}
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>
			</Disclosure>
		</div>
	)
}
export default Filters
