import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const initialUserData = {
    first_name: "",
    last_name: "",
    email:"",
    icon_id:""
}

function SignUpAccount(){
    const navigate = useNavigate();

    const [icons, setIcons] = useState([]);
    const [userFormData, setUserFormData] = useState(initialUserData);

    const { login } = useToken();
    const { token } = useAuthContext();

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
        setUserFormData({
            ...userFormData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            setUserFormData(initialUserData);
            navigate("/");
        } else {
            throw new Error('Failed to create user')
        }

    }

    return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a user profile</h1>
            <form onSubmit={handleSubmit} id="create-profile">
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
              <div className="mb-3">
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
