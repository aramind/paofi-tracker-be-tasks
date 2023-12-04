import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/logo.png';
import './Auth.css';

import InputGroup from "../../components/InputGroup";
import ResponseMessage from '../../components/ResponseMessage';
import Loading from '../../components/Loading';

const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [retypePassword, setRetypePassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const apiURL = import.meta.env.VITE_API_URL; //from the .env file

	axios.defaults.withCredentials = true;

	const handleSubmit = (e) => {
		e.preventDefault();

		//clear previous response messages
		setError("");
		setSuccess("");

		// Validate email and password
		if (firstName && lastName && email && password && retypePassword) {

			if (password === retypePassword) {

				//show loading screen
				setLoading(true);

				axios.post(`${apiURL}/auth/register`, {
					email: email,
					password: password,
					name: { firstName, lastName }
				}).then((res) => {

					if (res.data?.userId) {
						setSuccess("Register successful, Please wait...");
						navigate("/login");
					} else {
						setError("Invalid Credential!");
					}

					setLoading(false);

				}).catch(() => {
					setError("Invalid Credential!");
					setLoading(false);
				});
			} else {
				setError("Password does not match!");
			}
		} else {
			setError("Please fill up all fields!");
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
									<h3>Register to <strong>PAOFI</strong></h3>
									<p className="mb-5">
										A Simple Effort Can Make A Great Impact.
									</p>
								</div>
								{
									loading ? (
										<Loading />
									) : (
										<form onSubmit={handleSubmit}>
											<InputGroup type="text" labelName="First Name" onInputChange={setFirstName} />
											<InputGroup type="text" labelName="Last Name" onInputChange={setLastName} />

											<InputGroup type="email" labelName="Email" onInputChange={setEmail} />
											<InputGroup type="password" labelName="Password" onInputChange={setPassword} />
											<InputGroup type="password" labelName="Retype Password" onInputChange={setRetypePassword} />

											<div className="d-flex my-1 align-items-center">
												<input type="submit" value="Register" className="btn btn-primary me-3 text-white" />

												<span className="text-left my-4 text-muted">
													Already have an account?
													<Link to="/login" className="mx-2 text-muted text-warning">Login</Link>
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

export default Register;
