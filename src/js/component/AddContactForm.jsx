import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const AddContactForm = () => {
	const {store, actions} = useContext(Context)
	const navigate = useNavigate();

	 const [name, setName] = useState("")
	 const [phone, setPhone] = useState("")
	 const [email, setEmail] = useState("")
	 const [address, setAddress] = useState("")

	 const handleSubmit = (e) => {
		e.preventDefault();

		const contactData = {
			name,
			phone,
			email,
			address
		}

		if (store.selectedContact) {
            actions.updateContact(contactData, store.selectedContact.id);
        } else {
            actions.createContact(contactData);
        }

        setName("");
        setPhone("");
        setEmail("");
        setAddress("");

		actions.editContact(null)

        navigate("/");

	  }

	  useEffect(()=>{
		if(store.selectedContact) {
			setName(store.selectedContact.name)
			setPhone(store.selectedContact.phone)
			setEmail(store.selectedContact.email)
			setAddress(store.selectedContact.address)
		  }
	  },[store.selectedContact])

	
	return (
	<>
		<form onSubmit={handleSubmit}>
			<h1 className="text-center">Add a new contact</h1>
			<div className="mb-3">
				<label htmlFor="fullName" className="form-label">Full Name</label>
				<input type="text" className="form-control" id="fullName" placeholder="Full Name" onChange={(e)=> setName(e.target.value)} value={name}/>
			</div>
			<div className="mb-3">
				<label htmlFor="email" className="form-label">Email</label>
				<input type="email" className="form-control" id="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} value={email}/>
			</div>

			<div className="mb-3">
				<label htmlFor="phone" className="form-label">Phone</label>
				<input type="text" className="form-control" id="phone" placeholder="Enter phone"onChange={(e)=>setPhone(e.target.value)} value={phone}/>
			</div>
			<div className="mb-3">
				<label htmlFor="address" className="form-label">Address</label>
				<input type="text" className="form-control" id="address" placeholder="Enter address" onChange={(e)=> setAddress(e.target.value)} value={address}/>
			</div>
			<div className="mb-3">
				<button type="submit" className="btn btn-primary w-100">Save</button>
			</div>
		</form>
		<Link to="/">or get back to contacts</Link>

	</>
	);
};
