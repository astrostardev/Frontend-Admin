import { Link, useParams, useNavigate } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";
import MetaData from "../../Components/MetaData";
import { FloatingLabel, Form, Dropdown, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function EditCourse() {
  const [course, setCourse] = useState({
    coursename: "",
    price: "",
    isActive: "",
    description: "",
    images: [],
    category: "",
  });

  const [errors, setErrors] = useState({
    coursename: "",
    price: "",
    isActive: "",
    description: "",
  });
  const [imageErr, setImageErr] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
   const [image, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState("");


  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [disable, setDisable] = useState(true);
  const { token } = useSelector((state) => state.authState);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/course/get/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      let data = await response.json();
      console.log(data);
      setIsloading(false);
      setCourse(data.course);
      console.log("usser", data.course);
    }
    fetchData();

  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   // Validation logic
  //   let error = "";
  //   if (name === "coursename" && value.length === 0) {
  //     error = "Course name is required";
  //   } else if (name === "price" && value.length === 0) {
  //     error = "Price is required";
  //   } else if (name === "isActive" && !value) {
  //     error = "Please select status";
  //   } else if (name === "description" && value.length === 0) {
  //     error = "Description is required";
  //   }
  //   if (name === "isActive") {
  //     setCourse({
  //       ...course,
  //       isActive: value === "true",
  //     });
  //   }

  //   setErrors({
  //     ...errors,
  //     [name]: error,
  //   });
  //   setCourse({
  //     ...course,
  //     [name]: value,
  //     // category: [
  //     //   {
  //     //     ...course.category[0],
  //     //     name: e.target.value,
  //     //   },
  //     // ],
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validation logic
    let error = "";
    if (name === "productname" && value.length === 0) {
      error = "Productname is required";
    } else if (name === "price" && value.length === 0) {
      error = "Price is required";
    } else if (name === "isActive" && !value) {
      error = "Please select status";
    } else if (name === "description" && value.length === 0) {
      error = "Description is required";
    }

    setErrors({
      ...errors,
      [name]: error,
    });
    console.log('images',images);
 
    setCourse({
      ...course,
      [name]: value,
     
  
    });
  };

  const onImagesChange = (e) => {
    const selectedPhoto = Array.from(e.target.files);

    selectedPhoto.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
        setImagesPreview((prevImages) => (prevImages ? [...prevImages, reader.result] : [reader.result]));

          setImages((prevImages) => [...prevImages, file]);

        }
      };
      reader.readAsDataURL(file);
    });
    // const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    //   if (!allowedTypes.includes(selectedPhoto.type)) {
    //     setImageErr(
    //       "File type not allowed. Please select a PDF or JPEG or PNG file."
    //     );
    //     return;
    //   }
    // Check file size (in bytes)
    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
    if (selectedPhoto.size > maxSizeInBytes) {
      setImageErr("File size exceeds the maximum allowed size (2MB).");
      return;
    }

    // Check the number of files
    if (image?.length >= 1) {
      setImageErr("You can only upload up to 1 files.");
      return;
    }

    // All checks passed, add the file to the state
    setImage(selectedPhoto);

    setImageErr("");
  };

  // const onImagesChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   files?.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //           setImagesPreview((prevImages) => (prevImages ? [...prevImages, reader.result] : [reader.result]));

  //         setImages((prevImages) => [...prevImages, file]);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);

    setImagesCleared(true);
  };
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/course_category/show`,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      // console.log(response);
      let data = await response.json();
      console.log(data);
      setIsloading(false);
      setCategories(data.courseCategories);
      console.log(categories);
    }
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    // if (Object.values(errors).every((error) => !error)) {
    //   // No errors, submit the data
    //   // console.log('Form data submitted:', astrologers);
    const updatedDetails = new FormData();
    updatedDetails.append("coursename", course.coursename);
    updatedDetails.append("price", course.price);
    updatedDetails.append("isActive", course.isActive);
    updatedDetails.append("category", course.category);
    updatedDetails.append("description", course.description);
    images?.forEach((image) => {
      updatedDetails.append("images", image);
    });

    console.log("updated details", updatedDetails);

    const response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/course/update/${id}`,
      {
        method: "PUT",
        body: updatedDetails,
      }
    );
    console.log(response);
    if (response.ok === false) {
      alert("Updated failed");
      setIsloading(false);
    } else {
      alert("Updated successfully");
      navigate("/courses");
    }
    // } else {
    //   // There are errors, handle accordingly (e.g., display an error message)
    //   console.log("Form submission failed due to validation errors.");
    //   setIsloading(false);
    // }
    // setCertificates([])
    // setProfilePhoto(null)
  };
  const handleImageSelect = (selectedImage) => {
    setCourse({
      ...course,
      images: selectedImage,
    });
    console.log("selected Category", selectedCategory);
  };


  const handleDropdownSelect = (selectedCategory) => {
    setCourse({
      ...course,
      category: selectedCategory,
    });
    console.log("selected Category", selectedCategory);
  };

  return (
    <div className="infoContainer">
      <main id="admin-addastro">
        <MetaData title={"Astro5Star-Manager"} />

        <section className="astro-head">
          <div>
            <h3>Edit Course</h3>
            <div
              style={{
                height: "3px",
                width: "40px",
                backgroundColor: "#0042ae",
                borderRadius: "10px",
                marginTop: "3px",
              }}
            ></div>
          </div>
        </section>
        <section className="my-4">
          <Form
            className="reg-form"
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            <article className="basicDetails">
              <div className="threeCol">
                {/* CourseName */}

                <div className="mb-3">
                  <FloatingLabel controlId="coursename" label="Name">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="coursename"
                      value={course?.coursename}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.coursename && errors.coursename.message}
                  </p>
                </div>
                <div className="mb-3">
                  <FloatingLabel controlId="price" label="Price">
                    <Form.Control
                      type="text"
                      placeholder="Price"
                      name="price"
                      value={course?.price}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {/* {errors.price && errors.price.message} */}
                  </p>
                </div>

                <div className="mx-2">
                  <Form.Label className="me-3" style={{ display: "block" }}>
                    IsActive
                  </Form.Label>
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="isActive"
                    inline
                    id="inline-radio-1"
                    value={true}
                    checked={course?.isActive == true}
                    onChange={handleChange}
                  />
                  <Form.Check
                    // onClick={selectedEvent}
                    type="radio"
                    label="No"
                    name="isActive"
                    inline
                    id="inline-radio-2"
                    value={false}
                    checked={course?.isActive == false}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="two">     
                <div className="mb-3">
                  <FloatingLabel controlId="images" label="Image">
                    <Form.Control
                      type="file"
                      placeholder="Image"
                      name="images"
                      eventKey={(e)=>setSelectedImage(e.target.value)}
                      onClick={handleImageSelect}
                      onChange={onImagesChange}
                      accept="image/png, image/jpeg"
                      multiple
                    />
                  </FloatingLabel>

                  {imageErr && <p style={{ color: "red" }}>{imageErr}</p>}
                </div>
                {/* {existing Images} */}
                <div className="mb-4">
                <div
                  className="img-preview"
                  style={{
                    width: "200px",
                    position: "absolute",
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                  }}
                >    <img
                  // src={ course?.images[0]?.image ? course?.images[0]?.image : images}
                 src={selectedImage ? selectedImage : course?.images[0]?.image}
                  key={image}
                  alt=""
                  className="pre-img"
                  style={{ maxWidth: "100%",height:"60px" }}
                />
                  
                  {/* {imagesPreview?.map((image) => (
                    <img
                    src={image}
                      // src={selectedImage.image ? selectedImage.image : course?.images[0]?.image}
                      key={image}
                      alt=""
                      className="pre-img"
                      style={{ maxWidth: "100%",height:"60px" }}
                    />
                  ))}
                  {imagesPreview.length > 0 && (
                    <button
                      id="delete-btn"
                      className="btns"
                      onClick={clearImagesHandler}
                      style={{ cursor: "pointer", width: "75px" }}
                    >
                      <i
                        className="fa fa-trash"
                        style={{ marginLeft: "-1rem", marginRight: "1rem" }}
                      ></i>
                      Delete
                    </button>
                  )} */}
                </div>
                </div>
              </div>

              <div className="threeCol">
                <div className="mb-3">
                  <FloatingLabel
                    controlId="description"
                    label="Description"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={course?.description}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>

                <div className="mb-3">
                  <FloatingLabel
                    controlId="category"
                    label="category"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="category"
                      name="category"
                      disabled="baned"
                      value={
                        selectedCategory ? selectedCategory : course?.category
                      }
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                  </FloatingLabel>
                </div>

                <div className="mb-3 ">
                  <Dropdown onSelect={handleDropdownSelect}>
                    <Dropdown.Toggle id="dropdown-basic">
                      Category
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: "300px" }}>
                      {categories?.map((cat, index) => (
                        <Dropdown.Item
                          key={index}
                          name="category"
                          eventKey={cat.category[0]?.name}
                        >
                          {cat.category[0]?.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </article>
            <div className="twoCol btnGroup">
              <div style={{ display: "flex", gap: "20px" }}>
                <input
                  type="button"
                  className="btns"
                  onClick={() => setDisable(!disable)}
                  value="Edit"
                />
                <button
                  type="submit"
                  id="submitBtn"
                  className="btns"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="grow" className="text-center" />
                  ) : (
                    <>Submit</>
                  )}
                </button>
              </div>
            </div>
          </Form>
        </section>
      </main>
    </div>
  );
}

export default EditCourse;
