import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import importImg from '../../img/sidebar/logo.png';
import axios from "axios";
import { Button } from '../../components/button.component';
import { Input } from '../../components/input.component';
import { Label } from '../../components/label.component';
import { SelectBox } from "../../components/selectbox.component";

export const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const options = ['Super Admin', 'Admin', 'Manager'];

  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset errors
    setErrors({});

    // Perform validation
    let validationErrors: any = {};
    if (name.trim() === "") {
      validationErrors.name = "Name is required *";
    }
    if (email.trim() === "") {
      validationErrors.email = "Email is required *";
    }
    if (password.trim() === "") {
      validationErrors.password = "Password is required *";
    }
    if (confirmPassword.trim() === "") {
      validationErrors.confirmPassword = "Confirm Password is required *";
    }
    if (confirmPassword.trim() !== password.trim()) {
      validationErrors.confirmPassword = "Passwords do not match *";
    }
    if (role === "") {
      validationErrors.role = "Role is required *";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/auth/signup", {
        name,
        email,
        password,
        role,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="">
      <div className="registerBox">
        <div className="registerHeader">
          <img src={importImg} alt="logo" className="resize" />
        </div>
        <form onSubmit={handleSignup}>
          <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            name="name"
            placeholder="Name"
            id={""}
          />
          <p className="error-message">{errors.name && errors.name }</p>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            value={email}
            placeholder="Email"
            id={""}
          />
          <p className="error-message">{errors.email && errors.email }</p>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            id={""}
          />
          <p className="error-message">{errors.password && errors.password }</p>
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="password_comfirmation"
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            id={""}
          />
          <p className="error-message">{errors.confirmPassword && errors.confirmPassword }</p>
          <SelectBox
            name="role"
            options={options}
            onChange={(selectedOption: string) => setRole(selectedOption)}
          />
          <p className="error-message">{errors.role && errors.role }</p>
          <Button type="submit" className="button" text="Register" />
        </form>
      </div>
    </div>
  );
};
