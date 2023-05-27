import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { ProjectCard } from "./projectCard"
import { useLocation } from "react-router-dom";
import axios from "axios";
interface Pjdata  {
    [x: string]: any;
    id:number,
    title:string
}

interface pj_pass_data{
    category: string,
    status: string,
    description: string,
    developer_names: []
}

export const ProjectDetailContent:React.FC<pj_pass_data>  =({  })=>{
    const [showQuotationModal, setShowQuotationModal] = useState<boolean>(false);
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [pjdata, setPjdata] = useState<Pjdata>();
    const [devData , setDevData] = useState<[]>([]);
    const token = localStorage.getItem("token");
    const location = useLocation();
    const searchID = new URLSearchParams(location.search);
    const id = searchID.get("id");
    const projectID = searchID.get("projectID");

    
    


    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const responsePjData = await axios.get(`http://127.0.0.1:8000/api/projects/${projectID}` ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }, 
            }
            );
            setPjdata(responsePjData.data.data)
            setIsLoading(false);
            const responseDevData = await axios.get(`http://127.0.0.1:8000/api/developerproject/${projectID}` , {
            headers: {
                Authorization: `Bearer ${token}`
            },
            } );
            setDevData(responseDevData.data.data);
            }catch(error:any){
                setError(error.message);
                setIsLoading(false)
                console.log(error.message)
            }
        }
        fetchData();
    }, [id, token])


    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }



    const handleModalClose = () => {
        setShowQuotationModal(false);
    };

    const handleModalOpen = () => {
        setShowQuotationModal(true);
    };
    

    const toggleAccordion = (index:number) => {
      if (index === expandedIndex) {
        setExpandedIndex(-1);
      } else {
        setExpandedIndex(index); 
      }
    };
    let Cusname ="";
    devData.map((cus:any)=>{
        if(cus.role_id == 5){
            Cusname = cus.name;
        }
    });

    console.log(devData)
    const category = pjdata?.category.category;
    const status = pjdata?.status;
    const description = pjdata?.description;





    

    return (

        <>
            

            <div className="mainclientls" >
                    <div className="clils">
                        <div className="maincliproli">
                            <div className="Addproject">
                                <div className="pro_listincliinfo">
                                    <Link to={`/client-project-lists?id=${id}`}><i className="fa-solid fa-chevron-left"></i></Link>
                                    <span className="material-symbols-outlined">
                                        person
                                    </span>
                                    <p>{Cusname} / &nbsp; </p>
                                    <p>{pjdata&& pjdata.title}</p>
                                </div>
                            </div>
                            <div className="procard">
                            
                                <div className="leftcard_pro">                             
                                    <ProjectCard category={category} status={status} description={description} />
                                    {/* <ProjectCard />      */}
                                </div>
                                <div className="right_card_category">
                                    <div className="category_list">
                                        <h1>Report</h1>
                                        <h2>Number Of Quotations:  <span>6</span> </h2>
                                        <h2>Number Of Contracts:  <span>2</span> </h2>
                                        <h2>Successful rate</h2>
                                        <div className="success-rate">
                                            <p>60%</p>
                                        </div>
                                    </div>
                                    <div className="modal-btn">
                                        <button onClick={handleModalOpen}>Quotations&#62;&#62;&#62; </button>
                                        <button onClick={handleModalOpen}>Contracts&#62;&#62;&#62; </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>
                {showQuotationModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                        <div className="accordion">
                            <h1>Quotations Of Project Name</h1>
                            <div className="accordion-item">
                                <div className="accordion-header" onClick={() => toggleAccordion(0)}>
                                <h3>Quotation_1</h3>
                                <span className={expandedIndex === 0 ? "accordion-icon expanded" : "accordion-icon"}>
                                    {expandedIndex === 0 ? "\u25BC" : "\u25B6"}
                                </span>
                                </div>
                                {expandedIndex === 0 && (
                                <div className="accordion-content">
                                    <p>Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1</p>
                                    <div>
                                        <a href="#"><i className="fa-solid fa-pen-to-square update"></i></a>
                                        <a href="#"><i className="fa-solid fa-trash delete"></i></a>
                                        <a href="#"><i className="fa-solid fa-file-arrow-down download"></i></a>
                                    </div>
                                </div>
                                
                                )}
                            </div>
                            <div className="accordion-item">
                                <div className="accordion-header" onClick={() => toggleAccordion(1)}>
                                <h3>Quotation_2</h3>
                                <span className={expandedIndex === 1 ? "accordion-icon expanded" : "accordion-icon"}>
                                    {expandedIndex === 1 ? "\u25BC" : "\u25B6"}
                                </span>
                                </div>
                                {expandedIndex === 1 && (
                                <div className="accordion-content">
                                    <p>Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1</p>
                                    <div>
                                        <a href="#"><i className="fa-solid fa-pen-to-square update"></i></a>
                                        <a href="#"><i className="fa-solid fa-trash delete"></i></a>
                                        <a href="#"><i className="fa-solid fa-file-arrow-down download"></i></a>
                                    </div>
                                </div>
                                )}
                            </div>
                            <div className="accordion-item">
                                <div className="accordion-header" onClick={() => toggleAccordion(2)}>
                                <h3>Quotation_3</h3>
                                <span className={expandedIndex === 2 ? "accordion-icon expanded" : "accordion-icon"}>
                                    {expandedIndex === 2 ? "\u25BC" : "\u25B6"}
                                </span>
                                </div>
                                {expandedIndex === 2 && (
                                <div className="accordion-content">
                                    <p>Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1</p>
                                    <div>
                                        <a href="#"><i className="fa-solid fa-pen-to-square update"></i></a>
                                        <a href="#"><i className="fa-solid fa-trash delete"></i></a>
                                        <a href="#"><i className="fa-solid fa-file-arrow-down download"></i></a>
                                    </div>
                                </div>
                                )}
                            </div>
                            </div>






                            <div className="btn-gp">
                                <button onClick={handleModalClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
