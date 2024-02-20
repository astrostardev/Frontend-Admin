import { Link, useParams, useNavigate } from "react-router-dom";
import "../../Stylesheets/Addastrologer.scss";
import MetaData from "../../Components/MetaData";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Settings() {
  const [bonus, setBonus] = useState(null);
  const [welcomeBonus, setWelcomeBonus] = useState(null);
  const [refBonus, setRefBonus] = useState(null);
  const [refAmount, setRefAmount] = useState(null);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const { token } = useSelector((state) => state.authState);
  // get single data
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/bonus/get`,
        {
          method: "GET",
        }
      );
      // console.log(response);
      let data = await response.json();
      console.log(data);
      setIsloading(false);
      setBonus(data.bonus);

      console.log("usser", data.language);
    }
    fetchData();
  }, []);
  const id = bonus?.map((data) => data._id);
  console.log("id", id);
  //setting value to state
  useEffect(() => {
    const id = bonus?.map((data) => data._id);

    if (id) {
      bonus.map((bonus) => {
        setWelcomeBonus(bonus.welcomeBonus);
        setRefBonus(bonus.refBonus);
        setRefAmount(bonus.referralAmount);
      });
    }
  }, [bonus]);
  //  create bonus  function
  const onSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      welcomeBonus: welcomeBonus,
      refBonus: refBonus,
      referralAmount: refAmount,
    };
    const response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/bonus/create`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(requestBody),
      }
    );
    if (!response.ok) {
      console.error("Failed to create language. Status:", response.status);

      // Get detailed error message as text
      const errorText = await response.text();
      console.error("Error Text:", errorText);
      toast("language already exists", {
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast("language updated successfully", {
        type: "success",
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/bonus");
    }
  };
  //edit bonus func
  const onUpdate = async (e) => {
    e.preventDefault();
    const requestBody = {
      welcomeBonus: welcomeBonus,
      refBonus: refBonus,
      referralAmount: refAmount,
    };
    const response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/bonus/edit/${id}`,
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
      console.error("Failed to create language. Status:", response.status);

      // Get detailed error message as text
      const errorText = await response.text();
      console.error("Error Text:", errorText);
      toast("language already exists", {
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast("language updated successfully", {
        type: "success",
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/bonus");
    }
  };
  return (
    <div className="infoContainer">
      <main id="admin-addastro">
        <MetaData title={"Astro5Star-Manager"} />

        <section className="astro-head">
          <div>
            <h3>Settings</h3>
            <div className="title_divider"></div>
          </div>
        </section>
        <section className="my-4">
          <Form
            className="reg-form"
            onSubmit={id == "" ? onSubmit : onUpdate}
            encType="multipart/form-data"
          >
            <article className="basicDetails">
              <div className="threeCol">
                {/* FirstName */}
                <>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="welcomeBonus"
                      label="Welcome Bonus"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Welcome Bonus"
                        name="welcomeBonus"
                        value={welcomeBonus}
                        onChange={(e) => setWelcomeBonus(e.target.value)}
                        disabled={id == "" ? !disable : disable}
                      />
                    </FloatingLabel>
                  </div>

                  <div className="mb-3">
                    <FloatingLabel controlId="refBonus" label="Referral Bonus">
                      <Form.Control
                        type="text"
                        placeholder="Referral Bonus"
                        name="refBonus"
                        value={refBonus}
                        onChange={(e) => setRefBonus(e.target.value)}
                        disabled={id == "" ? !disable : disable}
                      />
                    </FloatingLabel>
                  </div>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="refAmount"
                      label="Referral Amount"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Referral Amount"
                        name="referralAmount"
                        value={refAmount}
                        onChange={(e) => setRefAmount(e.target.value)}
                        disabled={id == "" ? !disable : disable}
                      />
                    </FloatingLabel>
                  </div>
                </>
              </div>
            </article>
            <div className="twoCol btnGroup">
              <div style={{ display: "flex", gap: "20px" }}>
                {id != "" ? (
                  <input
                    type="button"
                    className="btns"
                    onClick={() => setDisable(!disable)}
                    value="Edit"
                  />
                ) : (
                  ""
                )}
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

export default Settings;
