import React from 'react';
import {useState, useEffect} from 'react'
import AuctionValues from '../data/auction-values-2021.json' ;
import AvailablePlayers from '../components/AvailablePlayers';
import CurrentTeam from '../components/CurrentTeam';
// import {AvailablePlayers, CurrentTeam} from '../components/';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Container, Row, Col} from 'react-bootstrap';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';



export const Home = () => {
    const [currentTeam, setCurrentTeam] = useState([]);
    const [available, setAvailable] = useState([]);
    const [budget, setBudget] = useState(200);
    const [position, setPosition] = useState("ALL");
    const positions = ["ALL", "RB", "WR", "TE", "DST", "K"];

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

    const handlePositionChange = (event) => {
        setPosition(event.target.value);
        console.log(event.target.value);
        if (event.target.value != "ALL") {
            setAvailable(AuctionValues.filter(player =>  {
                return player.Position === event.target.value && !currentTeam.includes(player)}))
        }
        else {
            setAvailable(AuctionValues.filter(player => {
                return !currentTeam.includes(player)}))
        }
    }

    return (
        <div>
            <h1>Mocktion Draft 2021</h1>
            <h3>AKA How to Prepare for your Auction Draft</h3>
            <Container>
                <Row>
                    <Col style={{float: 'left'}} sm={8}>
                        <h4>All Available Players</h4>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value= {position}
                            onChange={handlePositionChange}
                            >
                            <MenuItem value={"ALL"}>ALL</MenuItem>
                            <MenuItem value={"QB"}>QB</MenuItem>
                            <MenuItem value={"RB"}>RB</MenuItem>
                            <MenuItem value={"WR"}>WR</MenuItem>
                            <MenuItem value={"TE"}>TE</MenuItem>
                            <MenuItem value={"DST"}>DST</MenuItem>
                            <MenuItem value={"K"}>K</MenuItem>
                        </Select>
                            {/* <FormHelperText>Label + placeholder</FormHelperText> */}
                        <AvailablePlayers style={{float: 'left'}} setAvailable={setAvailable} setCurrentTeam={setCurrentTeam} available={available} currentTeam={currentTeam}  />
                    </Col>
                    <Col style={{top: '1em', right: '1em', position: 'fixed'}} sm={4}>
                        <h4>Current Team</h4>
                        <h4>Remaining Budget: {budget}</h4>
                        <CurrentTeam currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} available={available} setAvailable={setAvailable} budget={budget} setBudget = {setBudget} position={position} AuctionValues={AuctionValues}/>
                    </Col>
                </Row>
            </Container>
            {/* <AvailablePlayers/> */}
        </div>
    )
}

export default Home;