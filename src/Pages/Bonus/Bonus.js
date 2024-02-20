import { Link, useNavigate } from "react-router-dom";
import "../../Stylesheets/Astrologers.scss";
import { useEffect, useState, useCallback } from "react";
import { Button, Badge, Spinner } from "react-bootstrap";
import { Box } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import React from "react";
import  '../../Stylesheets/bonus.css'
import MetaData from "../../Components/MetaData";
import { useSelector } from "react-redux";
function Bonus() {
  const [isLoading, setIsloading] = useState(true);
  const [welcomeBonus, setWelcomeBonus] = useState(null);
  const [welcomeWithRef, setWelcomeWithRef] = useState(null);
  const[referralBonus,setReferralBonus] = useState(null);
  const[refCount,setRefCount]=useState(null)
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.authState);
  // displaying users
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/user/bonus`,
        {
          method: "GET",
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      let data = await response.json();
      console.log(data);
      setIsloading(false);
      setWelcomeBonus(data.users);
      console.log("users", welcomeBonus);
      setWelcomeWithRef(data.refusers);
      console.log("refusers", data.refusers);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/user/referral_bonus`,
        {
          method: "GET",
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      let data = await response.json();
      console.log(data);
      setIsloading(false);
      setReferralBonus(data.users);
  

    }
    fetchData();
  }, []);
  return (
    <div className="infoContainer">
      <MetaData title={"Astro5Star-Manager"} />

      <main id="admin-astro">
        <section className="astro-head">
          <div>
            <h4>Bonus</h4>
            <div className="title_divider"></div>
          </div>
          <div>
            <Link to="/add_bonus" className="addAstroLink">Settings</Link>
          </div>
        </section>
        {isLoading ? (
          <div className="loading">
            <Spinner
              animation="grow"
              variant="warning"
              className="text-center"
            />
          </div>
        ) : (
          <section className="my-4" id="cate-detail">
          

            <table class="table" id="trans_tbl">
              <tbody style={{ display: "flex" }}>
                <tr className="table_row">
                  <div className="table_col">
                    <th>Welcome Bonus</th>
                    {welcomeBonus?.map((data,index) => (
                        <>
                   
                      <td className="wallet-container" id="data">
                      <p >{index+1}</p>  <p >{data?.name}</p>
                      </td>
                        </>
      
                    ))}
                  </div>
                </tr>
                <tr className="table_row">
                  <div className="table_col">
                    <th>Welcome Bonus (Referral)</th>
                    {welcomeWithRef?.map((data,index) => (
                         <td className="wallet-container" id="data">
                         <p >{index+1}</p>  <p >{data?.name}</p>
                         </td>
                    ))}
                  </div>
                </tr>
                <tr className="table_row">
                  <div className="table_col">
                    <th>Referral Bonus</th>
                    {referralBonus?.map((data,index) => (
                         <td className="wallet-container" id="data">
                         <p >{index+1}</p><p>{data?.name}({data.referedUsersCount})</p>
                         </td>
                    ))}
                  </div>
                </tr>
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}

export default Bonus;
