import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useForm} from "react-hook-form";
import {useSignUp} from "./useSignUp.js";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {signup, isLoading} = useSignUp();
  const {register, formState, getValues, handleSubmit, reset} = useForm();
  const {error} = formState;

  function onSubmit({fullName, email, password}) {
      signup({fullName, email, password}, {
          onSettled: reset,
      })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={error?.fullName?.message}>
        <Input
            type="text"
            id="fullName"
            {...register('fullName', {
                required: "This field is required"
            })}
            disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={error?.email?.message}>
        <Input type="email" id="email"
               {...register('email', {
                   required: "This field is required",
                   pattern: {
                       value: /\S+@\S+\.\S+/,
                       message: "Please provide a valid email address"
                   }
               })}
               disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={error?.password?.message}>
        <Input type="password" id="password"
               {...register('password', {
                   required: "This field is required",
                   minLength: {
                       value: 8,
                       message: "Passwords need a minimum of 8 characters"
                   }
               })}
               disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={error?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm"
               {...register('passwordConfirm', {
                   required: "This field is required",
                   validate: (value) => value === getValues().password
                   || "Password need to match",
               })}
               disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
