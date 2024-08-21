import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate} from "react-router-dom";

export const ContactsList= ({contact, id}) => {
	const {store, actions} = useContext(Context)
	const navigate = useNavigate()

	// 
	useEffect(()=>{
		actions.getContacts();
	},[]);
	

	return (
		<div className="d-flex justify-content-between border p-3 px-5">
			<div className="d-flex">
				<div className="d-flex align-content-center align-items-center me-5">
					<img className="rounded-circle" src="https://images.unsplash.com/photo-1719820324065-d6ca0c479172?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{width:"150px", height:"150px"}}/>
				</div>
				<div>
					<h4>{contact.name}</h4>
					<p className="text-secondary">{contact.address}</p>
					<p className="text-secondary">{contact.phone}</p>
					<p className="text-secondary">{contact.email}</p>
				</div>
				
			</div>
			<div>
				<button onClick={()=>{
					actions.editContact(contact)
					navigate("/form")
					}}  style={{border:"none", background:"transparent"}}><i className="fa-solid fa-pencil me-5 pt-3"></i></button>
				
				<button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{border:"none", background:"transparent"}}>
					<i className="fa-solid fa-trash-can"></i>
				</button>
				
				<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">Delete contact</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						Are you sure you want to delete the contact?
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" onClick={()=>actions.deleteContact(contact.id)} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>	
					</div>
					</div>
				</div>
				</div>
			</div>

		</div>
	)
}
