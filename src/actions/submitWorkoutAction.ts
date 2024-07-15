import { ActionFunction } from 'react-router-dom';

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const submitWorkoutAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);
  // I do not know how to pass file on drag and drop

  const errors: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(payload)) {
    if (!value) {
      errors[key] = `${key} cannot be empty`;
    }
  }

  if (payload.email && !validateEmail(payload.email as string)) {
    errors.email = `Please use correct formatting. \n
      Example: address@email.com`;
  }

  const file: File | null = formData.get('fileInput') as File;

  if (!file || !file.name) {
    errors.fileInput = 'Please upload a file';
  }

  if (Object.keys(errors).length > 0) {
    return new Response(JSON.stringify({ errors }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch('http://letsworkout.pl/submit', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }

  const form = document.querySelector('form');
  if (form) {
    form.reset();
  }
  return new Response('Success', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
};
