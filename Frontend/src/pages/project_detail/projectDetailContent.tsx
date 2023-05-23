import { useState } from "react";
import { Link } from "react-router-dom"
import { ProjectCard } from "./projectCard"
export const ProjectDetailContent=()=>{


    const [showQuotationModal, setShowQuotationModal] = useState<boolean>(false);
    const [expandedIndex, setExpandedIndex] = useState(-1);



    const handleModalClose = () => {
        setShowQuotationModal(false);
    };

    const handleModalOpen = () => {
        setShowQuotationModal(true);
    };
    

    const toggleAccordion = (index:number) => {
      if (index === expandedIndex) {
        setExpandedIndex(-1); // Collapse the accordion if it's already expanded
      } else {
        setExpandedIndex(index); // Expand the clicked accordion
      }
    };


    return (

        <>

            {/* <div style={{ width: '900px' }}> */}
                {/* <div className="mainclientls" >
                    <div className="clils">
                        <div className="maincliproli">
                            <div className="Addproject">
                                <div className="pro_listincliinfo">
                                    <i className="fa-solid fa-chevron-left"></i>
                                    <span className="material-symbols-outlined">
                                        person
                                    </span>
                                    <p>Customer Name / &nbsp; </p>
                                    <p>Project Name</p>
                                </div>
                            </div>
                            <div className="procard">
                            
                                <div className="leftcard_pro">                             
                                    <ProjectCard />
                                    <ProjectCard />     
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
                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div> */}
            {/* </div> */}
            

            <div className="mainclientls" >
                    <div className="clils">
                        <div className="maincliproli">
                            <div className="Addproject">
                                <div className="pro_listincliinfo">
                                    <Link to='/client-project-lists'><i className="fa-solid fa-chevron-left"></i></Link>
                                    <span className="material-symbols-outlined">
                                        person
                                    </span>
                                    <p>Customer Name / &nbsp; </p>
                                    <p>Project Name</p>
                                </div>
                            </div>
                            <div className="procard">
                            
                                <div className="leftcard_pro">                             
                                    <ProjectCard />
                                    <ProjectCard />     
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
