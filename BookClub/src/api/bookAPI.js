import axios from "axios";

const validateUser = async () => {
    const token = localStorage.getItem("jwt");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    return config;
}

export const getBooks = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8080/api/books",
            validateUser()
        );
        return (response.data._embedded.books);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
export default getBooks;