import React from 'react'
import Axios from 'axios'
import { urlApi } from '../urlAPI/urlAPI'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
class Home extends React.Component{

    state = {
        dataProfile: [],
        selectedValue: [],
        searchPekerjaan: ''
    }
    
    componentDidMount(){
        this.onGetData()
        this.onUniqValue()
        
    }

    onGetData = () => {
        Axios.get(urlApi+'profile')
        .then((res)=>{
            console.log(res)
            console.log(this.state.dataProfile)
            if(this.state.searchPekerjaan === ''){
                this.setState({dataProfile: res.data})
            }else{
                let filterData = res.data.filter((val)=>{
                    return val.pekerjaan === this.state.searchPekerjaan
                }) 
                this.setState({dataProfile : filterData})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onAddData = () => {
        let nama = this.refs.nama.value
        let usia = this.refs.usia.value
        let pekerjaan = this.refs.pekerjaan.value

        let data = {
            nama : nama,
            usia: Number(usia),
            pekerjaan: pekerjaan
        }

        if(nama && usia && pekerjaan){
            Axios.post(urlApi+'profile', data)
            .then((res)=>{
                console.log(res)
                Swal.fire({
                    icon:'success',
                    title:'Update Berhasil',
                    timer:3000,
                })
                window.location='/post'
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            Swal.fire({
                icon: 'info',
                title: 'Form must be filled',
                showConfirmButton: false,
            })
        }
    }

    onDeleteData = (id, nama) => {
        Swal.fire({
            title : "Delete data",
            text : `Yakin akan menghapus data ${nama} ?`,
            showCancelButton : true,
            icon : 'warning',
            cancelButtonColor :'red'
        })
        .then((val)=>{
            if(val.value){
                Axios.delete(urlApi+'profile/'+id)
                .then((res)=>{
                    console.log(res)
                    Swal.fire('Delete Berhasil')
                    this.onGetData()
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
    }

    onDeleteAllData = () => {
        Swal.fire({
            title : "Delete data",
            text : `Yakin akan menghapus data semua data ?`,
            showCancelButton : true,
            icon : 'warning',
            cancelButtonColor :'red'
        })
        .then((val)=>{
            if(val.value){
                Axios.get(urlApi+'profile')
                .then((res)=>{
                    console.log(res.data)
                    for(let i=0; i < res.data.length; i++){
                        Axios.delete(urlApi+'profile/' + res.data[i].id)
                        .then((res)=>{
                            console.log(res)
                            this.onGetData()
                        })
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
                // Axios.delete(urlApi+'profile')
                // .then((res)=>{
                //     console.log(res)
                //     Swal.fire('Delete Berhasil')
                //     this.onGetData()
                // })
                // .catch((err)=>{
                //     console.log(err)
                // })
            }
        })
    }

    onUniqValue = () => {
        Axios.get(urlApi+'profile')
        .then((res)=>{
            var pekerjaan = res.data.map((user)=>{
                return user.pekerjaan 
            })
            console.log(pekerjaan)
            this.setState({selectedValue: pekerjaan})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderOptions = () => {
        let option = this.state.selectedValue.filter((val, index, self)=>{
            return self.indexOf(val) === index
        })
        console.log(option)

        return option.map((val)=>{
            return (
                <option value={val}>{val}</option>
            )
        })
    }

    renderDataProfile = () => {
        
        if(this.state.dataProfile.length === 0){
            return (
                <h2>Data Kosong</h2>
            )
        }  
        return this.state.dataProfile.map((val, index)=>{
            return(
                <tr>
                <th scope="row" key={val.id}>{index + 1}</th>
                <td>{val.nama}</td>
                <td>{val.usia}</td>
                <td>{val.pekerjaan}</td>
                <td>
                    <div className='btn btn-danger mr-2' onClick={()=> this.onDeleteData(val.id, val.nama)}>Delete</div>
                    <Link to={'/edit-data/'+ val.id}>
                        <div className='btn btn-primary'>Edit</div>
                    </Link>
                </td>
                </tr>
            )
        })      
    }
    render(){
        
        if(this.state.dataProfile.length === 0){
            return (
                <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select className='form-control'>
                            <option>Filter By Pekerjaan</option>
                        </select>
                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>Nama</td>
                            <td>Usia</td>
                            <td>Pekerjaan</td>
                            <td>Act</td>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-2'> <input type='text' className='form-control' placeholder='Nama' ref='nama' /> </div>
                    <div className='col-md-2'> <input type='text' className='form-control' placeholder='Usia' ref='usia' /> </div>
                    <div className='col-md-2'> <input type='text' className='form-control' placeholder='Pekerjaan' ref='pekerjaan' /> </div>
                    <div className='col-md-2'> <input type='button' className='form-control btn-info' value='add Data' onClick={()=> this.onAddData()} /> </div>
                    <div className='col-md-2'> <input type='button' className='form-control btn-info' onClick={()=> this.onDeleteAllData()} value='Delet All Data'  /> </div>
                </div>
                <h1 className='text-center mt-5'>Datanya Kosong, silahkan add dulu ...</h1>
                </div>
            )
        }
        return(
            <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select className='form-control' onChange={(event)=>(this.setState({searchPekerjaan : event.target.value},this.onGetData()))}>
                            <option value=''>Filter By Pekerjaan</option>
                           {this.renderOptions()}
                        </select>
                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>Nama</td>
                            <td>Usia</td>
                            <td>Pekerjaan</td>
                            <td>Act</td>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-2'> <input type='text' className='form-control' placeholder='Nama' ref='nama' /> </div>
                    <div className='col-md-2'> <input type='text' className='form-control' placeholder='Usia' ref='usia' /> </div>
                    <div className='col-md-2'> <input type='text' className='form-control' placeholder='Pekerjaan' ref='pekerjaan' /> </div>
                    <div className='col-md-2'> <input type='button' className='form-control btn-info' value='add Data' onClick={()=> this.onAddData()} /> </div>
                    <div className='col-md-2'> <input type='button' className='form-control btn-info' onClick={()=> this.onDeleteAllData()} value='Delet All Data'  /> </div>
                </div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Usia</th>
                        <th scope="col">Pekerjaan</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDataProfile()}
                    </tbody>
                </table>
            </div>
            
        )
    }
}

export default Home