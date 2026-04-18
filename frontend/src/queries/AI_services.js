import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useGenerate = () => {
    return useMutation({
        mutationFn: (data) => {
            console.log("data in generation : ", data)
            return axios.post("http://127.0.0.1:8000/generate", data)
        }
    })
}

export const useOnBoarding = () => {
    return useMutation({
        mutationFn: (data) => {
            console.log("data in onBoarding : ", data)
            return axios.post("http://127.0.0.1:8000/onboarding", data)
        }
    })
}