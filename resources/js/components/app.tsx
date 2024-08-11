import React, { useState } from "react";
import Header from "./header";
import DataTable from "./DataTable";
import { useRoute } from 'ziggy-js';
import Axios from "axios";
export default function App() {
    const route = useRoute();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [newUser, setNewUser] = useState(false);
    const [role, setRole] = useState("");
    const [permission, setPermission] = useState("");
    const [currentSequence, setCurrentSequence] = useState(0);
    const [unknownError, setUnknownError] = useState("");
    const [errors, setErrors] = useState({ "payload.name": "", "payload.email": "", "payload.password": "" });
    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');

    const handleCurrentInfo = (data) => {
        handleClearState();
        setNewUser(false);
        setId(data.id);
        setName(data.name);
        setEmail(data.email);
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleClearState = () => {
        setId("");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUnknownError("");
        setErrorDetail();
    }

    const setErrorDetail = (name = null, email = null, password = null) => {
        setErrors(e => ({ ...e, "payload.name": name,  "payload.email": email, "payload.password": password  }));
    }

    const handleSubmit =() => {
        let url = (id ? route("user.update", id) : route("user.store"));
        let method = (id ?  Axios.put :  Axios.post);
        method(url, {
            payload: {
                id: id,
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
                isNewUser: newUser
            },
            _token: csrfToken,
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        .then(function (response) {
            if (response.data) {
                setCurrentSequence(c => c + 1);
                handleClearState();
            }
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status == 422) {
                    setErrorDetail(
                        error.response.data.errors["payload.name"],
                        error.response.data.errors["payload.email"],
                        error.response.data.errors["payload.password"]);
                } else {
                    setUnknownError(error.response.data.message);
                    setErrorDetail();
                }
            }
        });
    }

    const handleDeletingId = (id) => {
        if (id) {
            Axios.delete(route("user.destroy", id))
            .then(function (response) {
                if (response.data) {
                    setCurrentSequence(c => c + 1);
                }
            });
        }
    }

    const handleNewUser = () => {
        setNewUser(true);
        handleClearState();
    }
 
    return (<>
        <Header></Header>
        <div className="xs:pt-48 sm:pt-44 sm:px-2">
            {   
                unknownError && (
                    <div className="flex justify-center items-center py-2 bg-red-500 my-2">
                        <p className="error-text-unknown">{unknownError}</p>
                    </div>
                )
            }
            <div className="flex flex-col">
                <b>USER DETAILS</b>
                <hr/>
                <hr/>
            </div>
            <div className="py-2">
                <button className="warning-button" onClick={ () => handleNewUser()}>
                    Register New Account?
                </button>
            </div>
            <div className="flex py-8 px-1">
                <div className="flex justify-end md:w-1/2 xs:w-svw">
                    <div className="flex flex-col md:w-1/2 xs:w-full xs:mx-1">
                        <section className="w-full mx-1 my-1">
                            <label className="uppercase font-sans font-medium text-slate-700">FULLNAME</label>
                            <input  
                               className={
                                errors["payload.name"]
                                    ? "input-field error-field"
                                    : "input-field"
                                } 
                                value={name}
                                type="text"
                                placeholder="Enter Fullname"
                                onChange={ () => handleName(event)}
                                />
                            {
                                errors["payload.name"] && (
                                    <div className="flex">
                                        <span className="error-text mx-1">
                                            {errors["payload.name"]}
                                        </span>
                                    </div>
                                )
                            }
                            </section>
                            {
                                newUser && 
                                <section className="w-full mx-1 my-1">
                                    <label className="uppercase font-sans font-medium text-slate-700">PASSWORD</label>
                                    <input  
                                        className={
                                            errors["payload.password"]
                                                ? "input-field error-field"
                                                : "input-field"
                                        }
                                        value={password}
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={ () => handlePassword(event)}
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
                            }
                        <div className="mx-1">
                            <button className="primary-button" onClick={ () => handleSubmit()}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start md:w-1/2 xs:w-svw">
                    <div className="flex flex-col  md:w-1/2 xs:w-full xs:mx-1">
                        <section className="w-full mx-1 my-1">
                            <label className="uppercase font-sans font-medium text-slate-700">EMAIL</label>
                            <input  
                                className={
                                errors["payload.email"]
                                    ? "input-field error-field"
                                    : "input-field"
                                } 
                                value={email}
                                type="email"
                                onChange={() => handleEmail(event)}
                                placeholder="Enter Email Address"/>
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
                        {
                            newUser && 
                            <section className="w-full mx-1 my-1">
                                <label className="uppercase font-sans font-medium text-slate-700">CONFIRM PASSWORD</label>
                                <input  
                                className={
                                    errors["payload.password"]
                                        ? "input-field error-field"
                                        : "input-field"
                                    }
                                    value={confirmPassword}
                                    type="password"
                                    placeholder="Enter Confirm Password"
                                    onChange={() => handleConfirmPassword(event)}
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
                        }
                    </div>
                </div>
           </div>
            <DataTable
                tableurl={route("load.user.table")} 
                currentInfo={handleCurrentInfo} 
                currentSequence={currentSequence}
                removeId={handleDeletingId}/>
        </div>
    </>);
}