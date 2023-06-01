import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import importImg from "../../img/sidebar/logo.png"
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";
import { SelectBox } from "../../components/selectbox.component";

interface Role {
  id: number;
  name: string;
}

export const UserEditContent: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("09-123456789");
  const [contact_person, setContactPerson] = useState("");
  const [position, setPosition]=useState("");
  const [phone, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<any>({});
  const token = localStorage.getItem("token");
  const [options, setOptions] = useState<Role[]>([]);
  const [role_id, setRole] = useState<number | undefined>(undefined);

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, rolesResponse] = await Promise.all([
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

        const user = userResponse.data.data;
        const rolesData = rolesResponse.data.data;
        const mappedOptions: Role[] = rolesData.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));

        setName(user.name);
        setEmail(user.email);
        setPhoneNo(user.phone);
        setAddress(user.address);
        setOptions(mappedOptions);

        const userRole = mappedOptions.find((option) => option.id == user.role_id);
        if (userRole) {
          setRole(userRole.id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId, token]);

  const handleSelectChange = (selectedOption: string, selectedIndex: number) => {
    const selectedRoleId = options[selectedIndex].id;
    setRole(selectedRoleId);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    const validationErrors: any = {};
    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!phone.trim()) {
      validationErrors.phone = "Phone number is required";
    }
    if (!address.trim()) {
      validationErrors.address = "Address is required";
    }
    if (!role_id) {
      validationErrors.role = "Role is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post(
        `http://127.0.0.1:8000/api/auth/userUpdate/${userId}`,
        {
          name,
          email,
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
        navigate("/users");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      });
  };

  return (
    <div className="">
      <div className="registerBox">
        <div className="registerHeader">
          <img src={importImg} alt="logo" className="resize" />
        </div>
        <form onSubmit={handleUpdate}>
          <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            name="name"
            placeholder="Name"
            id=""
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            name="email"
            placeholder="Email"
            id=""
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          {/* <Input
            onChange={(e) => setPhoneNo(e.target.value)}
            type="text"
            value={phone}
            name="phone"
            placeholder="Phone Number"
            id=""
          /> */}
          {/* {errors.phone && <p className="error-message">{errors.phone}</p>}
          
          <Input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            value={address}
            name="address"
            placeholder="Enter Address"
            id=""
          />
          {errors.address && <p className="error-message">{errors.address}</p>} */}

          <SelectBox
            name="role_id"
            options={options.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            onChange={handleSelectChange}
            value={role_id !== undefined ? role_id.toString() : ""}
          />
          {errors.role && <p className="error-message">{errors.role}</p>}

          <Button type="submit" className="button" text="Update" />
        </form>
      </div>
    </div>
  );
};
