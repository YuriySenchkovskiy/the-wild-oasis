// call our client
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteBooking} from "../../services/apiBookings.js";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

// eslint-disable-next-line no-unused-vars
    const {isLoading, mutate} =  useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            toast.success("Booking successfully deleted")

            // we will make data invalidate
            queryClient.invalidateQueries({
                queryKey: ['bookings'],
            })
        },

        onError: (err) => toast.error(err.message)
    });

    return { isLoading, mutate };
}
