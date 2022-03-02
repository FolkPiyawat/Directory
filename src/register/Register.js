import React, {Component} from "react";
import axios from "axios";
import {ip,port} from "../setIP/setting";

export default class Register extends Component{
    constructor() {
        super();
        this.state = {
            idkey:"",
            firstname:"",
            lastname:"",
            email:window.localStorage.getItem('email'),
            zodiac:"",
            zo_list:[]
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.idkey,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            email:window.localStorage.getItem('email'),
            zodiac:this.state.zodiac
        }
        axios.post(url,data)
        this.setState({
            idkey:"",
            firstname:"",
            lastname:"",
            email:"",
            zodiac:""
        });
    }

    componentDidMount() {
        this.getData();
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/data2')
            .then(res => res.json())
            .then(list => this.setState({ zo_list:list }))
        console.log("after fetch data");
    }

    render() {
        return(
            <div>
                <div className="App">
                <h2 className="my-4">Register<br/></h2>
                    <hr/>
                </div>
                <form className="container">
                    <div className="form-group">
                        <label className="text-white" >First Name</label>
                        <input type="text" className="form-control" id="firstname" onChange={this.handleChang} value={this.state.firstname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Last Name</label>
                        <input type="text" className="form-control" id="lastname" onChange={this.handleChang} value={this.state.lastname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  htmlFor="id">Id</label>
                        <input type="text" className="form-control" size="10" id="idkey" onChange={this.handleChang} value={this.state.idkey}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  htmlFor="id">email</label>
                        <input type="text" className="form-control" id="email" onChange={this.handleChang} value={this.state.email}/>
                    </div>
                    <div>
                        <label className="text-white"  htmlFor="id">Zodiac</label>
                        <select className="form-group" id="zodiac" value={this.state.zodiac} onChange={this.handleChang} required>
                            <option value=""> </option>
                                {this.state.zo_list.map(item => {
                                    return <option value={item.id}>{item.zodiac_name}</option>
                                })}
                        </select>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                </form>
            </div>
        );
    }
}
