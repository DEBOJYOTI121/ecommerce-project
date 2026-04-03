import React from 'react';
import ProductItem from '../ProductItem/ProductItem';

const products = [
  {
    name: 'Zotac Gaming RTX 5080 Solid OC White 16GB GDDR7 Graphics Card',
    image: '/images/1st.webp',
    oldPrice: 219999,
    newPrice: 166580,
    stock: 'IN STOCK',
    discount: 24,
  },
  {
    name: 'Zotac RTX 5080 AMP Extreme Infinity 16GB GDDR7 Graphics Card',
    image: '/images/2nd.webp',
    oldPrice: 265000,
    newPrice: 175000,
    stock: 'LIMITED STOCK',
    discount: 34,
  },
  {
    name: 'GALAX RTX 5080 1-Click OC 16GB GDDR7 Graphics Card',
    image: '/images/3rd.webp',
    oldPrice: 176980,
    newPrice: 176300,
    stock: 'IN STOCK',
    discount: 27,
  },
  {
    name: 'AMD Athlon 3000G Processor with Radeon Vega 3 Graphics',
    image: '/images/4th.webp',
    oldPrice: 239999,
    newPrice: 176300,
    stock: 'IN STOCK',
    discount: 27,
  },
  {
    name: "AMD Ryzen 9 5900XT Processor",
    image: "/images/5.jpg",
    oldPrice: 59000,
    newPrice: 29500,
    stock: "IN STOCK",
    discount: 50,
  },
  {
    name: "MSI Cyborg 15 A12UCX-1469IN Gaming Laptop (i5-12450H/RTX 2050 4GB GDDR6)",
    image: "/images/6.webp",
    oldPrice: 92990,
    newPrice: 61750,
    stock: "LIMITED STOCK",
    discount: 34,
  },
  {
    name: "Gigabyte G5 MF5-H2IN354SH Gaming Laptop (i7-13620H/RTX 4050)",
    image: "/images/7.webp",
    oldPrice: 159000,
    newPrice: 75490,
    stock: "IN STOCK",
    discount: 53,
  },
  {
    name: "Ant Esports GP320 Wireless Game Controller",
    image: "/images/8th.jpg",
    oldPrice: 2999,
    newPrice: 1199,
    stock: "LIMITED STOCK",
    discount: 60,
  },
];

const NewItem = ({ itemView }) => {
  return (
    <div className="newItemContainer">
      <h3 className="newItemHeading">LATEST GAMING COMPONENTS</h3>
      <h3 className="newItemSubheading">FRESH ARRIVALS AT GREAT PRICES</h3>

      {/* itemView controls the grid layout */}
      <div className={`newItemGrid ${itemView}`}>
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
};
export default NewItem;
