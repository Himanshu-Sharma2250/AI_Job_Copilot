import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useGenerate = () => {
    return useMutation({
        mutationFn: (data) => {
            console.log("data in generation : ", data)
            return axios.post("https://ai-job-copilot-backend-0.onrender.com/generate", data)
        }
    })
}

export const useOnBoarding = () => {
    return useMutation({
        mutationFn: (data) => {
            console.log("data in onBoarding : ", data)
            return axios.post("https://ai-job-copilot-backend-0.onrender.com/onboarding", data)
        }
    })
}