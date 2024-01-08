import { Link, useParams, useNavigate } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";
import MetaData from "../../Components/MetaData";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function EditLanguage() {
  const [language, setLanguage] = useState({
    language: "",
    
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const[disable,setDisable]=useState(true)
  const [isLoading, setIsloading] = useState(false);
  const { token } = useSelector((state) => state.authState);
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
    if (response.ok === false) {
      alert(" edit Language Failed");
    } else {
      alert("Language Updated");
      navigate("/languages");
    }
  };
  return (
    <div className="infoContainer">
      <main id="admin-addastro">
      <MetaData title={'Astro5Star-Manager'} />

        <section className="astro-head">
          <div>
            <h3>Edit Language</h3>
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
