import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {Loading, Container, Owner, BackButton, IssuesList, Pagination} from './styles';
import { FaArrowLeft } from "react-icons/fa6";
import api from '../../services/api';

export default function Repos({match}){
    const { inputRepositorio } = useParams();
    
    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); 
  
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

    useEffect(()=> {

        async function loadIssue(){
            const nomeRepo = decodeURIComponent(inputRepositorio);

            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params:{
                    state: 'open',
                    page,
                    per_page: 5,
                },
            });

            setIssues(response.data);
        }

        loadIssue();

    } , [page]);

    function handlePage(action){
        setPage(action === 'back' ? page - 1 : page + 1);
    }
    
    if(loading){
        return(
            <Loading>
                <h1>A carregar dados...</h1>
            </Loading>
        )
    }else{

        if (!repositorio) return null;

        return(
            <Container>
                <BackButton to="/">
                    <FaArrowLeft color="#000" size={30}/>
                </BackButton>
                <Owner>
                    <img 
                    src={repositorio?.owner.avatar_url} 
                    alt={repositorio?.owner.login}
                    />
                    <h1>{repositorio.name}</h1>
                    <p>{repositorio.description}</p>
                </Owner>

                <IssuesList>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login}/>

                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}

                                </strong>

                                <p>{issue.user.login}</p>

                            </div>
                        </li>
                    ))}
                </IssuesList>

                <Pagination>
                    <button 
                    type="button" 
                    onClick={()=> handlePage('back')}
                    disabled={page < 2}>
                        Anterior
                    </button>
                    
                    <button type="button" onClick={()=> handlePage('next')}>
                        Seguinte
                    </button>
                </Pagination>
            </Container>
        )
    }
}