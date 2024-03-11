import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import BookResponse from "./types";

function AuthorList() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", user);
      const token = response.headers.authorization;
      if (token !== null) {
        const splitToken = token.split("Bearer ");
        localStorage.setItem("jwt", splitToken[1]);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setOpen(true);
    }
  };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   sessionStorage.setItem("jwt", "");
  // };
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const response = await axios.get(
            "http://localhost:8080/api/books",
            config
          );
          setBooks(response.data._embedded.books);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (!books.length && isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]); // Run effect when isLoggedIn changes

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "totalPages", headerName: "Total Pages", width: 200 },
    { field: "rating", headerName: "Rating", width: 200 },
    { field: "publishesDate", headerName: "Publishes Date", width: 200 },
    { field: "ISBNNumber", headerName: "ISBN Number", width: 200 },
  ];

  return (
    <div>
      {!isLoggedIn && (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center" // Add this to center horizontally
          sx={{ height: "100vh" }}
        >
          <TextField name="username" label="Username" onChange={handleChange} />
          <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
          />
          <Button variant="outlined" color="primary" onClick={handleLogin}>
            Login
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="Login failed: Check your username and password"
          />
        </Stack>
      )}
      {isLoggedIn && (
        <>
          <DataGrid
            rows={books}
            columns={columns}
            getRowId={(row) => row._links.self.href}
          />

        </>
      )}
    </div>
  );
}

export default AuthorList;

// function Booklist() {
//   // return <>
//   //   <h1>test</h1>
//   // </>
//   const getBooks = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/authors");
//       return response.json();
//     } catch (error) {
//       console.error("Error fetching cars:", error);
//       return []; // Return an empty array if there's an error
//     }
//   };
//   const { data, error, isSuccess } = useQuery({
//     queryKey: ["cars"],
//     queryFn: getBooks,
//   });

//   if (!isSuccess) {
//     return <span>Loading...</span>;
//   } else if (error) {
//     return <span>Error when fetching cars...</span>;
//   } else {
//     // return (
//     //   <table>
//     //     <tbody>
//     //       {data.map((car) => {
//     //         `<tr key="${car._links.self.href}">
//     //     <td>${car.brand}</td>
//     //     <td>${car.model}</td>
//     //     <td>${car.color}</td>
//     //     <td>${car.registrationNumber}</td>
//     //     <td>${car.modelYear}</td>
//     //     <td>${car.price}</td>
//     //   </tr>`;
//     //       })}
//     //     </tbody>
//     //   </table>
//     // );
//     return (
//       <div>
//         <h2>Authors</h2>
//         <ul>
//           {authors.map(author => (
//             <li key={author._links.self.href}>
//               <strong>{`${author.firstName} ${author.middleName ? author.middleName + ' ' : ''}${author.lastName}`}</strong>
//               <ul>
//                 <li>First Name: {author.firstName}</li>
//                 <li>Middle Name: {author.middleName}</li>
//                 <li>Last Name: {author.lastName}</li>
//                 <li>
//                   <a href={author._links.self.href}>Details</a>
//                 </li>
//                 <li>
//                   <a href={author._links.books.href}>Books</a>
//                 </li>
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

//   Calling the getCars function
//     getCars()
//     .then((cars) => {
//       // Do something with the fetched cars, such as logging them
//       console.log("Fetched cars:", cars);
//     })
//     .catch((error) => {
//       // Handle any errors that occurred during fetching
//       console.error("Error fetching cars:", error);
//     });
// }

// Call the Carlist function to initiate fetching cars
// Booklist();

// Exporting the function if needed
// export default Booklist;
