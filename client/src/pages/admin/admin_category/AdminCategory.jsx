import React , {useState , useContext} from 'react';
import { GlobalState } from '../../../GlobalState';
import Button from '../../../components/button/Button';
import axios from 'axios';
import './admin_category.scss';

const AdminCategory = () => {

    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const [category, setCategory] = useState('');
    const [token] = state.token;
    const [callback, setCallback] = state.categoriesAPI.callback;
    const [onEdit, setOnEdit] = useState(false);
    const [id, setID] = useState('');

    

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    
    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)

        console.log(id,name);
    }

    const deleteCategory = async id =>{
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    

  return (
    <div className="categories">

        <div className="section-title">
          Category
        </div>

        <div className="content">
        


        <form action="" onSubmit={createCategory}>
            <h2>{onEdit? "Update Category" : "Create Category"}</h2>
            <input type="text" name="category" value={category} required
                onChange={e => setCategory(e.target.value)} placeholder={onEdit? "Update Category" : "Create Category"}/>
            <Button size={'sm-1'} type="submit">{onEdit? "Update" : "Create"}</Button>
        </form>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>
            {
                categories.map(category => (
                    <tr  key={category._id}>
                        <td>{category.name}</td>
                        <td> <Button size={'sm-1'}  onClick={() => editCategory(category._id, category.name)}>Edit</Button></td>
                        <td><Button size={'sm-1'} bg='red' onClick={() => deleteCategory(category._id)}>Delete</Button></td>
                    </tr>
                    ))
                }
            </tbody>
                
        </table>
        </div>


    </div>
  )
}

export default AdminCategory