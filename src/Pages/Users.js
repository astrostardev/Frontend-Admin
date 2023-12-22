
import { Link, useNavigate } from "react-router-dom"
import "../Stylesheets/Astrologers.scss"
import { useEffect, useState, useCallback } from "react"
import { Button, Badge, Spinner } from "react-bootstrap";
import { Box } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import React from 'react';
import moment from 'moment'
import { useSelector } from "react-redux";
function Users() {
    const [isLoading, setIsloading] = useState(true)
    const [users, setUsers] = useState(null)
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate()
    const {token} = useSelector(state=>state.authState)

    useEffect(() => {
        async function fetchData() {
            let response = await fetch("http://localhost:8000/api/v1/user/users", {
                method: "GET",
                headers: {
                    'Content-type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            // console.log(response);
            let data = await response.json();
            console.log(data)
            setIsloading(false)
            setUsers(data.users)
            console.log(users);
        }
        fetchData();
    }, []);

    const rows = users?.map((user, index) => ({
        ...user,
        serialNumber: index + 1
    }))

    const columns = [
        {
            field: 'serialNumber', headerName: 'S.No.', width: 5, sortable: false,
            filterable: false, headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"
        },
    
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            editable: true,
            headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
    
    
        {
            field: 'phoneNo',
            headerName: 'Mobile No',
            width: 200,
            sortable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
        
    
        {
            field: 'loginTime',
           
            renderCell: (params) => (params.row.loginTime ?  moment(params.row.loginTime).format('MMMM Do YYYY, h:mm:ss a'): ''),
           
            headerName: 'Last Login Time',
            width: 400,
            sortable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
        {
            field: 'callDuration',
            headerName: 'Last call duration',
            width: 300,
            sortable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
        {
            field: 'details',
            headerName: 'Details',
            renderCell: (params) => <Button variant="warning" onClick={() => navigate(`/user/${params?.row._id}`)} >
                View
            </Button>,
            width: 100,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
    ];

    const getRowSpacing = useCallback((params) => {
        return {
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
        };
    }, []);

    return (
        <div className="infoContainer">
            <main id="admin-astro">
                <section className="astro-head">
                    <div>
                        <h4>Users</h4>
                        <div style={{ height: "3px", width: "40px", backgroundColor: "#0042ae", borderRadius: "10px", marginTop: "3px" }}></div>
                    </div>
                    {/* <div>
                        <Link to="/addastrologers" className="addAstroLink">Add Astrologers</Link>
                    </div> */}
                </section>
                {isLoading ? (
                    <div className="loading">
                        <Spinner animation="grow" variant="warning" className="text-center" />
                    </div>
                ) : (
                    <section className="my-4" style={{ backgroundColor: "#FFFFFF", textAlign: "center" }}>
                        <Box
                            sx={{
                              
                                width: '100%',
                                '& .super-app-theme--header': {
                                    // backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                    // color: 'rgba(255,255,255,1)',
                                    fontWeight: "400"

                                },
                            }}
                        >
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                getRowId={row => row._id}
                                initialState={{
                                    ...users.initialState,
                                    pagination: { paginationModel: { pageSize: 5 } },
                                }}
                                pageSizeOptions={[0, 5, 10, 25]}
                                disableRowSelectionOnClick
                                getRowSpacing={getRowSpacing}
                                sx={{
                                    [`& .${gridClasses.row}`]: {
                                        bgcolor: (theme) =>
                                            theme.palette.mode === 'light' ? grey[200] : grey[900],
                                    },
                                }}

                            />
                        </Box>
                    </section>
                )}
            </main>
        </div >
    )
}


export default Users