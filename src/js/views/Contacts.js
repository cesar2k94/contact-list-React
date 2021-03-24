import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from '../store/appContext';


export const Contacts = () => {

	const { store, actions } = useContext(Context);

	const [state, setState] = useState({
		showModal: false
	});

	const [contacts, setContacts] = useState([])

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/contact/agenda/cesar_agenda")
			.then(resp => resp.json())
			.then(data => setContacts(data))
			.catch(error => console.log(error));
		console.log(store.contacDel, 'dentro del fetch');
	}, [store.contacDel])

	const DeleteContact = () => {
		fetch('https://assets.breatheco.de/apis/fake/contact/' + store.idDelete, {
			method: "DELETE"
		})
			.then(() => actions.setContacDel());
		setState({ showModal: false });
		console.log(store.contacDel, "dentro del delete");
	}

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add" onClick={() => actions.setPost()}>
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{contacts.length > 0 ?
							contacts.map((contact, index) =>
								<ContactCard onDelete={() => setState({ showModal: true })} contact={contact} key={index} />
							)
							: <div></div>
						}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} DeleteContact={DeleteContact} />
		</div>
	);
};
