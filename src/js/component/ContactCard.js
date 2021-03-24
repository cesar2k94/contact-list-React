import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import MikePhoto from "../../img/m101.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Context } from '../store/appContext';


export const ContactCard = ({ onDelete, contact }) => {


	const { store, actions } = useContext(Context);

	const DeleteCon = () => {
		actions.setIdDelete(contact.id);
		onDelete();
	}

	const ChangeContact = () => {
		actions.setPut(contact.id);
		
	}

	return (
		<li className="list-group-item contact">
			<div className="row w-100">
				<div className="col-12 col-sm-6 col-md-3 px-0">
					<img src={MikePhoto} alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid" />
				</div>
				<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">

					<label className="name lead">{contact.full_name}</label>
					<br />
					<i className="fas fa-map-marker-alt text-muted mr-3" />
					<span className="text-muted">{contact.address}</span>
					<br />
					<span
						className="fa fa-phone fa-fw text-muted mr-3"
						data-toggle="tooltip"
						title=""
						data-original-title="(870) 288-4149"
					/>
					<span className="text-muted small">{contact.phone}</span>
					<br />
					<span
						className="fa fa-envelope fa-fw text-muted mr-3"
						data-toggle="tooltip"
						data-original-title=""
						title=""
					/>
					<span className="text-muted small text-truncate">{contact.email}</span>
				</div>
			</div>
			<Link to="/add" >
				<FontAwesomeIcon
					icon={faPencilAlt}
					className="edit-delete-contact"
					onClick={() => ChangeContact()}
				/>
			</Link>
			<FontAwesomeIcon
				icon={faTrash}
				className="edit-delete-contact"
				onClick={() => DeleteCon()}
			/>
		</li>
	);
};

/**
 * Define the data-types for
 * your component's properties
 **/
ContactCard.propTypes = {
	history: PropTypes.object,
	onDelete: PropTypes.func
};

/**
 * Define the default values for
 * your component's properties
 **/
ContactCard.defaultProps = {
	onDelete: null
};
