import { get } from "axios";
import { useQuery } from "@tanstack/react-query";
//import { CarResponse } from "../types";

function Booklist() {
  const getBooks = async () => {
    try {
      const response = await get("http://localhost:8080/api/cars");
      return response.data._embedded.cars;
    } catch (error) {
      console.error("Error fetching cars:", error);
      return []; // Return an empty array if there's an error
    }
  };
  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getBooks,
  });
  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching cars...</span>;
  } else {
    return (
      <table>
        <tbody>
          {data.map((car) => {
            `<tr key="${car._links.self.href}">
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.color}</td>
        <td>${car.registrationNumber}</td>
        <td>${car.modelYear}</td>
        <td>${car.price}</td>
      </tr>`;
          })}
        </tbody>
      </table>
    );
  }

  // Calling the getCars function
  // getCars()
  //   .then((cars) => {
  //     // Do something with the fetched cars, such as logging them
  //     console.log("Fetched cars:", cars);
  //   })
  //   .catch((error) => {
  //     // Handle any errors that occurred during fetching
  //     console.error("Error fetching cars:", error);
  //   });
}

// Call the Carlist function to initiate fetching cars
// Booklist();

// Exporting the function if needed
export default Booklist;
