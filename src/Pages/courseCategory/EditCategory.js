import { Link, useParams, useNavigate } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";
import MetaData from "../../Components/MetaData";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function EditCategory() {
  const [methods, setMethods] = useState({
    category:{name:""}
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const[disable,setDisable]=useState(true)
  const { token } = useSelector((state) => state.authState);

  // get single category
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/course_category/get/${id}`,
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
      setMethods(data.courseCategory);
      console.log("usser", data.courseCategory);
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
  // category update function
  const onSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
       category:methods
      };
    const response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/course_category/update/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(requestBody),
        
      }

    );
    const jsonResponse = await response.json();
    console.log("res", jsonResponse);
    if (!response.ok) {
      console.error('Failed to create category. Status:', response.status);
  
      // Get detailed error message as text
      // const errorText = await response.text();
      // console.error('Error Text:', errorText);  
      toast('CourseCategory Name exist', {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast('CourseCategory updated successfully', {
        type: 'success',
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/course_categories');
    }
  };
  return (
    <div className="infoContainer">
      <main id="admin-addastro">
      <MetaData title={'Astro5Star-Manager'} />

        <section className="astro-head">
          <div>
            <h3>Edit Methodology</h3>
            <div className="title_divider"></div>
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
                  <FloatingLabel controlId="category" label="Category">
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

export default EditCategory;
