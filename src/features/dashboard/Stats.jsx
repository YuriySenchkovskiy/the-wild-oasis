import Stat from "./Stat.jsx";
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from "react-icons/hi2";
import {formatCurrency} from "../../utils/helpers.js";

// eslint-disable-next-line react/prop-types,no-unused-vars
function Stats({bookings, confirmed, numDays, cabinCount}) {
    // eslint-disable-next-line react/prop-types
    const numBookings = bookings.length;
    // eslint-disable-next-line react/prop-types
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    // eslint-disable-next-line react/prop-types
    const checkins = confirmed.length;
    // eslint-disable-next-line react/prop-types
    const occupation = confirmed.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinCount);

    return (
        <>
            <Stat
                title="Bookings"
                color='blue'
                icon={<HiOutlineBriefcase/>}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color='green'
                icon={<HiOutlineBanknotes/>}
                value={formatCurrency(sales)}
            />
            <Stat
                title="Check ins"
                color='indigo'
                icon={<HiOutlineCalendarDays/>}
                value={checkins}
            />
            <Stat
                title="Occupancy rate"
                color='yellow'
                icon={<HiOutlineChartBar/>}
                value={Math.round(occupation * 100) + "%"}
            />
        </>
    )
 }

 export default Stats