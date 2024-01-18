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
function Category() {
    const [isLoading, setIsloading] = useState(true)
    const [courseCatgeories, setCourseCategory] = useState([])
    const navigate = useNavigate();
    const {token}= useSelector(state=>state.authState)
    // const token = auth.token


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsloading(true)
                const response = await fetch(`${process.env.REACT_APP_URL}/api/v1/category/show`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    // Handle non-successful response (e.g., 404 Not Found)
                    alert(`Error: ${response.status} - ${response.statusText}`);
                    return;
                } else {
                    setIsloading(false)
                    const data = await response.json();
                     console.log(data);
                    setCourseCategory(data.categories)
                   console.log(courseCatgeories);
                }

            } catch (error) {
                alert('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const rows = courseCatgeories?.map((category,index) => ({
        ...category,
        category:category?.category[0]?.name,
        serialNumber: index + 1,
 
      
    }))


    const columns = [
        {
            field: 'serialNumber', headerName: 'S.No.', width: 5, sortable: false,
            filterable: false, headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"
        },
        {
            field:'category', headerName: 'Name', width: 200, headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
        
       
       
        {
            field: 'details',
            headerName: 'Details',
            renderCell: (params) => <Button style={{backgroundColor:"rgb(54, 75, 182)",color:"#fff"}} onClick={() => navigate(`/edit_product_categories/${params?.row._id}`)} >
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
        <MetaData title={'Astro5Star-Manager'} />
            <main id="admin-astro">
                <section className="astro-head">
                    <div>
                        <h4>Category</h4>
                        <div style={{ height: "3px", width: "40px", backgroundColor: "#0042ae", borderRadius: "10px", marginTop: "3px" }}></div>
                    </div>
                    <div style={{display:"flex", gap:"10px"}}>
                        <Link to="/add_product_category" className="addAstroLink">Add Category</Link>
                        {/* <Link to="/addcourse" className="addAstroLink">Add Course</Link> */}
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
                                    ...courseCatgeories.initialState,
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


export default Category