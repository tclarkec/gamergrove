import React, { useState, useEffect } from 'react';
// import {useNavigate} from 'react-router-dom';

const fetchData = async () => {
        const tokenUrl = `http://localhost:8000/token`;

        const fetchConfig = {
            credentials: 'include'
        }

        const response = await fetch(tokenUrl, fetchConfig);

        if (response.ok) {
            const data = await response.json();
            console.log(data.account.username);
            return data.account.username
        }
    }

const saved_username = await fetchData();

const initialAccountData = {
    username: saved_username,
    password: "**********",
}

const initialUserData = {
    first_name: "",
    last_name: "",
    email:"",
    icon_id:""
}

function Settings(){
    // const navigate = useNavigate();

    const [icons, setIcons] = useState([]);
    const [accountFormData, setAccountFormData] = useState(initialAccountData);
    const [userFormData, setUserFormData] = useState(initialUserData);


    const fetchData = async () => {
        const tokenUrl = `http://localhost:8000/token`;

        const fetchConfig = {
            credentials: 'include'
        }

        const response = await fetch(tokenUrl, fetchConfig);

        if (response.ok) {
            const data = await response.json();

            const accountUrl = `http://localhost:8000/api/accounts/${data.account.username}`;
            const accountResponse = await fetch(accountUrl);

            if (accountResponse.ok) {
                const data = await response.json();
                setAccountFormData(data);
            } else {
                throw new Error ('Failed to retrieve account credentials')
            }

            const userUrl = `http://localhost:8000/api/users/${tokenData.id}`;
            const userResponse = await fetch(userUrl);

            if (userResponse.ok) {
            const data = await response.json();
            setUserFormData(data);
            } else {
                throw new Error ('Failed to retrieve user data')
            }

        } else {
            throw new Error ('Failed to retrieve token')
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
        setUserFormData({
            ...userFormData,
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
            // navigate("/accounts");
            setAccountFormData(initialAccountData);
            const userUrl = 'http://localhost:8000/api/users'

            const userFetchConfig = {
                method: "post",
                body: JSON.stringify(userFormData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const user_response = await fetch(userUrl, userFetchConfig);
            if (user_response.ok) {
                // navigate("/accounts");
                setUserFormData(initialUserData);
            } else {
                throw new Error('Failed to create user')
            }
        } else {
            throw new Error('Failed to create account')
        }

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
                <input onChange={handleFormChange} placeholder="i.e. John" required type="text" name = "first_name" id="first_name" className="form-control" value={userFormData.first_name}/>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="last_name">Last name</label>
                <input onChange={handleFormChange} placeholder="i.e. Doe" required type="text" name = "last_name" id="last_name" className="form-control" value={userFormData.last_name}/>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="email">Email</label>
                <input onChange={handleFormChange} placeholder="i.e. jdoe24@gmail.com" required type="email" name = "email" id="email" className="form-control" value={userFormData.email}/>
              </div>
              {/* <div className="mb-3">
                <select onChange={handleFormChange}required name = "icon_id" id="icon_id" className="form-select" value={userFormData.icon_id}>
                  <option value="">Choose an icon</option>
                  {icons.map(icon => {
                      return (
                          <option key={icon.id} value={icon.id}>
                              {icon.name}
                          </option>
                      )
                  })}
                </select>
              </div> */}
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    );
}

export default Settings;
