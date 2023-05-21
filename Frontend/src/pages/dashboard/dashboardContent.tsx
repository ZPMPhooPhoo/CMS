
import { Card } from "../../components/card.component"
import BarChart from "../../components/barchart.component"
import LineChart from "../../components/linechart.component"
export const DashboardContent = () => {
    return(
        <>
            <div style={{ width: '900px' }}>
                <div className="cards">
                    <Card className= 'card1' title='Our Clients' number='1,000' rate='+1.2' info='than last 6 months' logoname="fa-solid fa-handshake"/>
                    <Card className= 'card2' title='Projects' number='2,000' rate='+2.3' info='than last 6 months' logoname='fa-solid fa-list-check'/>
                    <Card className= 'card3' title='Users' number='100' rate='+0.8' info='than last 6 months' logoname="fa-solid fa-users"/>
                </div>
                <div className="charts">
                    <BarChart />
                    <LineChart />
                </div>
            </div>
        </>
    )
}