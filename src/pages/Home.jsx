import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import { useState, useEffect } from "react"
import { ContactCard } from "../components/ContactCard";

export const Home = () => {
	const {store, dispatch} =useGlobalReducer()
	const [contacts, setContacts] = useState([])

	const getAgendas = async () => {
		await fetch(store.baseURL + "/agendas")
		.then( (response)=> response.json())
		.then(
			(data) =>{
				if(!data.agendas.some(agenda => agenda.slug == "RicardoLeidenz")){
					postAgenda()
				}
				else{
					console.log("User already exists")
				}
			}
		)
	}
	const postAgenda = async () => {
		let options = {
			method: "POST",
			headers: {"content-type":"application/json"},
			body: JSON.stringify(
				{
					"slug": "Ricardoleidenz2"
				}
			)
		}
		await fetch(store.baseURL + "/agendas/RicardoLeidenz",options)
		.then( (response)=> response.json())
		.then(
			(data) =>{
				console.log("New Agenda posted: ", data)
			}
		)
	}
	const getContacts = () => {
		fetch(store.baseURL + "/agendas/RicardoLeidenz/contacts")
		.then( (response)=> response.json())
		.then(
			(data) =>{
				dispatch({
					type: "set-contacts",
					payload: data.contacts
				})
				setContacts(store.contacts)
			}
		)
	}

	const postContact = async () => {
		let options = {
			method: "POST",
			headers: {"content-type":"application/json"},
			body: JSON.stringify(
				{
					"name": "contact",
					"phone": "12345",
					"email": "myemail@email.com",
					"address": "123 Easy st"
				}
			)
		}
		await fetch(store.baseURL + "/agendas/RicardoLeidenz/contacts",options)
		.then( (response)=> response.json())
		.then(
			(data) =>{
				console.log("New Contact posted: ", data)
				getContacts()
			}
		)
	}

	useEffect(
		() => {
			getAgendas()
			getContacts()
		},[]
	)
	return (
		<div className="text-center mt-5">
			<h1>Hello World!!</h1>
			<Link to="/profile" >Profile</Link>
			<button 
				className="btn btn-primary"
				onClick={()=> postContact()}
			>
					Post New Contact
			</button>
			<button 
				className="btn btn-primary" 
				onClick={()=> {console.log("All contacts: ", store.contacts)}}
			>
				Show Contacts
			</button>
			<div className="row justify-content-center">
				<div className="col-8">
					<ul className="list-group">
						{contacts.map((contact,index)=>{
								return (
									<li className="list-group-item row" key={index}>
										<ContactCard name={contact.name} address={contact.address} phone={contact.phone} email={contact.email}></ContactCard>
									</li>
								);
							}
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}; 