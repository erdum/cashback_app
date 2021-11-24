import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./splashScreen.css";

const SplashScreen = forwardRef((props, ref) => {
	return (
		<div ref={ref} className="splash-wrapper-wrapper">
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
	);
});

export default SplashScreen;
