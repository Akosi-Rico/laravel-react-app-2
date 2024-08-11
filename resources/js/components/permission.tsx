import React, { useState, useEffect } from "react";
import Header from "./header";
import DataTable from "./DataTable";
import { useRoute } from 'ziggy-js';
import Axios from "axios";

export default function Permission() {
    const route = useRoute();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [isAssigningRole, setAssignRole] = useState(false);
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState("");
    const [currentSequence, setCurrentSequence] = useState(0);
    const [unknownError, setUnknownError] = useState("");
    const [errors, setErrors] = useState({ "payload.name": "", "payload.email": "" });
    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');
 
    const handleCurrentInfo = (data) => {
        handleClearState();
        setAssignRole(false);
        setId(data.id);
        setName(data.name);
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleClearState = () => {
        setName("");
        setId("");
        setUnknownError("");
        setErrorDetail();
        setRole("");
    }

    const setErrorDetail = (name = null) => {
        setErrors(e => ({ ...e, "payload.name": name }));
    }

    const handleSubmit =() => {
        let url = (id ? route("permission.update", id) : route("permission.store"));
        let method = (id ?  Axios.put :  Axios.post);
        method(url, {
            payload: {
                id: id,
                name: name
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
                    setErrorDetail(error.response.data.errors["payload.name"]);
                } else {
                    setUnknownError(error.response.data.message);
                    setErrorDetail();
                }
            }
        });
    }

    const handleDeletingId = (id) => {
        if (id) {
            Axios.delete(route("permission.destroy", id))
            .then(function (response) {
                if (response.data) {
                    setCurrentSequence(c => c + 1);
                }
            });
        }
    }

    const handleAssignRoles = () => {
        handleClearState();
        setAssignRole(true);
    }

    const handleRole = (event) => {
        setRole(event.target.value);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            Axios.get(route("load.available.role"))
            .then(function (response) {
                if (response.status == 200) {
                    setRoles(response.data);
                }
            });
        }, 2000);
        return () => clearTimeout(timeout);
    },[isAssigningRole]);

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
                <b>PERMISSION DETAILS</b>
                    <hr/>
                    <hr/>
            </div>
            <div className="py-2">
                <button className="warning-button" onClick={() => handleAssignRoles() }>
                    Assign Role?
                </button>
            </div>
            <div className="flex py-8 px-1">
                <div className="flex justify-end md:w-1/2 xs:w-svw">
                    <div className="flex flex-col md:w-1/2 xs:w-full xs:mx-1">
                        <section className="w-full mx-1 my-1">
                            <label className="uppercase font-sans font-medium text-slate-700">PERMISSION</label>
                            <input  
                                className={
                                    errors["payload.name"]
                                        ? "input-field error-field"
                                        : "input-field"
                                } 
                                value={name}
                                placeholder="Enter Permission Name"
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
                        <div className="mx-1">
                            <button className="primary-button" onClick={ () => handleSubmit()}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                {
                    isAssigningRole &&
                    <div className="flex justify-start md:w-1/2 xs:w-svw">
                        <div className="flex flex-col md:w-1/2 xs:w-full xs:mx-1">
                            <section className="w-full mx-1 my-1">
                                <label className="uppercase font-sans font-medium text-slate-700">ROLE</label>
                                <select
                                    className={
                                        errors["payload.status"]
                                            ? "option-field error-field"
                                            : "option-field"
                                    }  value={role} onChange={() => handleRole(event)}>
                                     <option value="">Select Role</option>
                                    {
                                        roles.map((role, index) => (
                                            <option value={role.id} key={`delete-button-${index}`} >{role.name}</option>
                                        ))
                                    }
                                </select>
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
                        </div>
                    </div>
                }
           </div>
            <DataTable 
                tableurl={route("load.permission.table")} 
                currentInfo={handleCurrentInfo}
                currentSequence={currentSequence}
                removeId={handleDeletingId}/>
        </div>
    </>);
}