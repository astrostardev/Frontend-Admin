import { Link, useParams, useNavigate } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";
import MetaData from "../../Components/MetaData";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function EditPackage() {
  const [packages, setPackages] = useState({
    packagePrice: "",
    packageName: "",
    packageDetail: "",
    isActive: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const { token } = useSelector((state) => state.authState);
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/package/getPackage/${id}`,
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
      setPackages(data.package);
      console.log("usser", data.package);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackages({
      ...packages,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
        packageName: packages.packageName,
        fixedPrice: packages.fixedPrice,
        packageDetail: packages.packageDetail,
        isActive: packages.isActive,
      };
    const response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/package/update/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(requestBody),
      }
    );
    if (response.ok === false) {
      alert(" edit package Failed");
    } else {
      alert("Package Updated");
      navigate("/packages");
    }
  };
  return (
    <div className="infoContainer">
        <MetaData title={'Astro5Star-Manager'} />

      <main id="admin-addastro">
        <section className="astro-head">
          <div>
            <h3>Edit Packages</h3>
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
                      placeholder="Price"
                      name="fixedPrice"
                      value={packages?.fixedPrice}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>

                {/* lastName */}
                <div className="mb-3">
                  <FloatingLabel controlId="packageName" label="PackageName">
                    <Form.Control
                      type="text"
                      placeholder="Package name"
                      name="packageName"
                      value={packages?.packageName}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>

                <div className="mb-3">
                  <FloatingLabel
                    controlId="packageDetail"
                    label="Package Detail"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Package Detail"
                      name="packageDetail"
                      value={packages?.packageDetail}
                      onChange={handleChange}
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
                    value="true"
                    id="inline-radio-1"
                    checked={packages?.isActive}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="isActive"
                    inline
                    value="false"
                    id="inline-radio-2"
                    checked={packages && !packages.isActive}
                    onChange={handleChange}
                  />{" "}
                </div>
              </div>
            </article>
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
            </div>
          </Form>
        </section>
      </main>
    </div>
  );
}

export default EditPackage;
