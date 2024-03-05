import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from "./useSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import useUpdateSettings from "./useUpdateSettings.js";

function UpdateSettingsForm() {
    // eslint-disable-next-line no-unused-vars
  const {isLoading,
      settings: {
          minBookingLength,
          maxBookingLength,
          maxNumberOfGuests,
          breakfastNumber}= {},
      } = useSettings();

  const {isUpdating, updateSettings} = useUpdateSettings();

  function handleUpdate(e, field) {
      const { value } = e.target;
      if(!value) return;
      updateSettings({[field]: value});
  }

  if(isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number'
               id='min-nights'
               disabled={isUpdating}
               defaultValue={minBookingLength}
               onBlur={e => handleUpdate(e, 'minBookingLength')}/>
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input type='number'
               id='max-nights'
               disabled={isUpdating}
               defaultValue={maxBookingLength}
               onBlur={e => handleUpdate(e, 'maxBookingLength')}/>
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input type='number'
               id='max-guests'
               disabled={isUpdating}
               defaultValue={maxNumberOfGuests}
               onBlur={e => handleUpdate(e, 'maxNumberOfGuests')}/>
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input type='number'
               id='breakfast-price'
               disabled={isUpdating}
               defaultValue={breakfastNumber}
               onBlur={e => handleUpdate(e, 'breakfastNumber')}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
