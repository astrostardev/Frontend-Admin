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
import { FaCircleCheck } from "react-icons/fa6";
function PaidToAstrologers() {
    const [isLoading, setIsloading] = useState(true)
    const [astrologers, setAstrologers] = useState(null)
    const [pageSize, setPageSize] = useState(5);
    const[showTick, setShowTick] = useState(false)
    const navigate = useNavigate()
    const {token}= useSelector(state=>state.authState)
    // const token = auth.token

    useEffect(() => {
        async function fetchData() {
            let response = await fetch(`${process.env.REACT_APP_URL}/api/v1/astrologer/allAstrologers`, {
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
            setAstrologers(data.astrologers)
            console.log(astrologers);
        }
        fetchData();
    }, []);

    const payToAstrologer = async (id,amount,totalChatTime) => {
        const date = new Date();

        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/v1/astrologer/pay_to_astrologer`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id,amount,date,totalChatTime}) // Assuming id is an object or an array
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error occurred while paying to astrologer:', error);
        }
    };
    

    const rows = astrologers?.map((astrologer, index) => ({
        ...astrologer,
        serialNumber: index + 1
    }))
    const handlePayButtonClick = (rowId) => {
        setShowTick((prevShowTick) => ({
            ...prevShowTick,
            [rowId]: true // Set showTick to true for the corresponding row
        }));
    };

    const columns = [
        {
            field: 'serialNumber', headerName: 'S.No.', width: 5, sortable: false,
            filterable: false, headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"
        },
        {
            field: 'astrologerID', headerName: 'Astrologer ID', width: 200, headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'firstname',
            headerName: 'First Name',
            width: 200,
            editable: true,
            headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'displayname',
            headerName: 'Display Name',
            width: 200,
            editable: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'text',
            width: 250,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
        {
            field: 'mobilePrimary',
            headerName: 'Mobile No.',
            width: 200,
            sortable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
        {
            field: 'balance',
            headerName: 'Out stands',
         
            renderCell: (params) =>   
            <div>
            {showTick[params.row.astrologerID] ? (
                <FaCircleCheck style={{ color: "green" }} />
            ) : null} ₹ {params.row.balance ? params.row.balance : 0}
        </div>,
            width: 150,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
        {
            field: 'details',
            headerName: 'Details',
            renderCell: (params) => <Button style={{backgroundColor:"rgb(54, 75, 182)",color:"#fff"}} onClick={() => navigate(`/astrologer/${params?.row._id}`)} >
                View
            </Button>,
            width: 100,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
        {
            field: 'Pay',
            headerName: 'Pay',
            renderCell: (params) => {
                const totalChatTime = params.row?.chatDetails
                    ?.flatMap(data => data?.sameUser?.map(innerData => parseInt(innerData?.chatTime) || 0))
                    .reduce((total, chatTime) => total + chatTime, 0);
        
                return (
                    <Button
                        style={{ backgroundColor: "rgb(54, 75, 182)", color: "#fff" }}
                        onClick={() => { 
                            handlePayButtonClick(params.row.astrologerID); 
                            payToAstrologer(params.row._id, params.row.balance, totalChatTime);
                        }}
                    >
                        Paid
                    </Button>
                );
            },
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
                        <h4>Astrologers</h4>
                        <div className="title_divider"></div>
                    </div>
                    <div  className="header_btn">
                        <Link to="/addastrologers" className="addAstroLink">Add Astrologers</Link>
                    </div>
                </section>
                {isLoading ? (
                    <div className="loading">
                        <Spinner animation="grow" variant="warning" className="text-center" />
                    </div>
                ) : (
                    <section className="my-4" id="cate_detail">
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
                                    ...astrologers.initialState,
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


export default PaidToAstrologers