import React, { useState, useEffect } from 'react';
// import {useNavigate} from 'react-router-dom';

const fetchUserName = async () => {
        const tokenUrl = `http://localhost:8000/token`;

        const fetchConfig = {
            credentials: 'include'
        }

        const response = await fetch(tokenUrl, fetchConfig);

        if (response.ok) {
            const data = await response.json();
            return data.account.username
        }
    }


const saved_username = await fetchUserName();

const fetchAccount = async () => {
    const accountUrl = `http://localhost:8000/api/accounts/${saved_username}`;

    const response = await fetch(accountUrl);

    if (response.ok) {
        const data = await response.json();
        return data
    }
}

const account_data = await fetchAccount();

let initialAccountData = {};

if (account_data) {
  initialAccountData = {
    username: saved_username,
    password: "**********",
    first_name: account_data.first_name,
    last_name: account_data.last_name,
    email: account_data.email,
    icon_id: account_data.icon_id
  }
}

function Settings(){
    // const navigate = useNavigate();

    const [icons, setIcons] = useState([]);
    const [updatedAccount, setUpdatedAccount] = useState(false);
    const [accountFormData, setAccountFormData] = useState(initialAccountData);

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

        const updateUrl = `http://localhost:8000/api/accounts/${account_data.id}/${saved_username}`

        const updateFetchConfig = {
            method: "put",
            body: JSON.stringify(accountFormData),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const updateResponse = await fetch(updateUrl, updateFetchConfig);
        if (updateResponse.ok) {
            setAccountFormData(initialAccountData);
            setUpdatedAccount(true);
        } else {
            throw new Error('Failed to update account settings')
        }
    }

    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (updatedAccount) {
        messageClasses = 'alert alert-success mb-0';
        formClasses = 'd-none';
    }
    return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Account Settings</h1>
            <form onSubmit={handleSubmit} id="create-profile">
              <div className="form-floating mb-3">
                <label htmlFor="username">Username</label>
                <input onChange={handleFormChange} required type="text" name = "username" id="username" className="form-control" value={accountFormData.username}/>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="password">Password</label>
                <input onChange={handleFormChange} name = "password" id="password" className="form-control" value={accountFormData.password}/>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="first_name">First name</label>
                <input onChange={handleFormChange} required type="text" name = "first_name" id="first_name" className="form-control" value={accountFormData.first_name}/>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="last_name">Last name</label>
                <input onChange={handleFormChange} required type="text" name = "last_name" id="last_name" className="form-control" value={accountFormData.last_name}/>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="email">Email</label>
                <input onChange={handleFormChange} required type="email" name = "email" id="email" className="form-control" value={accountFormData.email}/>
              </div>
              <div className="mb-3">
                <select onChange={handleFormChange}required name = "icon_id" id="icon_id" className="form-select" value={accountFormData.icon_id}>
                  <option value="">Change your icon</option>
                  {icons.map(icon => {
                      return (
                          <option key={icon.id} value={icon.id}>
                              {icon.name}
                          </option>
                      )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Update</button>
            </form>
          </div>
          <div className={messageClasses} id="success-message">
          Your settings have been updated!
          </div>
          {/* <div>
            {icons.map(icon => {
                return (
                     <img src={icon.icon_url} alt = {icon.name} width = "50" height="50"></img>
                )
            })}
          </div> */}
        </div>
      </div>
    </div>

    );
}

export default Settings;
