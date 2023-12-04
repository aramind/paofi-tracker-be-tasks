import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/logo.png';
import './Auth.css';

import InputGroup from "../../components/InputGroup";
import ResponseMessage from '../../components/ResponseMessage';
import Loading from '../../components/Loading';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const apiURL = import.meta.env.VITE_API_URL; //from the .env file
	const { updateCredential } = AuthContext();

	axios.defaults.withCredentials = true;

	const handleSubmit = (e) => {
		e.preventDefault();

		//clear previous response messages
		setError("");
		setSuccess("");

		// Validate email and password
		if (email && password) {

			//show loading screen
			setLoading(true);

			axios.post(`${apiURL}/auth/login`, { email, password })
				.then((res) => {
					if (res.data?.userId) {
						const newCredential = res.data;

						updateCredential(newCredential); //store to context state
						localStorage.setItem('credential', JSON.stringify(newCredential));

						setSuccess("Login successful, Please wait...");
						navigate("/dashboard");
					} else {
						setError("Invalid Credential!");
					}

					setLoading(false);
				})
				.catch(() => {
					setError("Invalid Credential!");
					setLoading(false);
				});
		} else {
			setError("Please enter your email and password");
		}
	};

	return (
		<div className="content">
			<div className="container">
				<div className="row">
					<div className="col-md-3 offset-md-3 contents">
						<div className="row justify-content-center">
							<div className="col-md-8">
								<div className="mb-4 text-center">
									<img src={Logo} alt="Image" className="img-fluid mb-3" />
									<h3>Sign In to <strong>PAOFI</strong></h3>
									<p className="mb-5">
										A Simple Effort Can Make A Great Impact.
									</p>
								</div>
								{
									loading ? (
										<Loading />
									) : (
										<form onSubmit={handleSubmit}>
											<InputGroup type="email" labelName="Email" onInputChange={setEmail} />
											<InputGroup type="password" labelName="Password" onInputChange={setPassword} />

											<div className="d-flex my-1 align-items-center">
												<input type="submit" value="Log In" className="btn btn-primary me-3 text-white" />

												<span className="text-left my-4 text-muted">
													No Account Yet?
													<Link to="/register" className="mx-2 text-muted text-warning">Register</Link>
												</span>
											</div>

											<ResponseMessage color="danger" message={error} />
											<ResponseMessage color="success" message={success} />

										</form>
									)
								}
							</div>
						</div>

					</div>

				</div>
			</div>
		</div>
	);
};

export default Login;
