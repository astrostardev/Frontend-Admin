import "../../Stylesheets/Addastrologer.scss";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MetaData from "../../Components/MetaData";
function AddProductCategory() {
  const [category, setCategory] = useState({
    category:{name:""}
  }); 
  const navigate = useNavigate()

  const [isLoading, setIsloading] = useState(false);
  const { token } = useSelector((state) => state.authState);

  const onSubmit = async (e) => {
    e.preventDefault();
  
try{
  const response = await fetch(
    `${process.env.REACT_APP_URL}/api/v1/category/create`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(category),
    }
  );
  console.log('Response:', response);
  if (response.ok === false) {
    alert(" create category Failed");
  } else {
    alert("category Created Successful");
    navigate('/product_categories')
  }
}catch(err){
  toast(err, {
    type: 'error',
    position: toast.POSITION.TOP_RIGHT,
  });
}
   
  };
  return (
    <div className="infoContainer">
        <MetaData title={'Astro5Star-Manager'} />

      <main id="admin-addastro">
        <section className="astro-head">
          <div>
            <h3>Add Category</h3>
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
            

              <div className="twoCol">
                {/* FirstName */}

                <div className="mb-3">
                  <FloatingLabel controlId="category" label="category">
                    <Form.Control
                      type="text"
                      placeholder="category"
                      name="category"
                      required
                      value={category?.name?.category}
                      onChange={(e) => setCategory({ category:{name:e.target.value} })}
                    />
                  </FloatingLabel>
                </div>

                </div>
            </article>
            <div className="twoCol btnGroup">
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
                    <>Add</>
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

export default AddProductCategory;
