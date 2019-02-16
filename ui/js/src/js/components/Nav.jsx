import React from 'react';
import Cookies from 'universal-cookie';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { API_ROOT } from '../api-config';

class Nav extends React.Component {

	constructor() {
		super();
	
		this.state = {
			name : ""
		}

		this.doLogout = this.doLogout.bind(this);
	}

	componentDidMount(){
		fetch(API_ROOT.branding + '/branding/', {
			method: 'GET'
		})
		.then(res => res.json())
		.then(res => {
			this.setState({name : res.name})
		})
	}
	
	doLogout(){
		fetch(API_ROOT.auth + '/logout', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body : JSON.stringify(this.state)
		})
		.then(res => {
			if(res.status == 200){
				this.props.setAuthenticate(false);

				const cookies = new Cookies();
				cookies.remove('token');
			}
		})
	}

	render() {
    	return(
				<nav className="navbar navbar-expand-md navbar-dark bg-dark">
					<div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
						{this.props.isAuthenticated && (
							<ul className="navbar-nav mr-auto">
									<li className="nav-item">
										<Link className="nav-link" to="/admin/">Rooms</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to="/admin/report">Report</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to="/admin/branding">Branding</Link>
									</li>
							</ul>
						)}
					</div>
					<div className="mx-auto order-0">
							<a className="navbar-brand mx-auto" href="#">{this.state.name} - Booking Management</a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
									<span className="navbar-toggler-icon"></span>
							</button>
					</div>
					<div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
						{this.props.isAuthenticated && (
							<ul className="navbar-nav ml-auto">
									<li className="nav-item">
											<a className="nav-link" href="/">Front Page</a>
									</li>
									<li className="nav-item">
											<a className="nav-link" href="#/admin" onClick={this.doLogout}>Logout</a>
									</li>
							</ul>
						)}
					</div>
			</nav>
      );
    }
}

Nav.propTypes = {
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

export default withRouter(Nav);
