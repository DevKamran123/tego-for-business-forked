import '../styles/components/LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="spinner__circle"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;