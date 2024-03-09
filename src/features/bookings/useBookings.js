import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";
import {PAGE_SIZE} from "../../utils/constants.js";

function useBookings () {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    //filter
    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === 'all' ? null : {field: 'status', value: filterValue, method: 'eq'};

    //sort
    const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };

    //paginatiaon
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    // query
    const {
        isLoading,
        data,
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({
            filter,
            sortBy,
            page
        })
    });

    const bookings = data?.data; // Используйте data?.data для доступа к данным бронирований
    const count = data?.count;

    //pre-fetching
    const pageCount = Math.ceil(count / PAGE_SIZE)
    if(page < pageCount)
    queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, page + 1],
        queryFn: () => getBookings({
            filter,
            sortBy,
            page: page + 1
        })
    })

    if(page > 1)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1],
            queryFn: () => getBookings({
                filter,
                sortBy,
                page: page - 1
            })
        })

    return {isLoading, bookings, error, count};
 }

 export default useBookings