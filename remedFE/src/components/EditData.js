import React, { Component } from 'react'
import Axios from 'axios'
import { urlApi } from '../urlAPI/urlAPI'
import Swal from 'sweetalert2'

export default class EditData extends Component {

    state = {
        dataProfile: null
    }

    componentDidMount(){
        let id = window.location.pathname.split('/')[2]
        this.getDataProfile(id)
    }

    getDataProfile = (param) => {
        Axios.get(urlApi+'profile/'+param)
        .then((res)=>{
            console.log(res)
            this.setState({dataProfile: res.data})

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onSaveData = () => {
        var id = window.location.pathname.split('/')[2]
        var refs = ['nama', 'usia', 'pekerjaan']
        var data = {}

        for(var i=0; i< refs.length; i++){
            if(this.refs[refs[i]].value){
                data[refs[i]] = this.refs[refs[i]].type === 'number' ? Number(this.refs[refs[i]].value) : this.refs[refs[i]].value
            }else{
                return Swal.fire('Error')
            }
        }
        Axios.patch(urlApi+'profile/'+ id, data)
        .then((res)=>{
            console.log(res)
            Swal.fire('Update Success')
            window.location='/post'
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render() {
        if(this.state.dataProfile === null){
            return <h2>Loading</h2>
        }
        return (
            <div className='container'>
            <div className='row mt-3'>
                <h2 className='mx-auto'>Edit Data</h2>
            </div>
            <div className='row mt-4 mb-5'>
                <div className='col-md-5 p-4 mx-auto' style={{height: 300, width:300, borderStyle:'solid', borderRadius: 10, borderWidth: 0.5, borderColor: 'grey'}}>
                    <form>
                        <div className="form-group">
                            <input defaultValue={this.state.dataProfile.nama} type="text" className="form-control" id="name" ref='nama' aria-describedby="emailHelp" />                            
                        </div>
                        <div className="form-group">
                            <input defaultValue={this.state.dataProfile.usia} type="nummber" className="form-control" id="usia" ref='usia' />
                        </div>
                        <div className="form-group">
                            <input defaultValue={this.state.dataProfile.pekerjaan} type="text" className="form-control" id="pekerjaan" ref='pekerjaan' />
                        </div>
                        <div className='btn btn-primary mt-3' style={{width: '100%'}} onClick={()=> this.onSaveData()}>Save</div>
                    </form>
                </div>
            </div>
        </div>          
        )
    }
}
