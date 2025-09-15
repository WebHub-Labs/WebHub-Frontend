import { useEffect, useState } from 'react';
import Product from './Product';
import { publicRequest } from '../requestMethods';

const Products = ({ category, filters, sort }) => {
  console.log(category)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category ? `/products?category=${category}` : `/products`
        );
        const list = res.data?.data?.products || res.data?.data || res.data || [];
        setProducts(list);
      } catch (error) {}
    };

    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((i) =>
          Object.entries(filters).every(([key, value]) =>
            i[key].includes(value)
          )
        )
      );
  }, [category, filters, products]);

  useEffect(() => {
    switch (sort) {
      case 'newest':
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.createdAt - b.createdAt)
        );
        break;
      case 'asc':
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.price - b.price)
        );
        break;
      case 'desc':
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        );
        break;
      default:
        break;
    }
  }, [sort]);

  return (
    <div className="p-[20px] flex flex-wrap justify-between ">
      {category
        ? filteredProducts.map((i) => <Product key={i._id} item={i} />)
        : products.slice(0, 8).map((i) => <Product key={i._id} item={i} />)}
    </div>
  );
};

export default Products;
