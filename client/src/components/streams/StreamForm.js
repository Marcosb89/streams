import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta }) => {
		//le pasa las props del formProps.input (aca solo el input) para actualizar el estado.
		// meta guarda datos del componente como el mensaje de error a mostrar
		const className = `field ${meta.error && meta.touched ? "error" : ""}`; //colorea en rojo el campo si hay error
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				className="ui form error">
				<Field name="title" component={this.renderInput} label="Enter title" />
				<Field
					name="description"
					component={this.renderInput}
					label="Enter description"
				/>
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

/*Para validar el formulario, si no hay error devuelve un objeto vacíos 
si hay error se devuelve un key value donde key es dónde se haya el error 
y value es la descripción*/

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = "You must enter a title";
	}
	if (!formValues.description) {
		errors.description = "You must enter a description";
	}
	return errors;
};

export default reduxForm({
	form: "streamForm",
	validate, // or validate: validate
})(StreamForm);

/*----También se puede hacer:--------
Aunque mas tarde se cambió la clase para usarla como base

const formWrapped = reduxForm({
	form:"streamCreate",
	validate
)}(streamCreate);

export default connect(null, { createStream })(formWrapped)
})
-------------------------------------*/
