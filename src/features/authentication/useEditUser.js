import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

function useEditUser () {
    const queryClient = useQueryClient();

    const {mutate: editCabin, isLoading: isEditing} = useMutation({
        mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
        onSuccess: () =>
        {
            toast.success('Cabin successfully edited');
            queryClient.invalidateQueries({ queryKey: ['cabins']});
        },
        onError: (err) => toast.error(err.message),
    });

    return {editCabin, isEditing};
 }

 export default useEditUser;