import React,  { useState, useEffect } from "react";
import Axios from "axios";
import DataTablePipeline, { defaultThemes }  from "react-data-table-component";

interface LoadProps {
    tableurl: string;
    currentInfo: (data) => void;
    currentSequence: number;
    removeId: (data) => void;
}

export default function DataTable({ tableurl, currentInfo, currentSequence, removeId }: LoadProps)
{
    const [rows, setRows] = useState([]);
    const [items, setItems] = useState([]);
    const [pending, setPending] = useState(true);
    const columns = items.length > 0 
        ? Object.keys(items[0]).map(key => ({
            name: key.replace(/_/g, ' ').toUpperCase(),
            selector: row => row[key],
            sortable: true,
        }))
    : [];

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (tableurl) {
                Axios.get(tableurl)
                .then(function (response) {
                    if (response.status == 200) {
                        if (response.data) {
                            setItems(response.data.message);
                            setRows(response.data.message);
                            setPending(false);
                        }
                    }
                });
            }
        },400);
        return () => clearTimeout(timeout);
    },[currentSequence]);

    const handleCurrentInfo = (data) => {
        currentInfo(data);
    }

    const handleRemovingItem = (id) => {
        removeId(id);
    }

    columns.push({
        name: 'ACTION',
        cell: (row) => [
            <div  key={`cc-button-${row.id}`} className="flex md:flex-row xs:flex-col w-full px-2 py-2">
                <button key={`edit-button-${row.id}`}  className="warning-button" onClick={() => handleCurrentInfo(row)}>Edit</button>
                <button key={`delete-button-${row.id}`}  className="danger-button" onClick={() => handleRemovingItem(row.id)}>Delete</button>
            </div>
        ],
    });

    return (<>
        <div className="flex flex-col border border-solid my-1">
            <DataTablePipeline
                columns={columns}
                persistTableHead={true}
                data={rows}
                noDataComponent="No records to display"
                progressPending={pending}
                fixedHeader
                customStyles={
                    {
                        header: {
                            style: {
                                minHeight: '56px',
                            },
                        },
                        headRow: {
                            style: {
                                borderTopStyle: 'solid',
                                borderTopWidth: '1px',
                                fontWeight: "bold",
                                color: "#708090",
                                fontSize: "14px",
                                borderTopColor: defaultThemes.default.divider.default,
                            },
                        },
                        headCells: {
                            style: {
                                '&:not(:last-of-type)': {
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1px',
                                    borderRightColor: defaultThemes.default.divider.default,
                                },
                            },
                        },
                        cells: {
                            style: {
                                '&:not(:last-of-type)': {
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1px',
                                    borderRightColor: defaultThemes.default.divider.default,
                                },
                            },
                        },
                    }
                }
                highlightOnHover
		        pointerOnHover
                dense
                pagination/>
        </div>
    </>);
}