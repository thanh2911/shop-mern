import React from 'react'

const Table = props => {

const products = props.products;

  return (
    <div>
        <table className="table-product">
            <thead>
              <tr>
                <th>id</th>
                <th>image</th>
                <th>title</th>
                <th>des</th>
                <th>price</th>
              </tr>
            </thead>

            <tbody>
              {
                products.map((item,index) => (
                  <tr key={index}>
                      <td>{item.product_id}</td>
                      <td><img src={item.images1.url} alt="" /></td>
                      <td>{item.title}</td>
                      <td className='des'>{item.description}</td>
                      <td>{item.price}</td>
                      <td> <button onClick={ () => props.editProduct(item.product_id, {...item})}>Edit</button></td>
                      <td> <button onClick={() => props.deleteProduct(item._id,item.images1,item.images2)}>Delete</button></td>

                  </tr>
                ))
              }

            </tbody>
        </table> 
    </div>
  )
}

export default Table