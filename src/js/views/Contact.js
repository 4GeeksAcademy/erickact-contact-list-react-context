import React, { useEffect, useState, useContext } from "react";
import {Context} from "../store/appContext.js"
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { ContactsList } from "../component/ContactsList.jsx";

export const Contact = () => {
	const {store, actions} = useContext(Context)

	useEffect(() => {
		actions.getContacts();
	}, [])

return(
	
	<div className="container">
		<div className="d-flex justify-content-end my-3">
			<Link to="/form" className="btn btn-success">Add new contact</Link>
		</div>
				{store.contacts.map((contact)=>{
					return (
						<ContactsList key={contact.id} contact={contact}/>
					)
				})}
	</div>

)}
