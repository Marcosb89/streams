import React from "react";
import { Router, Route, Switch } from "react-router-dom";
//COMPONENTS
import Header from "./Header";
import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamShow from "./streams/StreamShow";
import history from "../history";

//Switch hace que si dos rutas son iguales solo muestra la primera en la lista.
//En este caso sirve para que streams/:id no se abra con la ruta para crear
//un stream ya que /new podría interpretarse como una variable en :id.

const App = () => {
	return (
		<div className="container">
			<Router history={history}>
				<div>
					<Header />
					<Switch>
						<Route exact path="/" component={StreamList} />
						<Route exact path="/streams/new" component={StreamCreate} />
						<Route exact path="/streams/edit/:id" component={StreamEdit} />
						<Route exact path="/streams/delete/:id" component={StreamDelete} />
						<Route exact path="/streams/:id" component={StreamShow} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
