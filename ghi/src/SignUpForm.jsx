import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const centerVertically = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const initialAccountData = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  email: "",
  icon_id: ""
}

function SignUpForm() {
  const navigate = useNavigate();

  const [icons, setIcons] = useState([]);
  const [accountFormData, setAccountFormData] = useState(initialAccountData);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const { login } = useToken();

  const fetchData = async () => {
    const url = 'http://localhost:8000/api/icons';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setIcons(data);
    } else {
      throw new Error('Failed to retrieve icons data')
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    setAccountFormData({
      ...accountFormData,
      [e.target.name]: e.target.value
    })
  }

  const passwordConfirmChange = (e) => {
    setPasswordConfirm(
      e.target.value
    )
  }

  let warningClasses = 'alert alert-warning d-none mb-0';
  let passwordClasses = '';
  if (passwordMismatch) {
    warningClasses = 'alert alert-warning mb-0';
    passwordClasses = 'd-none';
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordConfirm === accountFormData.password) {
      const accountUrl = 'http://localhost:8000/api/accounts'

      const accountFetchConfig = {
        method: "post",
        body: JSON.stringify(accountFormData),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const account_response = await fetch(accountUrl, accountFetchConfig);
      if (account_response.ok) {
        login(accountFormData.username, accountFormData.password);
        setAccountFormData(initialAccountData);
        setPasswordConfirm('');
        setCreatedAccount(true);

        document.getElementById('password-confirm').value = ''
        navigate("/");
      } else {
        throw new Error('Failed to create account')
      }
    }
    else {
      setPasswordMismatch(true);
      throw new Error('Passwords did not match up')
    }
  }

  return (
    <div style={{ position: 'relative', ...containerStyle }}>
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
      <div style={{ ...centerVertically, width: '100%' }}>
        <div className="card text-bg-light mb-3">
          <div className="container">
            <div className="row" style={{ backgroundColor: 'transparent', paddingLeft: '11%', marginLeft: '0%', marginRight: '7%' }}>
              <div className="offset-3 col-6">
                <h2 className="card-header">Create account</h2>
                <div className={warningClasses} id="warning-message">
                  Your passwords don't match!
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit} id="create-account">
                    <div className="form-floating mb-3">
                      <label htmlFor="username">Username</label>
                      <input onChange={handleFormChange} required type="text" name="username" id="username" className="form-control" value={accountFormData.username} />
                    </div>
                    <div className="form-floating mb-3">
                      <label htmlFor="password">Password</label>
                      <input onChange={handleFormChange} required type="password" name="password" id="password" autoComplete="new-password" className="form-control" value={accountFormData.password} style={{ marginBottom: '15px' }} />
                    </div>
                    <div className="form-floating mb-3">
                      <label htmlFor="password">Password Confirmation</label>
                      <input onChange={passwordConfirmChange} required type="password" name="password-confirm" id="password-confirm" className="form-control" style={{ marginBottom: '15px' }} />
                    </div>
                    <div className="form-floating mb-3">
                      <label htmlFor="first_name">First name</label>
                      <input onChange={handleFormChange} required type="text" name="first_name" id="first_name" className="form-control" value={accountFormData.first_name} />
                    </div>
                    <div className="form-floating mb-3">
                      <label htmlFor="last_name">Last name</label>
                      <input onChange={handleFormChange} required type="text" name="last_name" id="last_name" className="form-control" value={accountFormData.last_name} />
                    </div>
                    <div className="form-floating mb-3">
                      <label htmlFor="email">Email</label>
                      <input onChange={handleFormChange} required type="email" name="email" id="email" className="form-control" value={accountFormData.email} />
                    </div>
                    <div className="text-center">
                      <div className="col-12 mb-3 d-flex justify-content-center align-items-center">
                        <select onChange={handleFormChange} required name="icon_id" id="icon_id" className="form-select" value={accountFormData.icon_id}>
                          <option value="">Choose your icon</option>
                          {icons.map(icon => (
                            <option key={icon.id} value={icon.id} style={{ textAlign: 'center' }}>
                              {icon.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="row justify-content-center" style={{ backgroundColor: 'transparent' }}>
                        <div className="col-12 d-flex justify-content-center align-items-center mb-3">
                          {icons.map((icon, index) => (
                            <div key={icon.id} className="text-center" style={{ marginRight: '30px', display: 'flex', flexDirection: 'column' }}>
                              <p>{String.fromCharCode(65 + index)}</p>
                              <img src={icon.icon_url} alt={icon.name} width="50" height="50" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3"></div>
                    <button>Create</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
