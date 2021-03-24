import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import {Context} from '../store/appContext';

export const AddContact = () => {

	const { store, actions } = useContext(Context);

	const initialValue={
		"agenda_slug": "cesar_agenda",
		"full_name": "",
		"email":"",
		"phone":"",
		"address":""
	}

	const [newContact, setNewContact] = useState(initialValue);

	const AddElement =()=>{
		fetch('https://assets.breatheco.de/apis/fake/contact/'+store.idChange, {
        method: store.PostOrPut,
        body: JSON.stringify(newContact),
        headers: {
            "Content-Type": "application/json"
        },
    })
		console.log(newContact, store.PostOrPut);
	    actions.setPost();
		setNewContact(initialValue);
		
	}

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input 
							type="text" 
							className="form-control" 
							placeholder="Full Name" 
							value={newContact.full_name}
							onChange={(e)=>setNewContact({...newContact, full_name:e.target.value})}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input 
							type="email" 
							className="form-control" 
							placeholder="Enter email"
							value={newContact.email}
							onChange={(e)=>setNewContact({...newContact, email:e.target.value})} 
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input 
							type="phone" 
							className="form-control" 
							placeholder="Enter phone"
							value={newContact.phone} 
							onChange={(e)=>setNewContact({...newContact, phone:e.target.value})} 
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input 
							type="text" 
							className="form-control" 
							placeholder="Enter address" 
							value={newContact.address}
							onChange={(e)=>setNewContact({...newContact, address:e.target.value})} 
						/>
					</div>
					<button 
						type="button" 
						className="btn btn-primary form-control"
						onClick={()=>AddElement()}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
