import {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


interface Role {
    id: number;
    name: string;
  }

const UserProfile = () => {
    const [userProfile,setUserProfile] =useState<string>("");
    const [name,setName] =useState<string>("");
    const [email,setEmail] =useState<string>("");
    const [phone,setPhone] =useState<string>("");
    const [address,setAddress] =useState<string>("");
    const [role,setRole] =useState<any>();
    // const [userRole,setUserRole] =useState<any>();
    const token = localStorage.getItem('token');
    const { userId } = useParams();
    const [error, setError] = useState(null);
    const [options, setOptions] = useState<{ [key: number]: string }>({});

   useEffect(() => {
      const fetchData = async () => {
        try {
          const [usersResponse, rolesResponse] = await Promise.all([
            axios.get(`http://127.0.0.1:8000/api/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("http://127.0.0.1:8000/api/roles", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);
    
        // const {name ,email,phone ,address,role} =usersResponse.data.data;
          setName(usersResponse.data.data.name);
          setEmail(usersResponse.data.data.email);
          setAddress(usersResponse.data.data.address);
          setPhone(usersResponse.data.data.phone);
          setRole(usersResponse.data.data.role_id);
        //   console.log(usersResponse.data.data.name);
        //   setUserRole(rolesResponse.data.data);
          const rolesData = rolesResponse.data.data;
          const mappedOptions: { [key: number]: string } = {};
          rolesData.forEach((item: Role) => {
            mappedOptions[item.id] = item.name;
          });
    
          setOptions(mappedOptions);
        } catch (error: any) {
          setError(error);
        }
      };
    
      fetchData();
    }, [token,userId]);

    console.log(userProfile);

    return (
        <>

            <div className="main_userprofile">
                <div className="left_userprofile">
                    <div className="profile_icon">
                        <i className="fa-solid fa-user-tie usericon_prof"></i>
                    </div>
                    <div className="user_contact">
                        <div className="profile_text">
                            <div className="my_profile">
                                <h1>{name}</h1>
                                <p>{email}</p>
                            </div>
                            <div className="my_profile">
                                <h1>My Address</h1>
                                <p> {phone}</p>
                            </div>
                            <div className="my_profile">
                                <h1>Phone No</h1>
                                <p>{address}</p>
                            </div>
                            <div className="my_profile">
                                <h1>role</h1>
                                <p>{options[role] || ""}</p>
                            </div>
                            
                        
                        </div>
                        <div className="user_contact_icon">
                            
                                <i className="fa-solid fa-phone user_phone"></i>
                                <i className="fa-brands fa-rocketchat user_chat"></i>
                                <i className="fa-solid fa-envelope user_mail"></i>
                                <i className="fa-brands fa-facebook-f user_facebook"></i>                        </div>
                    </div>
                    
                </div>
            </div>
            
        </>
    );
}

export default UserProfile;