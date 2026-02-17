import { toast } from "vue3-toastify"
import router from "../../router"

export const notify = {
    success(text, location, duration){
        return toast.success(text, {            
            position: "bottom-left",
            autoClose: duration, // kit jea mms 1000 ms = 1 second
            onClose: () => {
                router.push(location) // tor job progress bar bn push to home page after 1 second when toast disappear
            }, 
    })},
    error(message){
        return toast.error(message, {
            position: "bottom-left",
            autoClose: 1000,
            // hideProgressBar: true,
            // closeOnClick: false,
        })
    }
}