// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Badge,
//   Typography,
// } from "@material-ui/core";
// import { ShoppingCart } from "@material-ui/icons";
// import { Link } from "react-router-dom";
// import logo from "../../assets/circles.png";

// const Navbar = ({ totalItems }) => {
//   return (
//     <div>
//       <AppBar position="fixed" color="inherit">
//         <Toolbar>
//           <Typography component={Link} to="/" variant="h5" color="inherit">
//             <img src={logo} alt="Book Store App" height="50px" />
//             <div>BOOKSHOP</div>
//           </Typography>

//           <div>
//             <IconButton
//               component={Link}
//               to="/cart"
//               aria-label="Show cart items"
//               color="inherit"
//             >
//               <Badge badgeContent={totalItems} color="secondary">
//                 <ShoppingCart />
//               </Badge>
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

// export default Navbar;
