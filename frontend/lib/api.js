import axios from "axios"

export const generateApplication = async (data) => {
    try {
        console.log("data using : ", data)
        const res = await axios.post("http://127.0.0.1:8000/generate", data);

        if (res.data && typeof res.data.resume === 'string') {
            try {
                res.data.resume = JSON.parse(res.data.resume);
            } catch (e) {
                console.error("Error parsing resume JSON:", e);
            }
        }

        return res.data;
    } catch (error) {
        console.error("Error generating application ", error)
        throw error;
    }
}