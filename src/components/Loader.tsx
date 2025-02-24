// import Header from './Header';
import '../styles/components/Loader.scss';

const Loader = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100dvh"
  }}>
      <div className="loader">
        {/* <Header /> */}
        <div className="loader__rest">
          <div className="loader__rest__shape"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
      
