import React from 'react';
import {useState, useEffect} from 'react'
import AuctionValues from '../data/auction-values-2021.json' ;
import AvailablePlayers from '../components/AvailablePlayers';
import CurrentTeam from '../components/CurrentTeam';
// import {AvailablePlayers, CurrentTeam} from '../components/';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Container, Row, Col} from 'react-bootstrap'

export const Home = () => {
    const [currentTeam, setCurrentTeam] = useState([]);
    const [available, setAvailable] = useState([]);
    const [budget, setBudget] = useState(200);

    useEffect(() => {
        setAvailable(AuctionValues);
    }, [])
    useEffect(()=> {
        calculateBudget();
    }, [currentTeam])
    useEffect(()=> {
        console.log('available updated');
        // setAvailable(available.sort((a,b) =>
        //     a.Price > b.Price
        // ))
    }, [available])

    const calculateBudget = () => {
        let i;
        let spent = 0
        for (i in currentTeam){
            // setBudget(200 - currentTeam[i].Price);
            spent += currentTeam[i].Price;
            // console.log(budget);
        }
        setBudget(200-spent);
    }

    return (
        <div>
            <h1>Mocktion Draft 2021</h1>
            <h3>AKA How to Prepare for your Auction Draft</h3>
            <Container>
                <Row>
                    <Col style={{float: 'left'}} sm={8}>
                        <h4>All Available Players</h4>
                        <AvailablePlayers style={{float: 'left'}} setAvailable={setAvailable} setCurrentTeam={setCurrentTeam} available={available} currentTeam={currentTeam}/>
                    </Col>
                    <Col style={{float: 'right'}} sm={4}>
                        <h4>Current Team</h4>
                        <h4>Remaining Budget: {budget}</h4>
                        <CurrentTeam currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} available={available} setAvailable={setAvailable}/>
                    </Col>
                </Row>
            </Container>
            {/* <AvailablePlayers/> */}
        </div>
    )
}

export default Home;