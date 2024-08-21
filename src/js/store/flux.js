import { Navigate } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts:[],
			selectedContact: null
		},
		actions: {	
			getContacts: () => {
				fetch("https://playground.4geeks.com/contact/agendas/ericka/contacts")
				.then(response=> response.json())
				.then(data => setStore({contacts: data.contacts}))
				.catch(error=>console.log(error))
			},
			createContact: (contactData) => {
					fetch("https://playground.4geeks.com/contact/agendas/ericka/contacts", {
					
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contactData)
				})
				.then(response=>response.json())
				// to access the value of the object getStore(.contact), ...(copy the array and add new contact(data))
				.then(data=> setStore({contacts: [...getStore().contacts, data]}))
				.catch(error=>console.log(error))
			},
			deleteContact: (id) => {
				fetch(`https://playground.4geeks.com/contact/agendas/ericka/contacts/${id}`, {
					method: "DELETE"
				})
				.then(data => {
					if(data.ok) {
						const updateContacts = getStore().contacts.filter((contact)=> contact.id !== id)
						setStore({contacts: updateContacts})
					} else {
						console.error("failed to delete contact")
					}	
				})
				.catch(error=>console.log(error))
			},
			updateContact: (contactData, id) => {
				fetch(`https://playground.4geeks.com/contact/agendas/ericka/contacts/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contactData)
				})
				.then(response=>response.json())
				.then(data => {
					if (data.result === "ok") {
						const updatedContacts = getStore().contacts.map((contact) =>
                            contact.id === id ? { ...contact, ...contactData } : contact
                        );
                        setStore({ contacts: updatedContacts, selectedContact: null });
					} else {
						console.error("failed to update contact")
					}	
				})
				.catch(error=>console.log(error))
			},
			editContact: (contactInfo) => {
				setStore({selectedContact: contactInfo})
			}

		}
	};
}
export default getState;
