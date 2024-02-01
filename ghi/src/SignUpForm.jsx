import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const initialAccountData = {
    username:"",
    password:"",
    first_name: "",
    last_name: "",
    email:"",
    icon_id:""
}

function SignUpForm(){
    const navigate = useNavigate();

    const [icons, setIcons] = useState([]);
    const [accountFormData, setAccountFormData] = useState(initialAccountData);

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
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

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
          navigate("/logout");
        } else {
            throw new Error('Failed to create account')
        }

    }

return (
  <div className="container">
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create account</h1>
          <form onSubmit={handleSubmit} id="create-account">
            <div className="form-floating mb-3">
              <label htmlFor="username">Username</label>
              <input onChange={handleFormChange} placeholder="i.e. jdoe24" required type="text" name="username" id="username" className="form-control" value={accountFormData.username} />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="password">Password</label>
              <input onChange={handleFormChange} placeholder="i.e. Password24#" name="password" id="password" className="form-control" value={accountFormData.password} />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="first_name">First name</label>
              <input onChange={handleFormChange} placeholder="i.e. John" required type="text" name="first_name" id="first_name" className="form-control" value={accountFormData.first_name} />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="last_name">Last name</label>
              <input onChange={handleFormChange} placeholder="i.e. Doe" required type="text" name="last_name" id="last_name" className="form-control" value={accountFormData.last_name} />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="email">Email</label>
              <input onChange={handleFormChange} placeholder="i.e. jdoe24@gmail.com" required type="email" name="email" id="email" className="form-control" value={accountFormData.email} />
            </div>
              <div className="text-center"> {/* Center "Change your icon" */}
                <div className="col-12 mb-3">
                  <select onChange={handleFormChange} required name="icon_id" id="icon_id" className="form-select" value={accountFormData.icon_id}>
                    <option value="">Choose your icon</option>
                    {icons.map(icon => (
                      <option key={icon.id} value={icon.id} style={{ textAlign: 'center' }}>
                        {icon.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row justify-content-center"> {/* Center the icons in a row */}
                  <div className="col-12 d-flex justify-content-center align-items-center mb-3">
                    {icons.map((icon, index) => (
                      <div key={icon.id} className="text-center" style={{ marginRight: '30px' }}>
                        <p>{String.fromCharCode(65 + index)}</p>
                        <img src={icon.icon_url} alt={icon.name} width="50" height="50" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            <div className="mb-3"></div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}

export default SignUpForm;
