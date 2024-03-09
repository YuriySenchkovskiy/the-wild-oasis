import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import {HiArrowDownOnSquare} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Modal from "../../ui/Modal.jsx";
import {useDeleteBooking} from "./useDeleteBooking.js";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // eslint-disable-next-line no-unused-vars
  const {mutate, isLoading: isDeleting} = useDeleteBooking();
  const {booking, isLoading} = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if(isLoading) return <Spinner />
  const {status, id: bookingId} = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
          {status === 'unconfirmed' &&
              <Button icon={<HiArrowDownOnSquare/>}
                            onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                  Check in
              </Button>
          }

          <Modal>
            <Modal.Open opens="delete">
              <Button variation="danger">
                Delete booking
              </Button>
            </Modal.Open>

            <Modal.Window name='delete'>
              <ConfirmDelete
                  resourceName='booking'
                  onConfirm={() => {mutate(bookingId, {
                    onSettled: () => navigate(-1)
                  })}}
                  disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
