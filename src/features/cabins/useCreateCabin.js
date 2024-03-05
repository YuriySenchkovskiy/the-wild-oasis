import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";

function useCreateCabin() {
    const queryClient = useQueryClient();
    const {mutate: createCabin, isLoading: isCreating} = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () =>
        {
            toast.success('New cabin successfully created');
            queryClient.invalidateQueries({ queryKey: ['cabins']});
            // this reset come from react hook form library
            // reset();
        },
        onError: (err) => toast.error(err.message),
    })

    return {createCabin, isCreating};
 }
 
 export default useCreateCabin;