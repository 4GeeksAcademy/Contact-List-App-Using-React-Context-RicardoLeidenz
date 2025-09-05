import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import { useState, useEffect } from "react"
import { ContactCard } from "../components/ContactCard";

export const Home = () => {
	const {store, dispatch} =useGlobalReducer()

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
					"slug": "Ricardoleidenz"
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
	const showContacts = () =>{
		return(
			<ul className="list-group">
							{store.contacts.length > 0
								? store.contacts.map((contact,index)=>{
									return (
										<li className="list-group-item row" key={index}>
											<ContactCard name={contact.name} address={contact.address} phone={contact.phone} email={contact.email} contactID={contact.id}></ContactCard>
										</li>
									)
								})
								: "No contacts yet"
							}
							
			</ul>
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
			<h1 className="bg-dark border-solid w-75 m-auto text-white">CONTACT LIST</h1>
			<Link to="/new-contact" >
				<button 
					className="btn btn-primary m-5 btn-lg" 
					onClick={()=> {console.log("All contacts: ", store.contacts)}}
				>
					Add New Contact
				</button>
			</Link>
			<div className="row justify-content-center bg-light py-5">
				<div className="col-8">
					{showContacts()}
				</div>
			</div>
		</div>
	);
}; 