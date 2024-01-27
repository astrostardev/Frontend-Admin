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
function Courses() {
    const [isLoading, setIsloading] = useState(true)
    const [courses, setCourses] = useState(null)
    const navigate = useNavigate();
    const {token}= useSelector(state=>state.authState)
// get courses
    useEffect(() => {
        async function fetchData() {
            let response = await fetch(`${process.env.REACT_APP_URL}/api/v1/course/show`, {
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
            setCourses(data.courses)
            console.log(courses);
        }
        fetchData();
    }, []);

    const rows = courses?.map((courses,index) => ({
        ...courses,
        
        serialNumber: index + 1,
        // category:courses.category[0].name
      
    }))


    const columns = [
        {
            field: 'serialNumber', headerName: 'S.No.', width: 5, sortable: false,
            filterable: false, headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"
        },
        {
            field:'coursename', headerName: 'Name', width: 200, headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
        {
            field:'price', headerName: 'Price', width: 200, headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
        {
            field:'category', headerName: 'Category', width: 200, headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        }, {
            field:'description', headerName: 'Description', width: 300, headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
        {
            field:'images', headerName: 'Image',  renderCell: (params) =><img src={params.row.images[0]?.image} alt="" style={{width:"75px",margin:"5px"}}/>
            , width: 200, headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'isActive',
            headerName: 'status',
            renderCell: (params) => <Button style={{backgroundColor:"rgb(54, 75, 182)",color:"#fff"}}>
            {params.row.isActive ? 'Disable' : 'Enable'}
            </Button>,
            type: 'text',
            width: 250,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
       
        {
            field: 'details',
            headerName: 'Details',
            renderCell: (params) => <Button style={{backgroundColor:"rgb(54, 75, 182)",color:"#fff"}} onClick={() => navigate(`/editcourse/${params.row._id}`)} >
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
                        <h4>Courses</h4>
                        <div className="title_divider"></div>
                    </div>
                    <div className="header_btn">
                        <Link to="/course_categories" className="addAstroLink">Category</Link>
                        <Link to="/addcourse" className="addAstroLink">Add Course</Link>
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
                                    ...courses.initialState,
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


export default Courses