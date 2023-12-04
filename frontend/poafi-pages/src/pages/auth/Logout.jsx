
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import './Auth.css';

import Loading from '../../components/Loading';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
	const navigate = useNavigate();
	const { logout } = AuthContext();

	useEffect(() => {
		logout();
		navigate('/login');
	}, [])


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
								<Loading />
							</div>
						</div>

					</div>

				</div>
			</div>
		</div >
	);
};

export default Login;
