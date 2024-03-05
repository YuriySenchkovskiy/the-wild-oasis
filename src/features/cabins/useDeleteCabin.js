// call our client
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const queryClient = useQueryClient();

// eslint-disable-next-line no-unused-vars
    const {isLoading, mutate} =  useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
            toast.success("Cabin successfully deleted")

            // we will make data invalidate
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            })
        },

        onError: (err) => toast.error(err.message)
    });

    return { isLoading, mutate };
}
