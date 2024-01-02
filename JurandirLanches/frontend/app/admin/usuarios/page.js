'use client'
import httpClient from "@/app/utils/httpClient";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Usuarios() {

    const [listaUsuario, setListaUsuarios] = useState([]);

    function carregarUsuarios() {

        httpClient.get('/usuario/listar')
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            setListaUsuarios(r);
        })
    }

    function excluirUsuario(id){

        if(confirm("Tem certeza que deseja excluir?")) {
            httpClient.delete(`/usuario/excluir/${id}`)
            .then(r => {
                return r.json();
            })
            .then(r => {
                alert(r.msg);
                carregarUsuarios();
            })
        }

    }

    useEffect(() => {
        carregarUsuarios();
    },[])

    return (
        <div>
            <h1>Usuários cadastrados</h1>
            <div>
                <a href="/admin/usuarios/criar" style={{marginTop: 10, marginBottom: 10}} className="btn btn-primary" >Cadastrar usuário</a>
            </div>
            <div className="table-responsive">
                {
                    listaUsuario.length > 0 ?
                    <table className="table table-hover">
                        <thead>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Perfil</th>
                            <th>Ativo</th>
                            <th>Ações</th>
                        </thead>

                        <tbody>
                            {
                                listaUsuario.map(function(value, index) {
                                    return <tr key={index}>
                                                <td>{value.id}</td>
                                                <td>{value.nome}</td>
                                                <td>{value.email}</td>
                                                <td>{value.perfilId}</td>
                                                <td>{value.ativo}</td>
                                                <td>
                                                    <Link className="btn btn-primary" style={{marginRight: 5}} href={`/admin/usuarios/alterar/${value.id}`}>
                                                        <i className="fas fa-pen"></i>
                                                    </Link>
                                                    <button onClick={() => excluirUsuario(value.id)} className="btn btn-danger">
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </table>
                    :
                    <></>
                }
            </div>
        </div>
    )
}