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
function Languages() {
    const [isLoading, setIsloading] = useState(true)
    const [languages, setLanguages] = useState(null)
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate()
    const {token}= useSelector(state=>state.authState)
    // const token = auth.token

    useEffect(() => {
        async function fetchData() {
            let response = await fetch(`${process.env.REACT_APP_URL}/api/v1/language/show`, {
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
            setLanguages(data.languages)
            console.log(languages);
        }
        fetchData();
    }, []);

    const rows = languages?.map((lang, index) => ({
        ...lang,
        language:lang?.language[0]?.name,
        serialNumber: index + 1
    }))

    const columns = [
        // {
        //     field: 'serialNumber', headerName: 'S.No.', width: 5, sortable: false,
        //     filterable: false, headerClassName: 'super-app-theme--header',
        //     headerAlign: 'center',
        //     align: "center"
        // },
        {
            field: 'language', headerName: 'Languages', width: 400, headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
      
        {
            field: 'details',
            headerName: 'Details',
            renderCell: (params) => <Button style={{backgroundColor:"rgb(54, 75, 182)",color:"#fff"}} onClick={() => navigate(`/editlanguage/${params?.row._id}`)} >
                view
            </Button>,
            width: 300,
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
                        <h4>Language</h4>
                        <div style={{ height: "3px", width: "40px", backgroundColor: "#0042ae", borderRadius: "10px", marginTop: "3px" }}></div>
                    </div>
                    <div>
                        <Link to="/addlanguage" className="addAstroLink">Add Language</Link>
                    </div>
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
                                    ...languages.initialState,
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


export default Languages