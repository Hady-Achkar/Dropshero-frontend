import React from 'react'
import {CheckIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import YouTubePlayer from 'react-youtube'
import ReactPlayer from 'react-player'

const VideoSection = () => {
	const opts = {
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	}
	return (
		<div className="relative py-4 bg-white">
			<div className="max-w-7xl mx-auto  lg:bg-transparent lg:px-8">
				<div className="max-w-3xl mx-auto mb-8 p-3 lg:p-0">
					<YouTubePlayer
						title="YouTube video player"
						videoId="1-5CaTDLBek"
						className="rounded border-0 mx-auto w-full px-2"
					/>
				</div>

				<div className=" bg-slate-50 py-5 px-6 rounded-3xl">
					<div className="max-w-3xl mx-auto text-center">
						<h2
							className="text-3xl font-extrabold text-gray-500"
							id="join-heading"
						>
							شاهد الفيديو
						</h2>
						<br />
						<div className="">
							<p className="text-lg text-gray-700 leading-8 my-2">
								يومياً منتجات جديدة يتم اضافتها بشكل يدوي بعد بحث كامل في مجال
								الدروب شيبنغ.
							</p>

							<p className="text-lg text-gray-700 leading-8 my-2">
								لكل منتج ستجد اعلان جاهز للاستخدام و نص اعلان و طريقة التسويق
								المناسبة للمنتج مع الاستهداف المناسب
							</p>
							<p className="text-lg text-gray-700 leading-8 my-2">
								دراسة للمنافسين في السوق لكل منتج و طريقة التمييز على المنافسين
								مع التسعيرة المناسبة لك و روابط الموردين المناسبين
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoSection
