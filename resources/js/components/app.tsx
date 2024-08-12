import React, { useState, useEffect } from "react";
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
    const [roles, setRoles] = useState([]);
    const [permission, setPermission] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [currentSequence, setCurrentSequence] = useState(0);
    const [unknownError, setUnknownError] = useState("");
    const [errors, setErrors] = useState({ 
            "payload.name": "", 
            "payload.email": "", 
            "payload.password": "",
            "payload.role": "",
            "payload.permission": ""
        });
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
        setRole("");
        setPermission("");
        setConfirmPassword("");
        setUnknownError("");
        setErrorDetail();
        setPermissions([]);
    }

    const setErrorDetail = (name = null, email = null, password = null, role = null, permission = null) => {
        setErrors(e => ({ ...e, 
                "payload.name": name, 
                "payload.email": email,
                "payload.password": password,
                "payload.role": role,
                "payload.permission": permission 
            })
        );
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
                isNewUser: newUser,
                role: role,
                permission: permission,
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
                        error.response.data.errors["payload.password"],
                        error.response.data.errors["payload.role"],
                        error.response.data.errors["payload.permission"]);
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

    const handleRole = (event) => {
        if (!event.target.value) {
            setPermission("");
        }
        setRole(event.target.value);
        setPermissions([]);
        handlePermissions(event.target.value);
    }

    const handlePermissions = (roleID) => {
        if (roleID) {
            Axios.post(route("generate.permissions"), {
                payload: {
                    roleId: roleID,
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
                    setPermissions(response.data);
                }
            })
            .catch(function (error) {
                setUnknownError(error.response.data.message);
            });
        }
    }

    const handlePermission = (event) => {
        setPermission(event.target.value);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            Axios.get(route("generate.role"))
            .then(function (response) {
                if (response.status == 200) {
                    setRoles(response.data);
                }
            });
        }, 100);
        return () => clearTimeout(timeout);
    },[]);
 
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
                            <section className="w-full mx-1 my-1">
                                <label className="uppercase font-sans font-medium text-slate-700">ROLE</label>
                                <select
                                    className={
                                        errors["payload.role"]
                                            ? "option-field error-field"
                                            : "option-field"
                                    }  value={role} onChange={()=> handleRole(event)}>
                                    <option value="">Select Role</option>
                                    {
                                        roles.map((role, index) => (
                                            <option value={role.id} key={index}>{role.name}</option>
                                        ))
                                    }
                                </select>
                                {
                                    errors["payload.role"] && (
                                        <div className="flex">
                                            <span className="error-text mx-1">
                                                {errors["payload.role"]}
                                            </span>
                                        </div>
                                    )
                                }
                            </section>
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
                        <section className="w-full mx-1 my-1">
                            <label className="uppercase font-sans font-medium text-slate-700">PERMISSION</label>
                            <select
                                className={
                                    errors["payload.permission"]
                                        ? "option-field error-field"
                                        : "option-field"
                                }  value={permission} onChange={()=> handlePermission(event)}>
                                <option value="">Select Permission</option>
                                {
                                    permissions.map((role, index) => (
                                        <option value={role.id} key={index}>{role.name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors["payload.permission"] && (
                                    <div className="flex">
                                        <span className="error-text mx-1">
                                            {errors["payload.permission"]}
                                        </span>
                                    </div>
                                )
                            }
                        </section>
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