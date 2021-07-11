import React, {useState, useEffect} from 'react';
import AuctionValues from '../data/auction-values-2021.json';
import Button from '@material-ui/core/Button';



export const AvailablePlayers = (props) => {
    
    const addToTeam = (player) => {
        props.setAvailable(props.available.filter(el => {
            return el !== player;
        }))
        if (!props.currentTeam.includes(player)){
            props.setCurrentTeam([...props.currentTeam, player]);
        }
        // console.log(currentTeam);
    }

    // const calculateBudget = () => {
    //     let i;
    //     for (i in props.currentTeam){
    //         setBudget(budget - currentTeam[i].Price);
    //         console.log(budget);
    //     }
    // }

    return (
        <div>
            
            {/* {props.currentTeam.map(el => (
                <div>{el.Overall}</div>
            ))} */}
            {/* {calculateBudget()} */}
            {props.available.map(el => (
                // return (
                <div>
                    <Button onClick={() => addToTeam(el)}>{el.Overall}: {el.Value}</Button>
                </div>
                // )
            ))}
        </div>
    )
}

export default AvailablePlayers;