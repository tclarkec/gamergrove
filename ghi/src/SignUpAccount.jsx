import useToken from "@galvanize-inc/jwtdown-for-react";
// import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom';

const initialAccountData = {
    username:"",
    password:"",
}

function SignUpAccount(){
    const navigate = useNavigate();

    const [accountFormData, setAccountFormData] = useState(initialAccountData);

    const { login } = useToken();

    // const { token } = useAuthContext();

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
          navigate("/signup/user");
        } else {
            throw new Error('Failed to create account')
        }

    }

    return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create user credentials</h1>
            <form onSubmit={handleSubmit} id="create-account">
              <div className="form-floating mb-3">
                <label htmlFor="username">Username</label>
                <input onChange={handleFormChange} placeholder="i.e. jdoe24" required type="text" name = "username" id="username" className="form-control" value={accountFormData.username}/>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="password">Password</label>
                <input onChange={handleFormChange} placeholder="i.e. Password24#" name = "password" id="password" className="form-control" value={accountFormData.password}/>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    );
}

export default SignUpAccount;
