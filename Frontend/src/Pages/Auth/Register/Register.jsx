import React from 'react';
import { Link } from 'react-router';
import GoogleLogin from '../../../Components/Shared/GoogleLogin';
import { useForm } from 'react-hook-form';

const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    console.log(errors)

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="min-h-[calc(100vh-300px)] flex flex-col-reverse md:flex-row">
            <div className="w-1/2"></div>

            <div className="w-full md:w-1/2 flex justify-center items-center p-6">
                <div className="card max-w-sm w-full shadow-2xl p-2">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input
                                    {...register('name', {
                                        required: "Name is required",
                                        maxLength: {
                                            value: 20,
                                            message: "Name must be less than 20 characters"
                                        }
                                    })}
                                    type="text"
                                    className="input focus-within:outline-0" placeholder="Name"
                                />
                                {errors.name && <p className='text-xs text-red-500'>{errors.name.message}</p>}

                                <label className="label">Photo</label>
                                <input type="file" className="file-input" />

                                <label className="label">Email</label>
                                <input
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                    type="email"
                                    className="input focus-within:outline-0" placeholder="Email"
                                />
                                {errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}

                                <label className="label">Password</label>
                                <input
                                    {...register('password', {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.{8,}).*$/,
                                            message: "Password must contain one special character, one uppercase and one lowercase character"
                                        }
                                    })}
                                    type="password"
                                    className="input focus-within:outline-0" placeholder="Password"
                                />
                                {errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p>}

                                <div>
                                    <a className="link link-hover">Forgot password?</a>
                                </div>

                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>
                        <p>
                            Already have an account?
                            <strong>
                                <Link to="/auth/login">register</Link>
                            </strong>
                        </p>
                    </div>
                    <GoogleLogin title="Sign Up"></GoogleLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;