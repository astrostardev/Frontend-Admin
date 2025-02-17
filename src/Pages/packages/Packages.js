import { Link, useNavigate } from "react-router-dom"
import "../../Stylesheets/Astrologers.scss"
import { useEffect, useState, useCallback } from "react"
import { Button, Badge, Spinner } from "react-bootstrap";
import { Box } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import React from 'react';
import {useSelector} from "react-redux";
import MetaData from "../../Components/MetaData";
function Astrologers() {
    const [isLoading, setIsloading] = useState(true)
    const [packages, setPackages] = useState(null)
    const navigate = useNavigate()
    const {token}= useSelector(state=>state.authState)

// get all packages
    useEffect(() => {
        async function fetchData() {
            let response = await fetch(`${process.env.REACT_APP_URL}/api/v1/package/show`, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },   
            method: "GET",
            });
            // console.log(response);
            let data = await response.json();
            console.log(data)
            setIsloading(false)
            setPackages(data.packages)
            console.log(packages);
        }
        fetchData();
    }, []);

    const rows = packages?.map((astrologer, index) => ({
        ...astrologer,
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
            field: 'fixedPrice', headerName: 'Price', width: 200, headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'packageName',
            headerName: 'Package Name',
            width: 200,
            editable: true,
            headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'packageDetail',
            headerName: 'package Detail',
            width: 200,
            editable: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
        // {
        //     field: 'isActive',
        //     headerName: '',
        //     type: 'text',
        //     width: 250,
        //     headerClassName: 'super-app-theme--header',
        //     headerAlign: 'center',
        //     align: "center"

        // },
        // {
        //     field: 'mobilePrimary',
        //     headerName: 'Mobile No.',
        //     width: 200,
        //     sortable: false,
        //     headerClassName: 'super-app-theme--header',
        //     headerAlign: 'center',
        //     align: "center"

        // },
        // {
        //     field: 'isActive',
        //     headerName: 'Status',
        //     renderCell: (params) => params.row.isActive== "Yes" ? (<Badge bg="success">Active</Badge>) : (<Badge bg="danger">Inactive</Badge>),
        //     width: 150,
        //     headerClassName: 'super-app-theme--header',
        //     headerAlign: 'center',
        //     align: "center"

        // },
        {
            field: 'details',
            headerName: 'Details',
            renderCell: (params) => <Button style={{backgroundColor:"rgb(54, 75, 182)",color:"#fff"}} onClick={() => navigate(`/package/${params?.row._id}`)} >
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
        <MetaData title={'Astro5Star-Manager'} />

                <section className="astro-head">
                    <div>
                        <h4>Packages</h4>
                        <div className="title_divider"></div>
                    </div>
                    <div  className="header_btn">
                        <Link to="/addpackages" className="addAstroLink">Add Package</Link>
                    </div>
                </section>
                {isLoading ? (
                    <div className="loading">
                        <Spinner animation="grow" variant="warning" className="text-center" />
                    </div>
                ) : (
                    <section className="my-4"  id="cate_detail">
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
                                    ...packages.initialState,
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


export default Astrologers