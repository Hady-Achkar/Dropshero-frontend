import React, {useState} from 'react'
import {Footer, Header} from '../../components'
import {Images} from '../../constants'
import {useHistory, useParams} from 'react-router-dom'
import {resetPassword} from '../../services'
import {handleError} from "../../utils";

type IParams = {
    token: string
}
const Index = () => {
    const [newPassword, setNewPassword] = useState<string>('')
    const history = useHistory()
    const {token} = useParams<IParams>()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        resetPassword(newPassword, token).then(res => {
            history.push('/sign-in')
        }).catch(handleError)
    }


    return (
        <>
            <Header/>
            <div
                style={{minHeight: '75vh'}}
                className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
            >
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <img
                                className="mx-auto h-12 w-auto"
                                src={Images.Logo.src}
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                اعادة تعيين كلمة المرور
                            </h2>
                        </div>
                        <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    كلمة المرور الجديدة
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    تأكيد
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Index
