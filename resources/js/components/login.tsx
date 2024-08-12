import React, { useState } from "react";
import { useRoute } from 'ziggy-js';
import Axios from "axios";
import { usePublicPathImageContext } from "./UseContext/context.ts";

export default function LoginForm() {
    const route = useRoute();
    const path = usePublicPathImageContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [unknownError, setUnknownError] = useState("");
    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
    const [errors, setErrors] = useState({"payload.email": "", "payload.password": ""});
   
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const setErrorDetail = (email = null, password = null) => {
        setErrors(e => ({ ...e, "payload.email": email,  "payload.password": password }));
    }

    const handleLoginProcess = () => {
        Axios.post(route("login.process"), {
            payload: {
                email: email,
                password: password,
            },
            _token: csrfToken,
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        .then(function (response) {
            if (response.status == 200) {
                window.location.href = route("user.index");
            }
        })
        .catch(function (error) {
            if (error.response.status == 422) {
                setErrorDetail(
                    error.response.data.errors["payload.email"], 
                    error.response.data.errors["payload.password"]);
            } else {
                setUnknownError(error.response.data.message);
                setErrorDetail();
            }
        });
    }

    return(<>
        <div className="bg-slate-100 h-svh w-screen overflow-x-hidden">
            <div className="flex bg-slate-100 justify-center overflow-hidden">
                <div className="flex flex-col bg-slate-200 w-svw  xs:h-3/4 h-svh md:w-1/2 my-20 sm:mx-12 shadow-md rounded-xl static">
                    <div className="flex justify-center items-center relative top-[-65px]">
                        <img src={ path +"/image/logo.png" } className="w-36 h-36 rounded-full bg-slate-300 "/>
                    </div>
                    <div className=" justify-center items-center sm:flex xs:flex-col text-center">
                        {
                            unknownError && (
                                <div className="flex justify-center items-center py-2 bg-red-500 my-2 xs:h-3/4 h-svh md:w-1/2">
                                    <p className="error-text-unknown">{unknownError}</p>
                                </div>
                            )
                        }
                        <h1 className="text-3xl font-sans font-bold text-slate-700">User Management System</h1>
                        <h1 className="text-sm font-sans font-bold text-slate-700">(Laravel + Tailwind + React)</h1>
                    </div>
                    <div className="flex flex-col justify-start items-center py-8">
                        <section className="w-1/2 mx-24 my-1">
                            <label className=" font-sans font-medium text-slate-700">Email Address</label>
                            <input
                                className={
                                    errors["payload.email"]
                                        ? "input-field error-field"
                                        : "input-field"
                                }
                                type="text"
                                placeholder="Enter Email Address"
                                value={email}
                                onChange={() => handleEmail(event) }
                                />
                            {
                                errors["payload.email"] && (
                                    <div className="flex">
                                        <span className="error-text mx-1">
                                            {errors["payload.email"]}
                                        </span>
                                    </div>
                                )
                            }
                        </section>
                        <section className="w-1/2 mx-24 my-1">
                            <label className=" font-sans font-medium text-slate-700">Password</label>
                            <input  
                                className={
                                    errors["payload.password"]
                                        ? "input-field error-field"
                                        : "input-field"
                                }
                                type="password"
                                placeholder="Enter Password" 
                                value={password}
                                onChange={() => handlePassword(event) }
                            />
                            {
                                errors["payload.password"] && (
                                    <div className="flex">
                                        <span className="error-text mx-1">
                                            {errors["payload.password"]}
                                        </span>
                                    </div>
                                )
                            }
                        </section>
                        <section className="w-1/2 mx-24 my-1">
                            <button className="primary-button mx-1" onClick={() => handleLoginProcess()}>
                                Login
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </>);
}