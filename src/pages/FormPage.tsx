import { FC, useEffect, useState } from 'react';
import { Form, useLoaderData, useActionData } from 'react-router-dom';
import DropZone from '../components/DropZone';
import Calendar from '../components/Calendar';
import Slider from '../components/Slider';
import Container from '../layouts/Container';
import FormRow from '../components/FormRow';
import SubmitBtn from '../components/SubmitButton';
import ErrorIcon from '../assets/icons/error-icon.svg';
import { Holiday } from '../interfaces/Holiday';
import { availableTimes } from '../constants/availableTimes';

const FormPage: FC = () => {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const holidays = useLoaderData();
  const actionData = useActionData();

  useEffect(() => {
    if (actionData && (actionData as { errors: any }).errors) {
      const { errors } = actionData as { errors: any };
      //have problem with type it correctly
      setFormErrors(errors || {});
    }
  }, [actionData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  };
  const handleComponentChange = (name: string) => {
    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  };

  return (
    <Container>
      <h2 className="text-2xl font-medium mb-6">Personal info</h2>
      <Form method="POST" encType="multipart/form-data">
        <FormRow
          type="text"
          name="firstName"
          labelText="FirstName"
          onChange={handleInputChange}
          hasError={!!formErrors.firstName}
        />
        {formErrors.firstName && (
          <p className="text-sm mt-[-.25rem] mb-2">
            <img src={ErrorIcon} className="pr-1 inline" alt="error icon" />{' '}
            {formErrors.firstName}
          </p>
        )}
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          onChange={handleInputChange}
          hasError={!!formErrors.lastName}
        />
        {formErrors.lastName && (
          <p className="text-sm mt-[-.25rem] mb-2">
            <img src={ErrorIcon} className="pr-1 inline" alt="error icon" />
            {formErrors.lastName}
          </p>
        )}
        <FormRow
          type="text"
          name="email"
          labelText="Email Address"
          onChange={handleInputChange}
          hasError={!!formErrors.email}
        />
        {formErrors.email && (
          <p className="text-sm mt-[-.25rem] mb-2">
            <img src={ErrorIcon} className="pr-1 inline" alt="error icon" />
            {formErrors.email}
          </p>
        )}
        <Slider min={8} max={100} label="Age" />
        <DropZone
          onChange={() => handleComponentChange('fileInput')}
          hasError={!!formErrors.fileInput}
        />
        {formErrors.fileInput && (
          <p className="text-sm mt-[-.25rem] mb-2">
            <img src={ErrorIcon} className="pr-1 inline" alt="error icon" />
            {formErrors.fileInput}
          </p>
        )}

        <h2 className="text-2xl font-medium mb-6"> Your workout</h2>
        <div className="w-100 gap-4">
          <Calendar
            availableTimes={availableTimes}
            holidays={holidays as Holiday[]}
            onChange={(name) => {
              setFormErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
              });
            }}
          />
          {formErrors.selectedDate && (
            <p className="text-sm mt-[-.25rem] mb-2">
              <img src={ErrorIcon} className="pr-1 inline" alt="error icon" />
              {formErrors.selectedDate}
            </p>
          )}
          {formErrors.selectedTime && (
            <p className="text-sm mt-[-.25rem] mb-2">
              <img src={ErrorIcon} className=" pr-1 inline" alt="error icon" />
              {formErrors.selectedTime}
            </p>
          )}
        </div>

        <SubmitBtn />
      </Form>
    </Container>
  );
};

export default FormPage;
