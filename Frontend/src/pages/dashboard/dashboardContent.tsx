import { Card } from "../../components/card.component"

import { useEffect, useState } from "react"
import axios from "axios"
import { BarChart } from "../../components/barchart.component"
import { LineChart } from "../../components/linechart.component"

export const DashboardContent = () => {
    const token = localStorage.getItem("token");
    const [customers, setCustomers] = useState<any>();
    const [projects, setProjects] = useState<any>();
    const [users, setUsers] = useState<any>();
    useEffect(() => {
        const fetchData = async () => {
            const responseCustomer = await axios.get("http://127.0.0.1:8000/api/customers",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            const responseProjects = await axios.get("http://127.0.0.1:8000/api/projects",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            const responseUsers = await axios.get("http://127.0.0.1:8000/api/projects",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            setCustomers(responseCustomer.data.data.length)
            setProjects(responseProjects.data.data.length)
            setUsers(responseUsers.data.data.length)

        }
        fetchData();
    }, [token]);
    return (
        <>
            <div style={{ width: '900px' }}>
                <div className="cards">
                    <Card className='card1' title='Our Clients' number={customers} rate='+1.2' info='than last 6 months' logoname="fa-solid fa-handshake" />
                    <Card className='card2' title='Projects' number={projects} rate='+2.3' info='than last 6 months' logoname='fa-solid fa-list-check' />
                    <Card className='card3' title='Users' number={users} rate='+0.8' info='than last 6 months' logoname="fa-solid fa-users" />
                </div>
                <div className="charts">
                    <BarChart />
                    <LineChart />
                </div>
            </div>
        </>
    )
}