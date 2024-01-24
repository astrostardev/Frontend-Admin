import { Link, useParams, useNavigate } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";
import MetaData from "../../Components/MetaData";
import { FloatingLabel, Form, Dropdown, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RiCloseCircleLine } from "react-icons/ri";
import {toast} from 'react-toastify';

function EditProduct() {

  const [product, setProduct] = useState();
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [disable, setDisable] = useState(true);
  const { token } = useSelector((state) => state.authState);
  const [categories, setCategories] = useState(null);

//  get product detail

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/product/get/${id}`,
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
      setProduct(data.product);
    }
    fetchData();
  }, []);

//  set product detail to states

    useEffect(() => {
    if (product?._id) {
      setProductname(product.productname);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);

      let images = [];
      product.images.forEach((image) => {
        images.push(image.image);
      });
      setImagesPreview(images);
    }
  }, [product]);

// upload image

  const onImagesChange = (e) => {
    const selectedPhoto = Array.from(e.target.files);

    selectedPhoto.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState == 2) {
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
    if (images?.length >= 1) {
      setImageErr("You can only upload up to 1 files.");
      return;
    }

    // All checks passed, add the file to the state
    // setImage(selectedPhoto);

    setImageErr("");
  };

  // delete images

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };
// display categories

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
//  select category function

const handleDropdownSelect = (selectedCategory) => {
  setProduct({
    ...product,
    category: selectedCategory,
  });
  console.log("selected Category", selectedCategory);
};
  // form submit function

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    if (productname && price && description && images.length === 0) {
      toast('Please fill all the fields', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'error',
      });

    } 
try{
  const updatedDetails = new FormData();
  updatedDetails.append("coursename", productname);
  updatedDetails.append("price", price);
  updatedDetails.append("isActive", isActive);
  updatedDetails.append("category", category);
  updatedDetails.append("description", description);

  images?.forEach((image) => {
    updatedDetails.append("images", image);
  });
  updatedDetails.append("imagesCleared", imagesCleared);

  console.log("updated details", images);

  const response = await fetch(
    `${process.env.REACT_APP_URL}/api/v1/product/update/${id}`,
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
    navigate("/products");
  }
}
   
    catch (error) {
      console.error("Error during course update:", error);
    
      // Check if the error object has a response or data property
      const errorMessage = error.response?.data?.message || "Fill all the fields"
    
      toast(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        type:'error'
      });
    } finally {
      setIsloading(false);
      setImages([])

    }
  };


  return (
    <div className="infoContainer">
      <main id="admin-addastro">
        <MetaData title={"Astro5Star-Manager"} />

        <section className="astro-head">
          <div>
            <h3>Edit Product</h3>
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
                      onChange={(e) => setProductname(e.target.value)}
                      value={productname}
                    disabled={disable}

                    />
                  </FloatingLabel>
                 
                </div>
                <div className="mb-3">
                  <FloatingLabel controlId="price" label="Price">
                    <Form.Control
                      type="text"
                      placeholder="Price"
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    disabled={disable}

                    />
                  </FloatingLabel>
              
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
                    onChange={(e) => setIsActive(e.target.value)}
                    value={isActive}
                    checked={product?.isActive == true}
                    disabled={disable}

                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="isActive"
                    inline
                    id="inline-radio-2"
                    onChange={(e) => setIsActive(e.target.value)}
                    value={!isActive}
                    checked={product?.isActive == false}
                    disabled={disable}
                  />
                </div>
              </div>

              <div className="threeCol">
                <div className="mb-3">
                  <FloatingLabel controlId="images" label="Image">
                    <Form.Control
                      type="file"
                      placeholder="Image"
                      name="images"
                      disabled={disable}
                      onChange={onImagesChange}
                      accept="image/png, image/jpeg"
                      multiple
                      required
                    />
                  </FloatingLabel>

                  {imageErr && <p style={{ color: "red" }}>{imageErr}</p>}
                </div>
                <div className="mb-3">
                  {imagesPreview.map((image, index) => (
                    <div
                      key={index}
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <img
                        src={image}
                        alt=""
                        key={image}
                        style={{ width: "75px", height: "50px" }}
                        disabled={disable}
                      />

                      <RiCloseCircleLine
                        className="trash"
                        onClick={() => clearImagesHandler()}
                        disabled={disable}
                      />
                    </div>
                  ))}
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
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    disabled={disable}
                 

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
                        selectedCategory ? selectedCategory : product?.category
                      }
                      onChange={(e) => setSelectedCategory(e.target.value)}
                

                    />
                  </FloatingLabel>
                </div>

                <div className="mb-3 ">
                      
                  <Dropdown onSelect={handleDropdownSelect} 
                     >
                    <Dropdown.Toggle id="dropdown-basic" disabled={disable}>
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

export default EditProduct;
