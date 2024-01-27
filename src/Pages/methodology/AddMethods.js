import "../../Stylesheets/Addastrologer.scss";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MetaData from "../../Components/MetaData";
function AddMethods() {
  const [category, setCategory] = useState({
    category:{name:""}
  });
  const navigate = useNavigate()
  const [isLoading, setIsloading] = useState(false);
  const { token } = useSelector((state) => state.authState);




const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/method/create`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify(category),
        }
      );
  
      if (!response.ok) {
        console.error('Failed to create category. Status:', response.status);
  
        // Get detailed error message as text
        const errorText = await response.text();
        console.error('Error Text:', errorText);  
        toast('category already Registered', {
          type: 'error',
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast("Category created successfully", {
          type: 'success',
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate('/methods');
      }
    } catch (error) {
      // Handle errors here
      console.error('An error occurred:', error);
  
      // Display error using toast or alert
      toast(error.response?.data?.message || 'An error occurred', {
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
            <h3>Add Methodology</h3>
            <div className="title_divider" ></div>
          </div>
        </section>
        <section className="my-4">
          <Form
            className="reg-form"
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            <article className="basicDetails">
              <p className="title_addastro">
                Basic details
              </p>

              <div className="twoCol">
                {/* FirstName */}

                <div className="mb-3">
                  <FloatingLabel controlId="category" label="Astrology">
                    <Form.Control
                      type="text"
                      placeholder="Astrology"
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

export default AddMethods;
