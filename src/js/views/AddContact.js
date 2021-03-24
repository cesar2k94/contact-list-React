import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';
import { ErrorFetch } from '../component/ErrorFetch';
import { Contacts } from '../views/Contacts';
import { useHistory } from 'react-router-dom';

export const AddContact = () => {

	const initialValue = {
		"agenda_slug": "cesar_agenda",
		"full_name": "",
		"email": "",
		"phone": "",
		"address": ""
	}
	const { store, actions } = useContext(Context);

	const history = useHistory();

	const [good, setGood] = useState(false)

	const [state, setState] = useState({
		showModal: false
	});

	const [contactPostorPut, SetContactPostorPut] = useState(initialValue);


	const [newContact, setNewContact] = useState(initialValue);

	const AddElement = () => {
		fetch('https://assets.breatheco.de/apis/fake/contact/' + store.idChange, {
			method: store.PostOrPut,
			body: JSON.stringify(newContact),
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then(resp => resp.json())
			.then(data => {
				SetContactPostorPut(data);
				if (data.full_name == newContact.full_name) {
					console.log(newContact.full_name, data.full_namen, store.PostOrPut, "dentro del then");
					actions.setPost();
					let path = `contacts`;
					history.push(path);
				} else {
					setState({ showModal: true })
					console.log("Error en peticion");
				}
			})
			.catch(error => console.log(error));
		console.log(newContact.full_name, contactPostorPut.full_name);
		SetContactPostorPut(initialValue);
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
							onChange={(e) => setNewContact({ ...newContact, full_name: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							value={newContact.email}
							onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							value={newContact.phone}
							onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							value={newContact.address}
							onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => AddElement()}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
			<ErrorFetch show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
