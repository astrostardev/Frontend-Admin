import React, { useState, useEffect } from 'react';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "../Stylesheets/Login.scss"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from '../Assests/Logo.png'
import { toast } from 'react-toastify'
import { clearAuthError, login } from '../Actions/adminActions';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.authState)
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))

  }


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/astrologers')
    }
    if (error) {
      alert(error)
      // toast(error, {
      //   position: toast.POSITION.TOP_RIGHT,
      //   type: 'error',
      //   onOpen: () => { dispatch(clearAuthError) }
      // })
      return
    }

  }, [error, isAuthenticated, dispatch])


  const reset = () => {
    setEmail('');
    setPassword('')
  }


  return (
    // <div className="admin_login">
    //   <div className='card header'>
    //     <div><img src={logo} alt="" /></div>
    //   </div>

    //   <div className="card custom_card">
    //     <div>
    //       <Form onSubmit={submitHandler} className='login_form' >
    //         <h4>Login</h4>
    //         <div className="my-4">
    //           <FloatingLabel
    //             controlId="floatingInput"
    //             label="Email"
    //             className="mb-3"
    //             style={{ width: "80%" }}
    //           >
    //             <Form.Control
    //               type="text"
    //               placeholder="Email"
    //               defaultValue=""
    //               value={email}
    //               name='email'
    //               onChange={e => setEmail(e.target.value)}

    //             />
    //           </FloatingLabel>
    //           <FloatingLabel
    //             controlId="floatingInput"
    //             label="Password"
    //             className="mb-3"
    //             style={{ width: "80%" }}
    //           >
    //             <Form.Control
    //               type="password"
    //               placeholder="Password"
    //               defaultValue=""
    //               value={password}
    //               name='password'
    //               onChange={e => setPassword(e.target.value)}

    //             />
    //           </FloatingLabel>
    //         </div>
    //         <Button
    //           type="submit"
    //           style={{ backgroundColor: "#EE721B", border: "transparent" }}>
    //           Submit
    //         </Button>
    //       </Form>
    //     </div>
    //     </div>
    //    </div>

    <main id='admin-login'>
      <section className='login-nav'>
        <img src={logo} alt='logo' />
      </section>
      <section className='login-form'>
        <div className='p-4'>
          <h3 className='fs-3' style={{ letterSpacing: "3px" }}>Login</h3>
          <Form onSubmit={submitHandler}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3 mt-4 input"
            >
              <Form.Control type="email" placeholder="name@example.com" value={email}
                name='email'
                onChange={e => setEmail(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 input">
              <Form.Control type="password" placeholder="Password" value={password}
                name='password'
                onChange={e => setPassword(e.target.value)} />
            </FloatingLabel>
            <Button type='submit' disabled={loading} style={{ backgroundColor: "#EE721B", border: "transparent" }} className='input mb-4'>Submit</Button>
          </Form>
        </div>
      </section>
    </main>
  );
}
export default Login;