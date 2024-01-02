'use client'
import UsuarioForm from "@/app/components/usuarioForm";
import httpClient from "@/app/utils/httpClient";
import { useEffect, useState } from "react";


export default function AlterarUsuario({params: {id}}){

    const [usuario, setUsuario] = useState(null)

    function carregarUsuario() {
        httpClient.get(`/usuario/obter/${id}`)
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            setUsuario(r);
        })
    }

    useEffect(() => {
        carregarUsuario();
    }, [])

    return (
        <div>
            {usuario != null ? <UsuarioForm usuario={usuario}></UsuarioForm> : <h3>Carregando......</h3> } 
        </div>
    )
}