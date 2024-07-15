import { FC } from 'react';
import { useNavigation } from 'react-router-dom';

const SubmitBtn: FC = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      type="submit"
      className="w-full h-12 bg-primary text-text-white hover:bg-primary-hover transition-colors duration-300 rounded"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Sending...' : 'Send Application'}
    </button>
  );
};

export default SubmitBtn;
