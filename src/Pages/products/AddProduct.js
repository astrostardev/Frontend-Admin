import { useNavigate } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";
import React from "react";
import {toast} from 'react-toastify';

import {
  FloatingLabel,
  Form,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import MetaData from "../../Components/MetaData";
function AddProduct() {
  const [image, setImage] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [imageErr, setImageErr] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const navigate = useNavigate();

  // show available categories
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/category/show`,
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
      console.log("response", data);
      setIsloading(false);
      setCategories(data.categories);
      console.log(categories);
    }
    fetchData();
  }, []);

  const { token } = useSelector((state) => state.authState);

  
  // uploading file
  const onImagesChange = (e) => {
    const selectedPhoto = Array.from(e.target.files);

    selectedPhoto.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
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
  // delete image
  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);

    setImagesCleared(true);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const validation = {
    coursename: {
      required: {
        value: true,
        message: "Enter firstname",
      },
    },
    category: {
      required: {
        value: true,
        message: "select Category",
      },
    },

    description: {
      validate: (value) => {
        if (value.split(" ").length > 30) {
          return "Describe in 30 Words";
        }
      },
    },
  };
  // create new product
  const onSubmit = async (data) => {
    setIsloading(true);

    const productDetails = new FormData();

    Object.keys(data).forEach((key) => {
      productDetails.set(key, data[key]);
    });

    images.forEach((image) => {
      productDetails.set("images", image);
    });

    const response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/product/create`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",

        body: productDetails,
      }
    );
    const jsonResponse = await response.json();
    console.log("res", jsonResponse);
    if (!response.ok) {
      console.error('Failed to create category. Status:', response.status);

      // Get detailed error message as text
      // const errorText = await response.text();
      // console.error('Error Text:', errorText);  
      toast('Product Name exist', {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast("Product created successfully", {
        type: 'success',
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/products');
    }
  
    setIsloading(false);

    setImages([]);
  };

  return (
    <div className="infoContainer">
      <MetaData title={"Astro5Star-Manager"} />

      <main id="admin-addastro">
        <section className="astro-head">
          <div>
            <h3>Add Product</h3>
            <div className="title_divider"></div>
          </div>
        </section>
        <section className="my-4">
          <Form
            className="reg-form"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <article className="basicDetails">
              <div className="threeCol">
                {/* FirstName */}

                <div className="mb-3">
                  <FloatingLabel controlId="productname" label="Name">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="productname"
                      {...register("productname", validation.coursename)}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.productname && errors.productname.message}
                  </p>
                </div>
                <div className="mb-3">
                  <FloatingLabel controlId="price" label="Price">
                    <Form.Control
                      type="text"
                      placeholder="Price"
                      name="price"
                      {...register("price", validation.price)}
                    />
                  </FloatingLabel>
                  <p className="errormsg">
                    {errors.price && errors.price.message}
                  </p>
                </div>

                <div className="mx-2">
                  <Form.Label className="me-3" id="display_btn">
                    IsActive
                  </Form.Label>
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="isActive"
                    inline
                    id="inline-radio-1"
                    value="true"
                    defaultChecked
                    {...register("isActive")}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="isActive"
                    inline
                    id="inline-radio-2"
                    value="false"
                    {...register("isActive")}
                  />
                </div>
              </div>

              <div></div>
              <div className="threeCol">
                <div className="mb-3">
                  <FloatingLabel controlId="image" label="Image">
                    <Form.Control
                      type="file"
                      placeholder="Image"
                      name="image"
                      onChange={onImagesChange}
                      accept="image/png, image/jpeg"
                    />
                  </FloatingLabel>

                  {imageErr && <p style={{ color: "red" }}>{imageErr}</p>}
                </div>

                <FloatingLabel
                  controlId="description"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    {...register("description")}
                  />
                </FloatingLabel>

                <div className="mb-3 ">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      Category
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="drop_menu">
                      {categories?.map((cat, index) => (
                        <>
                          <div
                            key={index}
                            className="customDrop"
                          >
                            <Form.Check
                              type="checkbox"
                              name="category"
                              value={cat?.category[0]?.name}
                              key={index}
                              onChange={(e) => setCategories(e.target.value)}
                              {...register("category")}
                            />{" "}
                            {cat.category[0]?.name}
                            {/* <Dropdown.Item className="customDrop" value={category}  {...register("category", validation.category)}>
                    </Dropdown.Item> */}
                          </div>
                        </>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <p className="errormsg">
                    {errors.category && errors.category.message}
                  </p>
                </div>
              </div>

              <div className="twoCol">
                <div
                  className="img-preview"
                  style={{
                    width: "100px",
                    position: "absolute",
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                  }}
                >
                  {imagesPreview.map((image) => (
                    <img
                      src={image}
                      key={image}
                      alt=""
                      className="pre-img"
                      style={{ maxWidth: "100%" }}
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
                  )}
                </div>
              </div>
            </article>

            <article className="astroDetails my-3">
              <div className="btnGroup">
                <div>
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
                <div>
                  <button
                    type="reset"
                    id="clearBtn"
                    className="btns"
                    disabled={isLoading}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </article>
          </Form>
        </section>
      </main>
    </div>
  );
}

export default AddProduct;
