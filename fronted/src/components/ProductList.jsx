import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    let result = await fetch("http://localhost:8000/products",{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    swal({
      title: "Are you sure Delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willDelete) => {
      if (willDelete) {
        swal("Record has been deleted!", {
          icon: "success",
        });
        let result = await fetch(`http://localhost:8000/product/${id}`, {
          method: "Delete",
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        console.log(result);
        getproducts();
      } else {
        swal("Record is safe!");
      }
    });
  }

  //   if (window.confirm("Are You Sure Delete?")) {
  //     let result = await fetch(`http://localhost:8000/product/${id}`, {
  //       method: "Delete",
  //       headers:{
  //         authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
  //       }
  //     });
  //     result = await result.json();
  //     console.log(result);
  //     getproducts();
  //   } else {
  //     console.log("something worng");
  //   }
  // };
  
  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8000/search/${key}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getproducts();
    }
  };

  return (
    <>
      <h3 className="text-center">Product List</h3>
      <div className="d-flex justify-contect-center mb-4">
        <input
          type="text"
          className="m-auto search-box"
          placeholder="Search Product"
          onChange={searchHandle}
        />
      </div>
      <Table striped bordered className="text-center">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((x, index) => {
              return (
                <tr key={x._id}>
                  <td>{index + 1}</td>
                  <td>{x.name}</td>
                  <td>{x.price}</td>
                  <td>{x.category}</td>
                  <td>
                    <Button
                      className="btn btn-danger me-4"
                      onClick={() => deleteProduct(x._id)}
                    >
                      Delete
                    </Button>
                    <Link to={`/update/${x._id}`}>Update</Link>
                  </td>
                </tr>
              );
            })
          ) : (
              <h2>No Result Found</h2>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ProductList;
