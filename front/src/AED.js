import { useState}  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios';
import React from 'react';

export default function AED(props) {
    let [selectedOption, setSelectedOption] = useState(0);
    let [Name,setName] = useState("");
    let [Price,setPrice] = useState("");
    let [Editname,setEditname] = useState("");
    let [EditPrice,setEditPrice]= useState("");
    
    const add = (<Tooltip id="add_tooltip">Add</Tooltip>);
    const [addshow, setaddShow] = useState(false);
    const addClose = () => setaddShow(false);
    const addShow = () => setaddShow(true);
    const edit = (<Tooltip id="edit_tooltip">Edit</Tooltip>);
    const [editshow, seteditShow] = useState(false);
    const editClose = () => {seteditShow(false);setEditname("");setEditPrice("");}
    const editShow = () => seteditShow(true);
    const del = (<Tooltip id="del_tooltip">Delete</Tooltip>);
    const [delshow, setdelShow] = useState(false);
    const delClose = () => {setdelShow(false);setEditname("");setEditPrice("");}
    const delShow = () => setdelShow(true);

    function handleChange (value) {
        setSelectedOption(value);
        setEditname(props.data[value].name);setEditPrice(props.data[value].price);
      }


    function AddDevice(){
        
        axios.post('http://localhost:4000/add',{
            name:Name,price:Price
          }).then(()=>{
            
          })
          .catch((error)=>{
            console.log(error);
          })
        
    }
    function EditDevice(){
        
        axios.post('http://localhost:4000/edit',{
            name:Editname,price:EditPrice,index:props.data[selectedOption]._id
          }).then(()=>{
            
          })
          .catch((error)=>{
            console.log(error)
          })
        
    }
    function DelDevice(){
        
        axios.post('http://localhost:4000/delete',{
            name:Editname,price:EditPrice,index:props.data[selectedOption]._id
          }).then(()=>{
            
          })
          .catch((error)=>{
            console.log(error)
          })
        
    }
    return (
            <>
            <OverlayTrigger placement="top" overlay={add} >
                <Button
                    variant="primary"
                    type="button"
                    size="md"
                    onClick={addShow}
                >
                    <i className="fa fa-plus">Add</i>
                </Button>
            </OverlayTrigger>
            <Modal show={addshow} onHide={addClose} size="lg" >
                    <Modal.Header closeButton>
                    <Modal.Title>Adding Item</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={AddDevice}>
                    <Modal.Body>

                            <Form.Group className="mb-3" id="Device_name" >
                                <Form.Label> Name</Form.Label>
                                <Form.Control required type="text" placeholder="Device1" onChange={e => setName(e.target.value)}  />
                            </Form.Group>
                            <Form.Group className="mb-3" id="Price">
                            <Form.Label>Price</Form.Label>
                                <Form.Control required type="number" placeholder="0" onChange={e => setPrice(e.target.value)} />
                            </Form.Group>
                           
                    
                     
                    </Modal.Body>
                    <Modal.Footer>
                    <Button type="submit" variant="primary">
                        Add
                    </Button>
                
                    <Button variant="disable" onClick={addClose}>
                        Cancel
                    </Button>
                    </Modal.Footer>
                    </Form>
                </Modal>


                <OverlayTrigger placement="top" overlay={edit} >
                <Button
                    variant="info"
                    type="button"
                    size="md"
                    onClick={editShow}
                >
                    <i className="fa fa-plus">Edit</i>
                </Button>
            </OverlayTrigger>
            <Modal show={editshow} onHide={editClose} size="lg" >
                    <Modal.Header closeButton>
                    <Modal.Title>Editting Item</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={EditDevice}>
                    <Modal.Body>

                            <Form.Group className="mb-3" id="Device_name" >
                            <Form.Label>Select your item </Form.Label>
                            <Form.Select  id="edit"  onChange={e => handleChange(e.target.value)}>
                            <option value="999">--Select your item --</option>
                                {props.data.map((option,index) => (
                                    
                                    <option value={index}>{option.name}</option>
                                    ))}
                                </Form.Select>
          
                                <Form.Label> Name</Form.Label>
                                <Form.Control required type="text" value={Editname} onInput={e => setEditname(e.target.value)}  />
                            </Form.Group>
                            <Form.Group className="mb-3" id="Price">
                            <Form.Label>Price </Form.Label>
                                <Form.Control required type="number" value={EditPrice} onInput={e => setEditPrice(e.target.value)} />
                            </Form.Group>
               
                          
    
                                                   
                    </Modal.Body>
                    <Modal.Footer>
                    <Button type="submit" variant="info">
                        Edit
                    </Button>
                
                    <Button variant="disable" onClick={editClose}>
                        Cancel
                    </Button>
                    </Modal.Footer>
                    </Form>
                </Modal>

                <OverlayTrigger placement="top" overlay={del} >
                <Button
                    variant="danger"
                    type="button"
                    size="md"
                    onClick={delShow}
                >
                    <i className="fa fa-plus">Delete</i>
                </Button>
            </OverlayTrigger>
            <Modal show={delshow} onHide={delClose} size="lg" >
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Item</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={DelDevice}>
                    <Modal.Body>

                            <Form.Group className="mb-3" id="Device_name" >
                            <Form.Label>Select your item </Form.Label>
                            <Form.Select  id="del"  onChange={e => handleChange(e.target.value)}>
                            <option value="999">--Select your item --</option>
                                {props.data.map((option,index) => (
                                    <option value={index}>{option.name}</option>
                                    ))}
                                </Form.Select>
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text"  value={Editname} onChange={e => setEditname(e.target.value)} readOnly/>
                            </Form.Group>
                            <Form.Group className="mb-3" id="IPaddress">
                            <Form.Label>Price</Form.Label>
                                <Form.Control required type="number"  value={EditPrice} onChange={e => setEditPrice(e.target.value)}  readOnly/>
                            </Form.Group>
                          
                         
                   
                    </Modal.Body>
                    <Modal.Footer>
                    <Button type="submit" variant="danger">
                        Delete
                    </Button>
                
                    <Button variant="disable" onClick={delClose}>
                        Cancel
                    </Button>
                    </Modal.Footer>
                    </Form>
                </Modal>
    </>
    );
  }
  