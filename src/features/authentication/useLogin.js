import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login as loginApi} from "../../services/apiAuth.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const queryCLient = useQueryClient()
    const navigate = useNavigate();

    // вот эта мутация позволяет обработать получение данных от сервера о идентификации
    const {mutate: login, isLoading} =  useMutation({
        mutationFn: ({email, password}) => loginApi({
            email, password
        }),
        onSuccess: (user) =>
        {
            queryCLient.setQueryData(["user"], user.user)
            navigate("/dashboard", {replace: true});
        },
        onError: err => {
            console.log("ERROR", err);
            toast.error("Provided email or password are incorrect");
        }
    })

    return {login, isLoading}
}