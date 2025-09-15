import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Slider from '../components/Slider';

export default function Home({storeName}) {
  return (
    <div>
      <Announcement />
      <Navbar storeName={storeName} />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const contex = context;
  console.log(context.rawHeaders);
  return {
    props: {
      storeName: "Salt Nepal"
    }, 
  };
}