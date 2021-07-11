import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';


export const CurrentTeam = (props) => {

    const [teamStruct, setTeamStruct] = useState(
        {
            QB: [],
            RB: [],
            WR: [],
            TE: [],
            DST: [],
            K: [],
        }
    );
    const [flex, setFlex] = useState();
    const [starters, setStarters] = useState([]);
    const [bench, setBench] = useState([]);
    const emptyTeamStruct = {
        QB: [],
        RB: [],
        WR: [],
        TE: [],
        DST: [],
        K: [],
    }

    useEffect(() => {
        updateTeamStruct();
    }, [props.currentTeam])
    
    useEffect(() => {
        if (teamStruct.RB.length >= 3 & teamStruct.WR.length <= 2) {
            setFlex(teamStruct.RB[2])
        }
        else if (teamStruct.RB.length <= 2 & teamStruct.WR.length >= 3){
            setFlex(teamStruct.WR[2])
        }
        let i;
        if (teamStruct.QB[0] && teamStruct.QB.length <= 1 & !starters.includes(teamStruct.QB[0])){
            setStarters([...starters, teamStruct.QB[0]]);
        }
        if (teamStruct.RB.length <= 2){
            for (i in teamStruct.RB) {
                if (!starters.includes(teamStruct.RB[i])){
                    setStarters([...starters, teamStruct.RB[i]]);
                }
                if (teamStruct.RB[i] === flex){
                    setFlex();
                }
            }
        }
        if (teamStruct.WR.length <= 2){
            for (i in teamStruct.WR) {
                if (!starters.includes(teamStruct.WR[i])){
                    setStarters([...starters, teamStruct.WR[i]]);
                }
                if (teamStruct.WR[i] === flex){
                    setFlex();
                }
            }
        }
        if (teamStruct.TE[0] && teamStruct.TE.length <= 1 & !starters.includes(teamStruct.TE[0])){
            setStarters([...starters, teamStruct.TE[0]]);
        }
        if (teamStruct.DST[0] && teamStruct.DST.length <=1 & !starters.includes(teamStruct.DST[0])){
            setStarters([...starters, teamStruct.DST[0]])
        }
        if (teamStruct.K[0] && teamStruct.K.length <=1 & !starters.includes(teamStruct.K[0])){
            setStarters([...starters, teamStruct.K[0]])
        }
        setBench([]);
        setBench([...teamStruct.QB,
            ...teamStruct.RB,
            ...teamStruct.WR,
            ...teamStruct.TE,
            ...teamStruct.DST,
            ...teamStruct.K].filter(el =>!starters.includes(el)));
        console.log(bench);
    }, [teamStruct, starters])

    useEffect(()=> {
        if (flex && !starters.includes(flex)){
            setStarters([...starters, flex]);
        }
    }, [flex])

    const updateTeamStruct = () => {
        let i;
        console.log('updateTeamStruct called');
        // setTeamStruct(
        //     {
        //         QB: [],
        //         RB: [],
        //         WR: [],
        //         TE: [],
        //         DST: [],
        //         K: [],
        //     }
        // );
        for (i in props.currentTeam){
            // if (props.currentTeam[i].Position === 'QB' && teamStruct)
            // console.log(props.currentTeam[i])
            if (!teamStruct[props.currentTeam[i].Position].includes(props.currentTeam[i])){
                setTeamStruct({...teamStruct, [props.currentTeam[i].Position]:[...teamStruct[props.currentTeam[i].Position], props.currentTeam[i]]});
            }
        }
    }

    const clearTeam = () => {
        setTeamStruct(emptyTeamStruct);
        setStarters([]);
        setBench([]);
        setFlex();
        props.setCurrentTeam([]);
        props.setBudget(200);
        if (props.position === "ALL") {
            props.setAvailable(props.AuctionValues)
        }
        else {
            props.setAvailable(props.AuctionValues.filter(player => {
                return player.Position === props.position && props.AuctionValues.includes(player)}
                ))
        }

    }

    const removeFromTeam = (player) => {
        try {
            console.log(player);
            props.setCurrentTeam(props.currentTeam.filter(el => {
                return el !== player;
            }));
            console.log(teamStruct[player.Position].filter(
                el => {
                    return el !==player;
                }
            ))
            setTeamStruct({...teamStruct, [player.Position]: teamStruct[player.Position].filter(
                el => {
                    return el !==player;
                }
            )})
            // console.log(starters);
            setStarters(starters.filter(el => {
                return el !== player
            }))
            if (player === flex){
                setFlex(null);
            }
            // setBench([...teamStruct.QB,
            //     ...teamStruct.RB,
            //     ...teamStruct.WR,
            //     ...teamStruct.TE,
            //     ...teamStruct.DST,
            //     ...teamStruct.K].filter(el => !starters.includes(el)));
            console.log(bench);

            if (!props.available.includes(player)){
                props.setAvailable([...props.available, player].sort(
                    (a,b) => b.Price-a.Price
                ));
                // console.log()
            }
        }
        catch (error){
            console.log(error);
        }
    }

    return (
        <div>
            <Button onClick={()=>clearTeam()}>Clear Team</Button>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow onClick={() => console.log('header clicked')}>
                            <TableCell>Position</TableCell>
                            <TableCell>Player</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow onClick={()=>removeFromTeam(teamStruct.QB[0])}>
                            <TableCell>QB</TableCell>
                            <TableCell>{teamStruct.QB[0] && teamStruct.QB[0].Name}</TableCell>
                            <TableCell>{teamStruct.QB[0] && teamStruct.QB[0].Team}</TableCell>
                            <TableCell>{teamStruct.QB[0] && teamStruct.QB[0].Value}</TableCell>
                            {/* <TableCell> */}
                            {teamStruct.QB[0] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(teamStruct.QB[0])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                            {/* </TableCell> */}
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(teamStruct.RB[0])}>
                            <TableCell>RB</TableCell>
                            <TableCell>{teamStruct.RB[0] && teamStruct.RB[0].Name}</TableCell>
                            <TableCell>{teamStruct.RB[0] && teamStruct.RB[0].Team}</TableCell>
                            <TableCell>{teamStruct.RB[0] && teamStruct.RB[0].Value}</TableCell>
                            {teamStruct.RB[0] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(teamStruct.RB[0])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(teamStruct.RB[1])}>
                            <TableCell>RB</TableCell>
                            <TableCell>{teamStruct.RB[1] && teamStruct.RB[1].Name}</TableCell>
                            <TableCell>{teamStruct.RB[1] && teamStruct.RB[1].Team}</TableCell>
                            <TableCell>{teamStruct.RB[1] && teamStruct.RB[1].Value}</TableCell>
                            {teamStruct.RB[1] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(teamStruct.RB[1])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(teamStruct.WR[0])}>
                            <TableCell>WR</TableCell>
                            <TableCell>{teamStruct.WR[0] && teamStruct.WR[0].Name}</TableCell>
                            <TableCell>{teamStruct.WR[0] && teamStruct.WR[0].Team}</TableCell>
                            <TableCell>{teamStruct.WR[0] && teamStruct.WR[0].Value}</TableCell>
                            {teamStruct.WR[0] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(teamStruct.WR[0])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(teamStruct.WR[1])}>
                            <TableCell>WR</TableCell>
                            <TableCell>{teamStruct.WR[1] && teamStruct.WR[1].Name}</TableCell>
                            <TableCell>{teamStruct.WR[1] && teamStruct.WR[1].Team}</TableCell>
                            <TableCell>{teamStruct.WR[1] && teamStruct.WR[1].Value}</TableCell>
                            {teamStruct.WR[1] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(teamStruct.WR[1])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(teamStruct.TE[0])}>
                            <TableCell>TE</TableCell>
                            <TableCell>{teamStruct.TE[0] && teamStruct.TE[0].Name}</TableCell>
                            <TableCell>{teamStruct.TE[0] && teamStruct.TE[0].Team}</TableCell>
                            <TableCell>{teamStruct.TE[0] && teamStruct.TE[0].Value}</TableCell>
                            {teamStruct.TE[0] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(teamStruct.TE[0])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(flex)}>
                            <TableCell>FLEX</TableCell>
                            <TableCell>{flex && flex.Name}</TableCell>
                            <TableCell>{flex && flex.Team}</TableCell>
                            <TableCell>{flex && flex.Value}</TableCell>
                            {flex && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(flex)}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(teamStruct.DST[0])}>
                            <TableCell>DST</TableCell>
                            <TableCell>{teamStruct.DST[0] && teamStruct.DST[0].Name}</TableCell>
                            <TableCell>{teamStruct.DST[0] && teamStruct.DST[0].Team}</TableCell>
                            <TableCell>{teamStruct.DST[0] && teamStruct.DST[0].Value}</TableCell>
                            {teamStruct.DST[0] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(teamStruct.DST[0])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(teamStruct.K[0])}>
                            <TableCell>K</TableCell>
                            <TableCell>{teamStruct.K[0] && teamStruct.K[0].Name}</TableCell>
                            <TableCell>{teamStruct.K[0] && teamStruct.K[0].Team}</TableCell>
                            <TableCell>{teamStruct.K[0] && teamStruct.K[0].Value}</TableCell>
                            {teamStruct.K[0] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(teamStruct.K[0])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        {/* {teamStruct.RB.filter(el => ![teamStruct.RB[0], teamStruct.RB[1], flex].includes(el)).map(
                            el => (
                                <TableRow>
                                    <TableCell>BENCH</TableCell>
                                    <TableCell>{el.Overall}</TableCell>
                                </TableRow>
                            )
                        )} */}
                        <TableRow onClick={()=>removeFromTeam(bench[0])}>
                            <TableCell>BENCH</TableCell>
                            <TableCell>{bench[0] && bench[0].Name}</TableCell>
                            <TableCell>{bench[0] && bench[0].Team}</TableCell>
                            <TableCell>{bench[0] && bench[0].Value}</TableCell>
                            {bench[0] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(bench[0])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(bench[1])}>
                            <TableCell>BENCH</TableCell>
                            <TableCell>{bench[1] && bench[1].Name}</TableCell>
                            <TableCell>{bench[1] && bench[1].Team}</TableCell>
                            <TableCell>{bench[1] && bench[1].Value}</TableCell>
                            {bench[1] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(bench[1])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(bench[2])}>
                            <TableCell>BENCH</TableCell>
                            <TableCell>{bench[2] && bench[2].Name}</TableCell>
                            <TableCell>{bench[2] && bench[2].Team}</TableCell>
                            <TableCell>{bench[2] && bench[2].Value}</TableCell>
                            {bench[2] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(bench[2])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(bench[3])}>
                            <TableCell>BENCH</TableCell>
                            <TableCell>{bench[3] && bench[3].Name}</TableCell>
                            <TableCell>{bench[3] && bench[3].Team}</TableCell>
                            <TableCell>{bench[3] && bench[3].Value}</TableCell>
                            {bench[3] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(bench[3])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(bench[4])}>
                            <TableCell>BENCH</TableCell>
                            <TableCell>{bench[4] && bench[4].Name}</TableCell>
                            <TableCell>{bench[4] && bench[4].Team}</TableCell>
                            <TableCell>{bench[4] && bench[4].Value}</TableCell>
                            {bench[4] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(bench[4])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                        <TableRow onClick={()=>removeFromTeam(bench[5])}>
                            <TableCell>BENCH</TableCell>
                            <TableCell>{bench[5] && bench[5].Name}</TableCell>
                            <TableCell>{bench[5] && bench[5].Team}</TableCell>
                            <TableCell>{bench[5] && bench[5].Value}</TableCell>
                            {bench[5] && 
                            <Button style={{top: '50%'}} onClick={()=>removeFromTeam(bench[5])}>
                                <CloseIcon fontSize='small'/>
                            </Button>
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CurrentTeam;