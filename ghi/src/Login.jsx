import {useAuthContext} from "@galvanize-inc/jwtdown-for-react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useRef } from "react";


const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSubmitted, setLoginSubmitted] = useState(false);
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const { login } = useToken();
  const { token } = useAuthContext();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, password)


  };

  useEffect(() => {
    const fetchToken = async (e) => {
      const tokenUrl = `http://localhost:8000/token`;
      const fetchConfig = {
        credentials: 'include'
      };

      const response = await fetch(tokenUrl, fetchConfig);
      console.log(response);
      if (response.ok) {
          navigate('/login/welcomeback');
      } else {
        setIncorrectLogin(true);
      }
    };

    fetchToken()
  },
  [handleSubmit(), token])

  let messageClasses = 'alert alert-danger d-none mb-0';
  let formClasses = '';
  if (incorrectLogin) {
    messageClasses = 'alert alert-danger mb-0';
    formClasses = 'd-none';
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => { navigate("/"); }}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          margin: '10px',
        }}
      >
        Back to Homepage
      </button>
    <div style={containerStyle}>
    <div className="card text-bg-light mb-3">
      <div className="offset-3 col-6">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input style={{ marginBottom: '15px' }} type="submit" value="Login" />
          </div>
          <div className={messageClasses} id="failure-message">
            Incorrect username or password...
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
  </div>
  );
};

export default LoginForm;
