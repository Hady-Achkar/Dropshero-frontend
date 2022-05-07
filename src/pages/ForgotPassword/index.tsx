import React, {useState} from 'react'
import {Footer, Header} from '../../components'
import {Images} from '../../constants'
import {forgotPassword} from "../../services";
import {CheckCircleIcon, XIcon} from '@heroicons/react/solid'
import {handleError} from "../../utils";

const Index = () => {
    const [email, setEmail] = useState<string>('')
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        forgotPassword(email).then(res => {
            setIsSubmitted(true)
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
                        {!isSubmitted ? <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        البريد الالكتروني
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            name="email"
                                            type="email"
                                            autoComplete="email"
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
                            </form> :
                            <div className="rounded-md bg-green-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true"/>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-green-800">تحقق من بريدك الالكتروني</p>
                                    </div>
                                    <div className="ml-auto pl-3">
                                        <div className="-mx-1.5 -my-1.5">
                                            <button
                                                type="button"
                                                className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                                            >
                                                <span className="sr-only">Dismiss</span>
                                                <XIcon className="h-5 w-5" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Index
