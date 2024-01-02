'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react';
import httpClient from './utils/httpClient';

export default function Home() {

  const[listaPao, setListaPao] = useState([]);
  const[listaHamburguer, setListaHamburguer] = useState([]);
  const[listaQueijo, setListaQueijo] = useState([]);
  const[listaAcompanhamento, setListaAcompanhamento] = useState([]);

  const nome = useRef('');
  const pao = useRef(0);
  const hamburguer = useRef(0);
  const queijo = useRef(0);
  const acompanhamento = useRef(0);


  function cadastrarPedido(){
    if(nome.current.value != "" && pao.current.value != 0 && hamburguer.current.value != 0 && queijo.current.value != 0 && acompanhamento.current.value != 0){
        httpClient.post('/pedido/gravar',{
            nome: nome.current.value,
            pao: pao.current.value,
            hamburguer: hamburguer.current.value,
            queijo: queijo.current.value,
            acompanhamento: acompanhamento.current.value
        })
        .then(r=>{
            return r.json();
        })
        .then(r=>{
            alert(r.msg);
            nome.current.value = "";
            pao.current.value = 0;
            hamburguer.current.value = 0;
            queijo.current.value = 0;
            acompanhamento.current.value = 0;
        })
    }
    else{
      alert("Preencha todos os campos");
    }
  }


  function carregarPao() {
    httpClient.get('/pedido/pao/listar')
    .then(r => {
        return r.json();
    })
    .then(r => {
      setListaPao(r);
    })
  }

  
  function carregarHamburguer() {
    httpClient.get('/pedido/hamburguer/listar')
    .then(r => {
        return r.json();
    })
    .then(r => {
      setListaHamburguer(r);
    })
  }

  
  function carregarQueijo() {
    httpClient.get('/pedido/queijo/listar')
    .then(r => {
        return r.json();
    })
    .then(r => {
      setListaQueijo(r);
    })
  }

  
  function carregarAcompanhamento() {
    httpClient.get('/pedido/acompanhamento/listar')
    .then(r => {
        return r.json();
    })
    .then(r => {
      setListaAcompanhamento(r);
    })
  }

  useEffect((e) => {
    carregarAcompanhamento();
    carregarHamburguer();
    carregarPao();
    carregarQueijo();
  }, [])

  return (
      <div id="content-wrapper" className="d-flex flex-column">

      <div id="content">

          <nav style={{color: "white"}} className="navbar navbar-expand bg-danger topbar mb-4 static-top shadow">
              <div style={{display: 'flex', alignSelf: 'end'}}>
                  <h3><i class="fas fa-hamburger"></i> Jurandir Lanches</h3>
              </div>
              <ul className="navbar-nav ml-auto">
                  
                  <div className="topbar-divider d-none d-sm-block"></div>

                  
                  <li className="nav-item dropdown no-arrow">
                      <a className="btn btn-warning" href="/admin">
                          Acesso administrativo
                      </a>
                  
                  </li>

              </ul>

          </nav>
          

          
          <div className="container-fluid">
          
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <div>
                      <img width={600} src="Jurandir.png"></img>
                  </div>
                  <div style={{marginTop: 20}}>
                      <div>
                          <h2>Faça o seu pedido abaixo:</h2>
                          <div>
                              <div className="form-group">
                                  <label>Seu nome:</label>
                                  <input ref={nome} className="form-control" type="text" />
                              </div>
                          </div>
                          <hr></hr>
                          <h4>Monte o seu lanche:</h4>


                          <div className="form-group">
                              <label>Pão</label>
                              <select ref={pao} className="form-control">
                                  <option value={0}>--Selecione--</option>
                                  {
                                    listaPao.map(function(value, index) {
                                        return <option value={value.paoId}>{value.paoDescricao}</option>
                                    })
                                  }
                              </select>
                          </div>
                          <div className="form-group">
                              <label>Hamburguer</label>
                              <select ref={hamburguer} className="form-control">
                                  <option value={0}>--Selecione--</option>
                                  {
                                    listaHamburguer.map(function(value, index) {
                                        return <option value={value.hamburguerId}>{value.hamburguerDescricao}</option>
                                    })
                                  }
                              </select>
                          </div>
                          <div className="form-group">
                              <label>Queijo</label>
                              <select ref={queijo} className="form-control">
                                  <option value={0}>--Selecione--</option>
                                  {
                                    listaQueijo.map(function(value, index) {
                                        return <option value={value.queijoId}>{value.queijoDescricao}</option>
                                    })
                                  }
                              </select>
                          </div>
                          <div className="form-group">
                              <label>Acompanhamento</label>
                              <select ref={acompanhamento} className="form-control">
                                  <option value={0}>--Selecione--</option>
                                  {
                                    listaAcompanhamento.map(function(value, index) {
                                        return <option value={value.acompanhamentoId}>{value.acompanhamentoDescricao}</option>
                                    })
                                  }
                              </select>
                          </div>

                          <div>
                              <button onClick={cadastrarPedido} className="btn btn-success">Enviar pedido!</button>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
          

      </div>
      

      
      <footer className="sticky-footer bg-white">
          <div className="container my-auto">
              <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Jurandir Lanches 2023</span>
              </div>
          </div>
      </footer>
      

  </div>
  )
}
