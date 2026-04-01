import axios from "axios"

export const generateApplication = async (data) => {
    try {
        console.log("data using : ", data)
        const res = await axios.post("http://127.0.0.1:8000/generate", data);

        return res.data
    } catch (error) {
        console.error("Error generating application ", error)
        throw error;
    }
}