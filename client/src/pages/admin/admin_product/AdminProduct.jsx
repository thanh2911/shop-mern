import React , {useState , useContext, useEffect , useRef} from 'react';
import { GlobalState } from '../../../GlobalState';
import Modal, {ModalContent} from '../../../components/modal/Modal';
import Pagination from '../../../components/pagination/Pagination';
import axios from 'axios';
import Button from '../../../components/button/Button';
import { GrClose } from 'react-icons/gr'
import './admin_product.scss';

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    color:'',
    slug :'',
    category: '',
    _id: ''
}

const AdminProduct = () => {

    const state = useContext(GlobalState);
    const [product,setProduct] = useState(initialState);
    const [categories] = state.categoriesAPI.categories;
    const [images1, setImages1] = useState(false);
    const [images2, setImages2] = useState(false);

    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;

    const [products] = state.productsAPI.products;
    const [page,setPage] = state.productsAPI.page;
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = state.productsAPI.callback;
    const [category, setCategory] = state.productsAPI.category;
    const [sort, setSort] = state.productsAPI.sort;
    const [search, setSearch] = state.productsAPI.search;
    const [limit, setLimit] = state.productsAPI.limit;

    useEffect(() => {
      const getProducts = async () => {
         setCategory(prev => prev ="")
         setSearch(prev => prev = "")
         setSort(prev => prev ="")
         setPage(prev => prev = 0)
         setLimit(prev => prev = 4)
         setCallback(!callback)
      }
  
      getProducts();
    },[])



   
    const openModal = () => {
      const modal = document.querySelector('#modal-create');
      modal.classList.toggle('active')
    }

    const handleUpload = async (e,img) => {
      e.preventDefault();
      try {
        if(!isAdmin) return alert("You're not an admin");

        const file = e.target.files[0];
  
        if(!file) return alert("File not exist.");
  
        if(file.size > 1024 * 1024) 
        return alert("Size too large!");

        
        if(file.type !== 'image/jpeg' && file.type !== 'image/png') 
        return alert("File format is incorrect.");
  
        let formData = new FormData()
        formData.append('file', file);
        
        const res = await axios.post('/api/upload', formData, {
          headers: {'content-type': 'multipart/form-data', Authorization: token}
        })
  
        if(img === 'img1') {
          setImages1(res.data);
        }
        else if(img === 'img2') {
          setImages2(res.data);
        }
        

        console.log(img);
  
      } catch (error) {
        alert(error.response.data.msg)
      }
     
    }

    const handleDestroy = async (img) => {
      try {
        if(!isAdmin) return alert("You're not an admin")
        await axios.post('/api/destroy', {public_id: images1.public_id}, {
            headers: {Authorization: token}
        })
        
        if(img === 'img1') {
          setImages1(false);
        }
        else if(img === 'img2') {
          setImages2(false);
        }
      } catch (error) {
        alert(error.response.data.msg)
      }
    }

    const handleChangeInput = e => {
      const {name, value} = e.target
      setProduct({...product, [name]:value})
    }

    const handleSubmit = async e => {
      e.preventDefault()
      try {
          if(!isAdmin) return alert("You're not an admin")
          if(!images1) return alert("No Image Upload")

          if(onEdit){
              await axios.put(`/api/products/${product._id}`, {...product, images1,images2}, {
                  headers: {Authorization: token}
              })
          }else{
              await axios.post('/api/products', {...product, images1,images2}, {
                  headers: {Authorization: token}
              })
          }
        
          setProduct(initialState);
          setImages1(false);
          setImages2(false);
          setCallback(!callback);
          setOnEdit(false);
          openModal();
          
          
      } catch (err) {
          alert(err.response.data.msg)
      }
    }

    const editProduct = async (id, {...product}) =>{
      openModal();
      setImages1(product.images1);
      setImages2(product.images2);
      setProduct({...product});
      setOnEdit(true)
    }

    const deleteProduct = async(id, images1,images2) => {
    try {
        const destroyImg1 = axios.post('/api/destroy', {public_id: images1.public_id},{
            headers: {Authorization: token}
        })
        const destroyImg2= axios.post('/api/destroy', {public_id: images2.public_id},{
          headers: {Authorization: token}
      })
        const deleteProduct = axios.delete(`/api/products/${id}`, {
            headers: {Authorization: token}
        })

        await destroyImg1
        await destroyImg2
        await deleteProduct
        alert(deleteProduct.data.msg)
        setCallback(!callback)
    } catch (err) {
        alert(err.response.data.msg)
    }
    }

    const styleUpload =  {

    }

  

  return (
    <div className="admin-product">  

        <div className="section-title">
          Products
        </div>

        <div className="btn-create">
          <Button 
            onClick={openModal}
            size='sm-1'
            >Create Product
          </Button>
        </div>


        <table className="table-product">
            <thead>
              <tr>
                <th>id</th>
                <th>image-1</th>
                <th>image-2</th>
                <th>title</th>
                <th>category</th>
                <th>des</th>
                <th>price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {
                products.slice(0,limit).map((item,index) => (
                  <tr key={index}>
                      <td>{item.product_id}</td>
                      <td><img src={item.images1.url} alt="" /></td>
                      <td><img src={item.images2.url} alt="" /></td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td className='des'>{item.description}</td>
                      <td>{item.price}</td>
                      <td> <Button size='sm-1' onClick={ () => editProduct(item.product_id, {...item})}>Edit</Button></td>
                      <td> <Button size='sm-1' bg= 'red'onClick={() => deleteProduct(item._id,item.images1,item.images2)}>Delete</Button></td>

                  </tr>
                ))
              }

            </tbody>
        </table> 

        <Pagination />

        <Modal id='modal-create'>
          <ModalContent>
              <div className="content">
              <div className="upload-img">
                <div className="img">
                  <input type="file" id="file_up" onChange={(e) => handleUpload(e,'img1')}/>

                  <div id="file_img" style={styleUpload}>
                      <img src={images1 ? images1.url : ''} alt=""/>
                      <span onClick={() => handleDestroy('img1')}> <GrClose /></span>
                    </div>
                </div>
                <div className="img">
                  <input type="file" id="file_up" onChange={(e) => handleUpload(e,'img2')}/>

                  <div id="file_img" style={styleUpload}>
                      <img src={images2 ? images2.url : ''} alt=""/>
                      <span onClick={() => handleDestroy('img2')}> <GrClose /></span>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label htmlFor="product_id">Product ID:</label>
                        <input type="text" name="product_id" id="product_id" required
                        value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" id="title" required
                        value={product.title} onChange={handleChangeInput} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="content">content:</label>
                        <input type="text" name="content" id="content" required
                        value={product.content} onChange={handleChangeInput} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="color">color:</label>
                        <input type="text" name="color" id="color" required
                        value={product.color} onChange={handleChangeInput} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="price">Price:</label>
                        <input type="number" name="price" id="price" required
                        value={product.price} onChange={handleChangeInput} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="description">Description:</label>
                        <textarea type="text" name="description" id="description" required
                        value={product.description} rows="5" onChange={handleChangeInput} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="slug">Slug:</label>
                        <input type="text" name="slug" id="slug" required
                        value={product.slug}  onChange={handleChangeInput} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="categories">Categories: </label>
                        <select name="category" value={product.category} onChange={handleChangeInput} >
                            <option value="">Please select a category</option>
                            {
                                categories.map(category => (
                                    <option value={category.name} key={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <Button size='sm-1' type="submit">{onEdit? "Update" : "Create"}</Button>
            </form>
              </div>
          </ModalContent>
        </Modal>
              
       
    </div>
  )
}

export default AdminProduct