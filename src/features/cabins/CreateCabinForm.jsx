import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import PropTypes from "prop-types";
import FormRow from "../../ui/FormRow.jsx";
import useCreateCabin from "./useCreateCabin.js";
import useEditCabin from "./useEditCabin.js";
import {useForm} from "react-hook-form";

function CreateCabinForm({cabinToEdit = {}}) {
  const {id: editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);
    const {register, handleSubmit, reset, getValues, formState} = useForm(
        {
            defaultValues: isEditSession ? editValues : {}
        }
    );

  const {errors} = formState;
  const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
      const image = typeof data.image === 'string' ? data.image : data.image[0];

      if(isEditSession) editCabin({newCabinData: {...data, image}, id: editId}, {
          // eslint-disable-next-line no-unused-vars
              onSuccess: (data) => reset(),
          });
      else createCabin({...data, image: image}, {
          // eslint-disable-next-line no-unused-vars
              onSuccess: (data) => reset(),
          });
  }

  function onError(errors) {
      console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

        <FormRow label="Cabin name" error={errors?.name?.message}>
          <Input disabled={isWorking} type="text" id="name" {...register('name', {
              required: 'This field is required'
          })}/>
        </FormRow>

        <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
            <Input disabled={isWorking} type="number" id="maxCapacity" {...register('maxCapacity', {
                required: 'This field is required',
                min: {
                    value: 1,
                    message: 'Capacity should be at least 1'
                }
            })}/>
        </FormRow>

        <FormRow label="Regular price" error={errors?.regularPrice?.message}>
            <Input disabled={isWorking} type="number" id="regularPrice" {...register('regularPrice', {
                required: 'This field is required',
                min: {
                    value: 100,
                    message: 'Price should be at least 100'
                }
            })}/>
        </FormRow>

        <FormRow label="Discount" error={errors?.discount?.message}>
            <Input disabled={isWorking} type="number" id="discount" defaultValue={0} {...register('discount', {
                required: 'This field is required',
                validate: (value) => value < getValues().regularPrice || 'Discount should be less than ' +
                    'regular price',
            })}/>
        </FormRow>

        <FormRow label="Description for website" error={errors?.description?.message}>
            <Textarea
                disabled={isWorking}
                type="number"
                id="description"
                defaultValue="" {...register('description', {
                required: 'This field is required'
            })}/>
        </FormRow>

        <FormRow label="Cabin photo">
            <FileInput
                id="image"
                accept="image/*"
                type="file"
                {...register('image', {
                    required: isEditSession ? false : 'This field is required'
                })}
            />
        </FormRow>

        <FormRow>
        {/* type is an HTML attribute! */}
            <Button variation="secondary" type="reset">
            Cancel
            </Button>
            <Button disabled={isWorking}>{isEditSession ? "Edit  cabin" : "Create new cabin"}</Button>
        </FormRow>

    </Form>
  );
}

CreateCabinForm.propTypes = {
    cabinToEdit: PropTypes.object,
};

export default CreateCabinForm;
