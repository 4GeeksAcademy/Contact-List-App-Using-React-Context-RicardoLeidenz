import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import { useState, useEffect } from "react"
import { getContacts } from "../globalFunctions";

export const Contact = () => {
	const navigate = useNavigate()
    const {store, dispatch} =useGlobalReducer();
    const [id, setId] = useState(store.selectedContact.id);
    const [name, setName] = useState(store.selectedContact.name);
    const [address, setAddress] = useState(store.selectedContact.address);
    const [phone, setPhone] = useState(store.selectedContact.phone);
    const [email, setEmail] = useState(store.selectedContact.email);

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
            }
            else{
                let options = {
                    method: "PUT",
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
                await fetch(store.baseURL + "/agendas/RicardoLeidenz/contacts/" + id,options)
                .then( (response)=> response.json())
                .then(
                    (data) =>{
                        console.log("New Contact posted: ", data);
                        
                    }
                )
            }
			getContacts(store.baseURL,dispatch);
            navigate("/")
        }
        else{

        }
    }

    useEffect(
        () => {
			getContacts(store.baseURL,dispatch);
            resetSelectedContact();
        },[]
    )
    return (
        <div className="bg-light text-center m-5">
            <h1 className="pt-3">Contact</h1>
            <form class="row needs-validation" novalidate>
                <div className="p-3">
                    <input 
                        type="text" 
                        placeholder="Enter Full Name" 
                        onChange={e => setName(e.target.value)} 
                        value={name} 
                        className="m-2"
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Enter Address" 
                        onChange={e => setAddress(e.target.value)} 
                        value={address} 
                        className="m-2"
                        required
                    />
                </div>
                <div className="p-3">
                    <input 
                        type="tel" 
                        placeholder="(xxx)xxx-xxxxx"
                        onChange={e => setPhone(e.target.value)} 
                        value={phone} 
                        className="m-2"
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Sample@email.com" 
                        onChange={e => setEmail(e.target.value)} 
                        value={email} 
                        className="m-2"
                        required
                    />
                </div>
                <div className="p-3">
                    <button 
                        type="submit" 
                        onSubmit={()=>postContact()} 
                        onClick={()=>postContact()} 
                        className={ id == "" ? "btn btn-success" : "btn btn-warning"}
                    >
                        { id == "" ? "Submit Contact" : "Edit Contact"}
                    </button>
                </div>
            </form>
        </div>
    );
}; 