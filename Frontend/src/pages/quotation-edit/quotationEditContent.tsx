import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Button } from '../../components/button.component';
import { Checkbox } from '../../components/checkbox';
import { Input } from '../../components/input.component';
import { Label } from '../../components/label.component';

export const QuotationEditContent: React.FC = () => {
    const [quotation, setQuotation] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [is_agree, setIsAgree] = useState(false);
    const [quotation_date, setQuotationDate] = useState('');
    const [editData, setEditData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [isCheckbox, setisCheckbox] = useState<boolean>(false);
    const location = useLocation();
    const searchID = new URLSearchParams(location.search);
    const quotation_ID = searchID.get("quotation_id");
    const project_id = searchID.get("projectID")?.toString();
    const customerID = searchID.get("customerID");
    const [errMsg, setErrMsg] = useState<string>('');


    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/quotation-edit/${quotation_ID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setDescription(response.data.data?.description)

            } catch (error: any) {
                if (error.response && error.response.data && error.response.data.message) {
                    const apiErrorMessage = error.response.data.message;
                    setErrMsg(apiErrorMessage);
                } else {
                    setErrMsg('An error has occurred during the API request.');
                }
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const quotationFormData = new FormData();
        quotationFormData.append("quotation", quotation as File);
        quotationFormData.append("description", description);
        quotationFormData.append("is_agree", String(is_agree));
        quotationFormData.append("quotation_date", quotation_date);
        quotationFormData.append("project_id", String(project_id));

        axios.patch(`http://127.0.0.1:8000/api/quotations/${quotation_ID}`, quotationFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response: any) => {
                if (isCheckbox) {
                    localStorage.setItem("project_id", `${project_id}`);
                    navigate(`/contract-create?id=${customerID}&quotation_ID=${quotation_ID}`)
                } else {
                    navigate(`/project-detail?id=${customerID}&projectID=${project_id}`)
                }
            })
            .catch((error: any) => {
                if (error.response && error.response.data && error.response.data.message) {
                    const apiErrorMessage = error.response.data.message;
                    setErrMsg(apiErrorMessage);
                } else {
                    setErrMsg('An error has occurred during the API request.');
                }
            });
    };

    function handleChatboxChange(checked: boolean) {
        setisCheckbox(checked);
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setQuotation(file || null);
    };
    if (isLoading) {
        return <div className="l-width"><p className="loading"></p></div>
    }

    return (
        <>
            <div className="register add-middle">
                <div className="main_client_create">
                    <h1>EDIT QUOTATION</h1>
                    <div className="form-wrap">
                        <form onSubmit={handleSubmit}>
                            <div className="client_phoneNO">
                                <div className="client_phone_parent">
                                    <input type="file" onChange={handleFileChange} />
                                </div>
                            </div>
                            <div className="client_phoneNO">
                                <div className="client_phone_parent">
                                    <Input
                                        onChange={(e: any) => setDescription(e.target.value)}
                                        id="description"
                                        name="description"
                                        type="textarea"
                                        value={description}
                                        placeholder="Enter Quotation Description"
                                    />
                                </div>
                            </div>
                            <div className="client_phoneNO">
                                <div className="client_phone_parent">
                                    <input
                                        type="date"
                                        id="quotation_date"
                                        value={editData?.data?.quotation_date}
                                        onChange={(e: any) => setQuotationDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="client_phoneNO">
                                <div className="client_phone_parent">
                                    <Checkbox className="check_boxquotationform" name="checkbox" checked={editData?.data?.is_agree} onChange={handleChatboxChange} label={""} />
                                    <Label htmlFor="checkbox" text="Is agree?" />
                                </div>
                                <p className="error-message">{errMsg && errMsg}</p>
                            </div>
                            <div className="allbtn">
                                <Button type="submit" className="button" text="ADD" />
                                <Link to={`/client-project-lists?id=${customerID}`}>
                                    <Button type="button" className="button" text="BACK"
                                    />
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};