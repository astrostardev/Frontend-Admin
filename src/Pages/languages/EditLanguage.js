import { Link, useParams, useNavigate } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";
import MetaData from "../../Components/MetaData";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


function EditLanguage() {
  const [language, setLanguage] = useState({
    language: "",
    
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const[disable,setDisable]=useState(true)
  const [isLoading, setIsloading] = useState(false);
  const { token } = useSelector((state) => state.authState);
  // get single language
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/language/get/${id}`,
        {
          method: "GET",
        
        }
      );
      // console.log(response);
      let data = await response.json();
      console.log(data);
      setIsloading(false);
      setLanguage(data.language);
      console.log("usser", data.language);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setLanguage({
      ...language,
      language: [
        {
          ...language.language[0],
          name: e.target.value,
        },
      ],
    });
  };
  // edit language function
  const onSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
       language:language
      };
    const response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/language/update/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(requestBody),
      }
    );
    if (!response.ok) {
      console.error('Failed to create language. Status:', response.status);

      // Get detailed error message as text
      const errorText = await response.text();
      console.error('Error Text:', errorText);  
      toast('language already exists', {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast('language updated successfully', {
        type: 'success',
        position: toast.POSITION.TOP_RIGHT,
      });
      // alert("language updated successfully");
      navigate('/languages');
    }
  };
  return (
    <div className="infoContainer">
      <main id="admin-addastro">
      <MetaData title={'Astro5Star-Manager'} />

        <section className="astro-head">
          <div>
            <h3>Edit Language</h3>
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
                  <FloatingLabel controlId="language" label="Language">
                    <Form.Control
                      type="text"
                      placeholder="Language"
                      name="language"
                      value={language?.language[0]?.name}
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

export default EditLanguage;
