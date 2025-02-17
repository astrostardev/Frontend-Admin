import "../../Stylesheets/Addastrologer.scss";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../../Components/MetaData";
import { useForm } from "react-hook-form";

function AddPackages() {
  const [packageName, setPackageName] = useState("");
  const [fixedPrice, setfixedPrice] = useState("");
  const [packageDetail, setPackageDetail] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const { token } = useSelector((state) => state.authState);

  const reset = () => {
    setPackageName("");
    setfixedPrice("");
    setPackageDetail("");
  };

  // create packages

  const onSubmit = async (e) => {
    e.preventDefault();
    const packageDetails = {
      fixedPrice: fixedPrice,
      packageName: packageName,
      packageDetail: packageDetail,
      isActive: isActive,
    };
    console.log(packageDetails);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/package/create`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(packageDetails),
        }
      );
      if (response.status === 409) {
        toast("Package already exist", {
          type: "error",
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        alert("Package Created Successful");
        reset();
      }
    } catch (err) {
      toast(err, {
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="infoContainer">
      <MetaData title={"Astro5Star-Manager"} />

      <main id="admin-addastro">
        <section className="astro-head">
          <div>
            <h3>Add Packages</h3>
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
              <p className="title_addastro">Basic details</p>

              <div className="threeCol">
                {/* FirstName */}

                <div className="mb-3">
                  <FloatingLabel controlId="packagePrice" label="Price">
                    <Form.Control
                      type="text"
                      placeholder="Price"
                      name="packagePrice"
                      required
                      value={fixedPrice}
                      onChange={(e) => setfixedPrice(e.target.value)}
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
                      required
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
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
                      name="PackageDetail"
                      required
                      value={packageDetail}
                      onChange={(e) => setPackageDetail(e.target.value)}
                    />
                  </FloatingLabel>
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
                    checked={isActive}
                    onChange={() => setIsActive(true)}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="isActive"
                    inline
                    id="inline-radio-2"
                    checked={!isActive}
                    onChange={() => setIsActive(false)}
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

export default AddPackages;
