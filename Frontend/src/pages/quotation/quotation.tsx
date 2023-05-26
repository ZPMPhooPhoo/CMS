import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { Button } from '../../components/button.component';
import { Input } from '../../components/input.component';

const QuotationForm: React.FC = () => {
  const [quotation, setQuotation] = useState<File | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [is_agree, setIsAgree] = useState(false);
  const [quotation_date, setQuotationDate] = useState('');
  const [project_id, setProjectId] = useState<number>(1);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(quotation_date); 
    const formData = new FormData();
    formData.append("quotation", quotation as File);
    console.log(quotation);
    formData.append("description", description);
    console.log(description);
    formData.append("is_agree", String(is_agree));
    console.log(is_agree);
    formData.append("quotation_date",quotation_date);
    console.log(quotation_date);
    formData.append("project_id", String(project_id));
    console.log(formData);

    axios
      .post("http://127.0.0.1:8000/api/quotations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        console.log(response.data);
        navigate("/quotation");
      })
      .catch((error: any) => {
        if (error.response && error.response.data && error.response.data.message) {
          // Display the error message to the user
          console.log(error.response.data.message);
        } else {
          // Handle other types of errors
          console.log("An error occurred:", error.message);
        }
      });
  };
  
  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>ADD A QUOTATION</h1>
          <div className="form-wrap">
            <form onSubmit={handleSubmit}>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                <label htmlFor="quotation">Quotation:</label>
                  <Input
                                      type="file"
                                      id="quotation"
                                      onChange={(e: any) => {
                                          const file = e.target.files?.[0];
                                          setQuotation(file);
                                      } } placeholder={''} value={''} name={''}                  />
                </div>
                </div>
                <div className="client_phoneNO">
                <div className="client_phone_parent">
                <label htmlFor="quotation">Quotation:</label>
                <Input
                    onChange={(e :any) => setDescription(e.target.value)}
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    placeholder="Enter Description"
                  />
                  </div>
                </div>
                <div className="client_phoneNO">
                <div className="client_phone_parent">
                <label htmlFor="isAgree">Agree:</label>
                <input
                  type="checkbox"
                  id="isAgree"
                  checked={is_agree}
                  onChange={(e :any) => setIsAgree(e.target.checked)}
                />
               </div>
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                <label htmlFor="quotationDate">Quotation Date:</label>
                <input
                  type="date"
                  id="quotation_date"
                  value={quotation_date}
                  onChange={(e : any) => setQuotationDate(e.target.value)}
                />
                </div>
                </div>
               <Button type="submit" className="button" text="ADD" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuotationForm;