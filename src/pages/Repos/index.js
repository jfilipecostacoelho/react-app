import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {Container} from './styles';
import api from '../../services/api';

export default function Repos({match}){
    const { repositorio } = useParams();

    useEffect(() => {
        console.log("useEffect foi chamado");
        
        async function load(){
            
            const nomeRepo = decodeURIComponent(repositorio);

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`)
            ]);

            console.log(repositorioData.data);
            console.log(issuesData.data);
        }

        load();

    }, []);

    return(

        <Container>
 
        </Container>
    )
}