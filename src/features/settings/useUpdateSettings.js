import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateSetting} from "../../services/apiSettings.js";

function useUpdateSettings () {
    const queryClient = useQueryClient();

    const {mutate: updateSettings, isLoading: isUpdating} = useMutation({
        mutationFn: updateSetting,
        onSuccess: () =>
        {
            toast.success('Settings successfully edited');
            queryClient.invalidateQueries({ queryKey: ['settings']});
        },
        onError: (err) => toast.error(err.message),
    });

    return {updateSettings, isUpdating};
}

export default useUpdateSettings;