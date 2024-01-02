'use client'
import { useEffect, useRef, useState } from "react"
import httpClient from "../utils/httpClient";

export default function UsuarioForm(props) {

    const nome = useRef("");
    const email = useRef("");
    const perfil = useRef(0);
    const senha = useRef("");
    const ativo = useRef(false);

    const[usuario, setUsuario] = props.usuario ? useState(props.usuario) : useState({id: 0, nome: "", email: "", perfilId: 0, ativo: "N", senha: ""})
    const[listaPerfil, setListaPerfil] = useState([]);
    function alterarUsuario() {
        let status = 0;
        if(nome.current.value != "" &&
        email.current.value != "" &&
        perfil.current.value != 0 &&
        senha.current.value != ""){

            httpClient.put('/usuario/alterar', {
                id: usuario.id,
                nome: nome.current.value,
                email: email.current.value,
                perfilId: perfil.current.value,
                senha: senha.current.value,
                ativo: ativo.current.checked ? "S" : "N"
            })
            .then(r=> {
                status = r.status;
                return r.json();
            })
            .then(r=> {
                alert(r.msg);
                if(status == 200){
                    window.location.href = "/admin/usuarios"
                }
            })
        }
    }

    function carregarPerfil() {
        httpClient.get('/perfil/listar')
        .then(r => {
            return r.json();
        })
        .then(r => {
            setListaPerfil(r);
        })
    }

    function cadastrarUsuario() {
        let status = 0;
        if(nome.current.value != "" && 
            email.current.value != "" &&
            perfil.current.value != 0 &&
            senha.current.value != "") {
            
            httpClient.post('/usuario/criar', {
                nome: nome.current.value,
                email: email.current.value,
                perfilId: perfil.current.value,
                senha: senha.current.value,
                ativo: ativo.current.checked ? "S" : "N"
              })
            .then(r=> {
                status = r.status;
                return r.json();
            })
            .then(r=> {
                alert(r.msg);
                if(status == 200){
                    nome.current.value = "";
                    email.current.value = "";
                    perfil.current.value = 0;
                    senha.current.value = "";
                    ativo.current.checked = false;
                }
            })
        }
        else{
            alert("Preencha os campos corretamente!");
        }
    }

    useEffect(() => {
        carregarPerfil();
    }, [])

    return (
        <div>
            <div>
                <h1>{usuario.id != 0 ? "Alterar usuário" : "Cadastrar usuário"}</h1>
            </div>
            <div>
                <div className="form-group">
                    <label>Nome:</label>
                    <input defaultValue={usuario.nome} ref={nome} type="text" className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input defaultValue={usuario.email} ref={email} type="email" className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Perfil:</label>
                    <select defaultValue={usuario.perfilId} ref={perfil} className="form-control">
                        <option value={0}>--Selecione--</option>
                        {
                            listaPerfil.map(function(value, index) {
                                if(usuario != null && usuario.perfilId == value.perfilId)
                                    return <option selected value={value.perfilId}>{value.perfilDescricao}</option>
                                else
                                    return <option value={value.perfilId}>{value.perfilDescricao}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input defaultValue={usuario.senha} ref={senha} type="password" className="form-control"></input>
                </div>
                <div className="form-group">
                    <label><input defaultChecked={usuario.ativo == "S" ? true : false} ref={ativo} type="checkbox"></input> Ativo</label>
                </div>

                <div>
                    <button onClick={usuario.id != 0 ? alterarUsuario : cadastrarUsuario} style={{marginRight: 5}} className="btn btn-primary">{usuario.id != 0 ? "Alterar" : "Cadastrar"}</button>
                    <a href="/admin/usuarios" className="btn btn-secondary">Voltar</a>
                </div>
            </div>
        </div>
    )
}