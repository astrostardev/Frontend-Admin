import { Link, useParams, useNavigate } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";

import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function EditMethod() {
  const [methods, setMethods] = useState({
    category:{name:""}
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const[disable,setDisable]=useState(true)
  const { token } = useSelector((state) => state.authState);
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/method/get/${id}`,
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
      setMethods(data.category);
      console.log("usser", data.category);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setMethods({
      ...methods,
      category: [
        {
          ...methods.category[0],
          name: e.target.value,
        },
      ],
    });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
       category:methods
      };
    const response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/method/update/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(requestBody),
        
      }

    );
    if (response.ok === false) {
      alert(" edit package Failed");
    } else {
      alert("Category Updated");
      navigate("/methods");
    }
  };
  return (
    <div className="infoContainer">
      <main id="admin-addastro">
        <section className="astro-head">
          <div>
            <h3>Edit Methodology</h3>
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
                {/* FirstName */}

                <div className="mb-3">
                  <FloatingLabel controlId="packagePrice" label="Price">
                    <Form.Control
                      type="text"
                      placeholder="category"
                      name="category"
                      value={methods?.category[0]?.name}
                      onChange={handleChange}
                      disabled={disable}
                    />
                  </FloatingLabel>
                </div>

             
              </div>
              
                
            </article>
            <div className="twoCol btnGroup">
              <div style={{display:"flex",gap:"20px"}}>
              <input type="button"
                  className="btns"
                  onClick={()=>setDisable(!disable)}
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

export default EditMethod;
