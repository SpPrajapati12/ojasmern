import React, { useEffect, useState } from 'react'
import axios  from 'axios';
axios.defaults.withCredentials = true
let firstRender = true;


const UserDetails = () => {
  const token = localStorage.getItem('token');
  console.log(token)

    const [user, setUser] = useState({})

    useEffect(() => {
      if(firstRender) {
        firstRender = false; 
      getToken()
      }
      let interval = setInterval(() => {
        refreshToken().then(data=>setUser(data.user))
      },1000*28)
      return() => clearInterval(interval)
    }, [])
    
    const refreshToken = async() => {
      const res = await axios.get("http://localhost:5000/api/refresh",{
        withCredentials : true
      }).catch(err => console.log(err))
      const data = await res.data
      return data
    }

    // const sendRequest = async () => {
    //   const res = await axios.get("http://localhost:5000/api/user", {
    //     withCredentials : true
    //   }).catch(err => console.log("error",err));
    //   const data = await res.data
    //   return data
    // }

    const getToken = async () => {
        console.log("data")
        try {
          const res = await axios.get("http://localhost:5000/api/user", {
            withCredentials : true
          });
          console.log("resdata",res.data.user)
          if(res) {
            setUser(res.data.user)
          }
        } catch (error) {
          console.log("error",error);
        }
      };
      
  return (
    <div>
        <div className="head_line mb-4 d-flex justify-content-center align-items-center">
          <span>User Detail Page</span>
        </div>
      Login Successfully    
      {user.email}
    </div>
  )
}

export default UserDetails
