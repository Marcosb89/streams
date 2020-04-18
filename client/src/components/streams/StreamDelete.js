import React from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";

//React.Fragment se usa cuando no es necesario crea un elemento que englobe el contenido.
//No crea un elemento en el DOM, a diferencia de usar por ejemplo div, etc.
//También se puede usar como <> </>

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	renderActions() {
		const { id } = this.props.match.params;
		return (
			<React.Fragment>
				<Link
					onClick={() => this.props.deleteStream(id)}
					className="ui button negative">
					Delete
				</Link>
				<Link to="/" className="ui button">
					Cancel
				</Link>
			</React.Fragment>
		);
	}

	renderContent() {
		if (!this.props.stream) {
			return "Are you sure you want to delete this stream?";
		}
		return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
	}

	render() {
		return (
			<Modal
				title="Delete stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push("/")}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
	};
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
	StreamDelete
);
