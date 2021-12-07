import { useState, forwardRef } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
// import Skeleton from "@mui/material/Skeleton";
import LinearProgress from '@mui/material/LinearProgress';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./layout.css";

const Layout = forwardRef((props, ref) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const logoutHandler = () => {
		handleClose();
		props.handleLogout();
	};

	return (
		<div className="layout-wrapper">
			<div className="my-navbar">
				<div>
					<Avatar alt="Your Avatar" src={props.dpURL} />
					<p>{props.userName}</p>
				</div>
				<IconButton
					aria-label="menu"
					aria-controls="basic-menu"
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}
					edge="start"
					size="small"
				>
					<FontAwesomeIcon className="setting-btn" icon={faBars} />
				</IconButton>
			</div>
			<div className="balance-wrapper">
				<p>Points</p>
				<h1>
					<span>$</span>
					{props.points[0] === "0" ? "0" : props.points}
				</h1>
				<button onClick={props.handleEarn}>Scan</button>
			</div>
			<Menu
				component="nav"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={logoutHandler}>Logout</MenuItem>
			</Menu>
			<div className="MFC-display">
				{/*{props.data === "" ? (
					<>
						<Skeleton variant="text" />
						<Skeleton variant="text" />
						<Skeleton variant="text" />
						<Skeleton variant="text" />
						<Skeleton variant="text" />
					</>
				) : props.data}*/}
				<h2>Processing Image...</h2>
				<LinearProgress variant="determinate" value={props.scanProcessValue} />
			</div>
		</div>
	);
});

export default Layout;
