import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {Loading, Container, Owner} from './styles';
import api from '../../services/api';

export default function Repos({match}){
    const { inputRepositorio } = useParams();
    
    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(()=> {
      
      async function load(){
        const nomeRepo = decodeURIComponent(inputRepositorio);

        console.log(nomeRepo);
  
        const [repositorioData, issuesData] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params:{
              state: 'open',
              per_page: 5
            }
          })
        ]);

            console.log(repositorioData);
            setRepositorio(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        load();

    }, []);

    
    if(loading){
        return(
            <Loading>
                <h1>A carregar dados</h1>
            </Loading>
        )
    }else{

        if (!repositorio) return null;

        return(
            <Container>
                <Owner>
                    <img 
                    src={repositorio?.owner.avatar_url} 
                    alt={repositorio?.owner.login}
                    />
                    <h1>{repositorio.name}</h1>
                    <p>{repositorio.description}</p>
                </Owner>
            </Container>
        )
    }
}