import Switchit from "../pages/switch";


const Top = ({ children }) => {
  return (
    <>
      <Switchit/>

      <main>{children}</main>
    </>
  );
};

export default Top;