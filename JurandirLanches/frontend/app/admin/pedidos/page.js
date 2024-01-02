'use client'
import httpClient from "@/app/utils/httpClient"
import { useEffect, useState } from "react";

export default function Pedidos(){

    const[listaPedidos, setListaPedidos] = useState([]);

    function listarPedidos(){
        httpClient.get('/pedido/listar')
        .then(r=>{
            return r.json();
        })
        .then(r=>{
            setListaPedidos(r);
        })
    }

    useEffect(()=>{
        listarPedidos();
    },[]);

    return(
        <div>
            <h1>Pedidos</h1>

            {
                listaPedidos.length > 0 ?
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nº Pedido</th>
                                <th>Nome</th>
                                <th>Data</th>
                                <th>Pão</th>
                                <th>Hamburguer</th>
                                <th>Queijo</th>
                                <th>Acompanhamento</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                listaPedidos.map(function(value,index){
                                    return(
                                        <tr>
                                            <th>{value.pedidoId}</th>
                                            <th>{value.nome}</th>
                                            <td>{new Date(value.pedidoData).toLocaleString()}</td>
                                            <th>{value.pao.paoDescricao}</th>
                                            <td>{value.hamburguer.hamburguerDescricao}</td>
                                            <td>{value.queijo.queijoDescricao}</td>
                                            <td>{value.acompanhamento.acompanhamentoDescricao}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                :
                <></>
            }
        </div>
    )
}