'use client'
import { useRef } from "react"
import httpClient from "../utils/httpClient";


export default function Login() {

    const email = useRef('');
    const senha = useRef('');

    function autenticar() {
        let status = 0;
        if(email.current.value != '' && senha.current.value != ''){
            httpClient.post('/login/autenticar', {
                email: email.current.value,
                senha: senha.current.value
            })
            .then(r=> {
                status = r.status;
                return r.json();
            })
            .then(r=> {
                if(status == 200){
                    window.location.href = '/admin';
                }
                else{
                    alert(r.msg);
                }
            })
        }
        else{
            alert("Preencha os campos corretamente!");
        }
    }

    return (
        <div className="container">
        <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Bem vindo!</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group">
                                            <input ref={email} type="email" className="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Insira seu email..." />
                                        </div>
                                        <div className="form-group">
                                            <input ref={senha} type="password" className="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Senha" />
                                        </div>
                                        <button type="button" onClick={autenticar} className="btn btn-primary btn-user btn-block">
                                            Login
                                        </button>
                                        <hr />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    )
}