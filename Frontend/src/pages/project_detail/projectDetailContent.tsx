import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { ProjectCard } from "./projectCard"
import { useLocation } from "react-router-dom";
import axios from "axios";
interface Pjdata {
    [x: string]: any;
    id: number,
    title: string
}

interface pj_pass_data {
    category: string,
    status: string,
    description: string,
    developer_names: []
}

export const ProjectDetailContent: React.FC<pj_pass_data> = ({ }) => {
    const [showQuotationModal, setShowQuotationModal] = useState<boolean>(false);
    const [isQuotationsEmpty, setIsQuotationsEmpty] = useState<boolean>(false);
    const [QuotationData, setQuotationData] = useState<any[]>([]);
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [pjdata, setPjdata] = useState<Pjdata>();
    const [devData, setDevData] = useState<[]>([]);
    const token = localStorage.getItem("token");
    const location = useLocation();
    const searchID = new URLSearchParams(location.search);
    const id = searchID.get("id");
    const projectID = searchID.get("projectID");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/projects/${projectID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const newResponse = await axios.get(
                    `http://127.0.0.1:8000/api/developerproject/${projectID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const quotationResponse = await axios.get(`
                    http://127.0.0.1:8000/api/quotations/${projectID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                if (quotationResponse.data.data.length === 0) {
                    setIsQuotationsEmpty(true);
                } else {
                    setQuotationData(quotationResponse.data.data);
                }
                setPjdata(response.data.data)
                setDevData(newResponse.data.data)
                setIsLoading(false);
            } catch (error: any) {
                setError(error.message);
                console.log(error)
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, token]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>We are having trouble when fetching data. Please try again later.</div>;
    }

    console.log(QuotationData);
    QuotationData.map((item: any) => {
        console.log(item.quotation);
    })
    const handleModalClose = () => {
        setShowQuotationModal(false);
    };

    const handleModalOpen = () => {
        setShowQuotationModal(true);
    };


    const toggleAccordion = (index: number) => {
        if (index === expandedIndex) {
            setExpandedIndex(-1);
        } else {
            setExpandedIndex(index);
        }
    };
    let Cusname = "";
    devData.map((cus: any) => {
        if (cus.role_id == 5) {
            Cusname = cus.name;
        }
    });

    const downloadFile = (url: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      
    const category = pjdata?.category.category;
    const status = pjdata?.status;
    const description = pjdata?.description;
    function handleDownload(url: string, filename: string): void {
        const fileUrl = 'http://127.0.0.1:8000/storage/quotations/238379_wallpaper.jpg';
        const fileName = 'wallpaper.jpg';
        downloadFile(fileUrl, fileName);
        fetch('http://127.0.0.1:8000/storage/quotations/238379_wallpaper.jpg'
        )
            .then(response => response.blob())
            .then(blob => {
                // Create a download link
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;

                // Trigger a click event to start the download
                link.click();
                console.log(url)
            })
            .catch(error => {
                console.log("This is url " + url)
                console.error('Downloading Error:', error);

            });
        // const fileUrl = url; // Replace with your file URL
        // const link = document.createElement('a');
        // link.href = fileUrl;
        // link.download = name; // Replace with the desired file name
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    }

    console.log(QuotationData)

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
                                <p>{pjdata && pjdata.title}</p>
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
                            {/* <div className="accordion">
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
                                            jm                     <div>
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
                            </div> */}
                            {isQuotationsEmpty ? (
                                <div>No quotations are added for this project.</div>
                            ) : (
                                <div className="accordion">
                                    {QuotationData.map((quotation: any, index: number) => (
                                        <div className="accordion-item" key={index}>
                                            <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                                                <h3> Quotation_{index + 1} </h3>
                                                <span className={expandedIndex === index ? "accordion-icon expanded" : "accordion-icon"}>
                                                    {expandedIndex === index ? "\u25BC" : "\u25B6"}
                                                </span>
                                            </div>
                                            {expandedIndex === index && (
                                                <div className="accordion-content">
                                                    <p>{quotation.description}</p>
                                                    <div>
                                                        <a href="#"><i className="fa-solid fa-pen-to-square update"></i></a>
                                                        {/* <a href="#"><i className="fa-solid fa-trash delete"></i></a> */}
                                                        {quotation.quotation_url &&
                                                            <button style={{ background: 'none', border: '0', cursor: 'pointer' }} onClick={() => handleDownload(quotation.quotation_url!, quotation.quotation)} ><i className="fa-solid fa-file-arrow-down download"></i></button>
                                                        }

                                                        {/* <a href={quotation.quotation_url} download={quotation.quotation_url}>Download</a> */}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}






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
