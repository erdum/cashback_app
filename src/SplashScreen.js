import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./assets/splashScreen.css";

const SplashScreen = (props) => {
	return (
		<>
			<div className="splash-wrapper-wrapper" style={props.loader ? {filter: "blur(5px)"} : {filter: "none"}}>
				<div className="splash-wrapper">
					<div></div>
					<h1>Customer Loyality Program</h1>
					<FontAwesomeIcon icon={faCamera} />
					<p>
						Scan <span>&</span> Win
					</p>
					<button onClick={props.handleSignin}>Signin</button>
				</div>
			</div>
			{props.loader && (
				<div className="loader">
					<CircularProgress size={120} />
				</div>
			)}
		</>
	);
};

export default SplashScreen;
