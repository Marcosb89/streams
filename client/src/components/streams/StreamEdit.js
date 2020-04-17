import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<h3>Edit a Stream</h3>
				<StreamForm //redux-form enlaza los valores del form con nommbre 'title' y 'description' automáticamente
					onSubmit={this.onSubmit}
					initialValues={_.pick(this.props.stream, "title", "description")} //pick obtiene únicamente el key value de las keys seleccionadas
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	//ownProps son las propiedades del componente sin redux
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
	StreamEdit
);
