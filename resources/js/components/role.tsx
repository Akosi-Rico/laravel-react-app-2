import React, { useState } from "react";
import Header from "./header";
import DataTable from "./DataTable";
import { useRoute } from 'ziggy-js';
import Axios from "axios";
export default function Role() {
    const route = useRoute();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [currentSequence, setCurrentSequence] = useState(0);
    const [unknownError, setUnknownError] = useState("");
    const [errors, setErrors] = useState({ "payload.name": "", "payload.email": "" });
    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).getAttribute('content');

    const handleCurrentInfo = (data) => {
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
    }

    const setErrorDetail = (name = null) => {
        setErrors(e => ({ ...e, "payload.name": name }));
    }

    const handleSubmit =() => {
        let url = (id ? route("role.update", id) : route("role.store"));
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
            Axios.delete(route("role.destroy", id))
            .then(function (response) {
                if (response.data) {
                    setCurrentSequence(c => c + 1);
                }
            });
        }
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
                <b>ROLE DETAILS</b>
                <hr/>
                <hr/>
            </div>
            <div className="flex py-8 px-1">
                <div className="flex justify-end md:w-1/2 xs:w-svw">
                    <div className="flex flex-col md:w-1/2 xs:w-full xs:mx-1">
                        <section className="w-full mx-1 my-1">
                            <label className="uppercase font-sans font-medium text-slate-700">ROLE</label>
                            <input  
                                className={
                                    errors["payload.name"]
                                        ? "input-field error-field"
                                        : "input-field"
                                } 
                                value={name}
                                placeholder="Enter Role Name"
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
           </div>
            <DataTable 
                tableurl={route("load.role.table")} 
                currentInfo={handleCurrentInfo}
                currentSequence={currentSequence}
                removeId={handleDeletingId}/>
        </div>
    </>);
}