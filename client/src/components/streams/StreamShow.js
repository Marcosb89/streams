import React from "react";
import flvjs from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
	constructor(props) {
		super(props);
		//Los elementos que devuelve render no son elementos en si, sino que
		//react los crea. Para crear una referencia al DOM real, se usa lo de abajo:
		this.videoRef = React.createRef();
	}
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchStream(id);
		this.buildPlayer();
	}

	componentDidUpdate() {
		this.buildPlayer();
	}

	componentWillUnmount() {
		this.player.destroy();
	}

	buildPlayer() {
		const { id } = this.props.match.params;
		if (this.player || !this.props.stream) {
			return;
		}
		this.player = flvjs.createPlayer({
			type: "flv",
			url: `http://localhost:8000/live/${id}.flv`,
		});
		this.player.attachMediaElement(this.videoRef.current);
		this.player.load();
	}

	render() {
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}
		const { title, description } = this.props.stream;
		return (
			<div>
				<video ref={this.videoRef} style={{ width: "100%" }} controls />
				{/*controls es lo mismo que decir constrols={true} */}
				<h1>{title}</h1>
				<h5>{description}</h5>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
	};
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
