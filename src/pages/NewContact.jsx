import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import { useState, useEffect } from "react"

export const NewContact = () => {
    const {store, dispatch} =useGlobalReducer();
	const navigate = useNavigate()
    const [id, setId] = useState(store.selectedContact.id);
    const [name, setName] = useState(store.selectedContact.name);
    const [address, setAddress] = useState(store.selectedContact.address);
    const [phone, setPhone] = useState(store.selectedContact.phone);
    const [email, setEmail] = useState(store.selectedContact.email);

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
    
    const resetSelectedContact = () => {
        dispatch({
            type: "select-contact",
            payload: {
                id: "",
                name: "",
                phone: "",
                email: "",
                address: ""
            }
        })

    }

    const postContact = async () => {
        if ((name != "")&&(phone != "")&&(address != "")&&(email != "")){
            if (id == ""){
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
                        
                    }
                )
                navigate("/");
            }
            else{

            }
            getContacts();
            resetSelectedContact()
            navigate('/')
        }
    }

    useEffect(
        () => {
            getContacts();
        },[]
    )
    return (
        <div className="text-center mt-5">
            <form className="needs-validation">
                <input 
                    type="text" 
                    placeholder="Enter Full Name" 
                    onChange={e => setName(e.target.value)} 
                    value={name} 
                    required
                />
                <input 
                    type="text" 
                    placeholder="Enter Address" 
                    onChange={e => setAddress(e.target.value)} 
                    value={address} 
                    required
                />
                <input 
                    type="tel" 
                    placeholder="(xxx)xxx-xxxxx" 
                    onChange={e => setPhone(e.target.value)} 
                    value={phone} 
                    required
                />
                <input 
                    type="email" 
                    placeholder="Sample@email.com" 
                    onChange={e => setEmail(e.target.value)} 
                    value={email} 
                    required
                />
                <button type="button" onClick={()=>postContact()} className="btn btn-warning">Submit Contact</button>
            </form>

        </div>
    );
}; 