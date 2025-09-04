import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import { useState, useEffect } from "react"

export const NewContact = () => {
    const {store, dispatch} =useGlobalReducer();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const getContacts = () => {
        fetch(store.baseURL + "/agendas/RicardoLeidenz/contacts")
        .then( (response)=> response.json())
        .then(
            (data) =>{
                dispatch({
                    type: "set-contacts",
                    payload: data.contacts
                });
            }
        )
    }

    const postContact = async () => {
        let options = {
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify(
                {
                    "name": name,
                    "phone": phone,
                    "email": email,
                    "address": address
                }
            )
        }
        await fetch(store.baseURL + "/agendas/RicardoLeidenz/contacts",options)
        .then( (response)=> response.json())
        .then(
            (data) =>{
                console.log("New Contact posted: ", data);
                getContacts();
                setName("");
                setPhone("");
                setAddress("");
                setEmail("");
                navigate('/')
            }
        )
    }

    useEffect(
        () => {
            getContacts();
        },[]
    )
    return (
        <div className="text-center mt-5">
            <input 
                type="text" 
                placeholder="Enter Full Name" 
                onChange={e => setName(e.target.value)} 
                value={name} 
            />
            <input 
                type="text" 
                placeholder="Enter Address" 
                onChange={e => setAddress(e.target.value)} 
                value={address} 
            />
            <input 
                type="tel" 
                placeholder="(xxx)xxx-xxxxx" 
                onChange={e => setPhone(e.target.value)} 
                value={phone} 
            />
            <input 
                type="email" 
                placeholder="Sample@email.com" 
                onChange={e => setEmail(e.target.value)} 
                value={email} 
            />
            <button type="button" onClick={()=>postContact()} className="btn btn-warning">Submit Contact</button>
        </div>
    );
}; 