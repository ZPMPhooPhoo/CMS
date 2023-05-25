import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";

export const ClientEditContent: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contact_person, setContactPerson] = useState<string>("");
  const [position, setClientPosition] = useState<string>("");
  const [role_id, setRoleId] = useState<number>(5);
  const [password, setPassword] = useState<string>("0000000000");
  const [errors, setErrors] = useState<any>({});
  const token = localStorage.getItem('token');





  

  const navigate = useNavigate();
  const { customerId } = useParams();
//   console.log("Customer ID:", customerId);
//   console.log(customerId);
useEffect(() => {
    // Fetch customer data from the server using axios
    axios
      .get(`http://127.0.0.1:8000/api/users/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Update the state variables with the retrieved data
        
        // console.log(response.data.name);
        const { name, email, phone, address, contact_person, position } = response.data.data;
        setName(name);
        console.log(name);
        setEmail(email);
        setPhoneNumber(phone);
        setAddress(address);
        setContactPerson(contact_person);
        setClientPosition(position);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [customerId, token]);


  const handleClientUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    let validationErrors: any = {};
    if (name.trim() === "") {
      validationErrors.name = "Name is required *";
    }
    if (email.trim() === "") {
      validationErrors.email = "Email is required *";
    }
    if (phone.trim() === "") {
      validationErrors.phoneNumber = "Phone number is required *";
    }
    if (contact_person.trim() === "") {
      validationErrors.contactPerson = "Customer position is required *";
    }
    if (position.trim() === "") {
      validationErrors.clientPosition = "Customer position is required *";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .patch(
        `http://127.0.0.1:8000/api/users/${customerId}`,
        {
          name,
          email,
          password,
          phone,
          contact_person,
          position,
          role_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/client-lists");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>ADD A CUSTOMER</h1>
          <div className="form-wrap">
            <form onSubmit={handleClientUpdate}>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    id="client_name"
                    name="name"
                    type="text"
                    value={name}
                    placeholder="Enter Name"
                  />
                  <p className="error-message">{errors.name && errors.name }</p>
                </div>
                
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  value={email} // Display the email state variable
                  placeholder="Enter Email"
                />
                   <p className="error-message">{errors.email && errors.email }</p>
                </div>
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    id="phone_number"
                    name="phone"
                    type="number"
                    value={phone}
                    placeholder="Enter Phone Number"
                  />
                  <p className="error-message">{errors.phoneNumber && errors.phoneNumber }</p>
                </div>
                
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setAddress(e.target.value)}
                    id="address"
                    name="address"
                    type="text"
                    value={address}
                    placeholder="Address"
                  />
                  <p className="error-message">{errors.address && errors.address }</p>
                </div>
                
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setContactPerson(e.target.value)}
                    id="contact_person"
                    name="contact_person"
                    type="text"
                    value={contact_person}
                    placeholder="Contact Person"
                  />
                   <p className="error-message">{errors.contactPerson && errors.contactPerson }</p>
                </div>
               
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setClientPosition(e.target.value)}
                    id="client_position"
                    name="position"
                    type="text"
                    value={position}
                    placeholder="Customer Position"
                  />
                  <p className="error-message">{errors.clientPosition && errors.clientPosition }</p>
                </div>
                
              </div>
              <Button type="submit" className="button" text="Update" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
