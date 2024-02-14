import React from 'react'
import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from "react-router-dom"
import { login } from "../store/authSlices"
import { Button, Input, Logo } from "./index"
import { UseDispatch, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurretUser();
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.massage)
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Already have an account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&apos;
                    <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-500 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(create)} className='mt-8'></form>
                <div className='space-y-5'>
                    <Input
                        label="Full Nmae"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "true",
                            validate: {
                                matchPatern: (value) => /^\w+([.~]?\w+)*@\w+([.~]?\w+)*(\\w{2,3})+5/.
                                    test(value) || "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Entrer your password"
                        {...register("password", {
                            required: true
                        })}
                    />
                    <Button className="w-full" type="submit">Create Account</Button>
                </div>
            </div>
        </div>
    )

}

export default Signup