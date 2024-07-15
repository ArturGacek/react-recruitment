import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import FormPage from './pages/FormPage';

import { calendarStatsLoader } from './loaders/formPageLoader';
import { submitWorkoutAction } from './actions/submitWorkoutAction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FormPage />,
    loader: calendarStatsLoader,
    action: submitWorkoutAction,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
