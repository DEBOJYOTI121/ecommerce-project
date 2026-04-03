import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { FaAnglesDown} from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const locations = [
  "Kolkata", "ParkCircus", "Ballygunje", "Dhakuria", "Jadavpur", "Baghajatin", "New Garia", "Garia", "Narendrapur",
  "SonarPur", "Subhasgram", "Mallikpur", "Baruipur", "Shasan", "KrisnoMohan", "DhopDhopi", "Suryapur", "Gocharan",
  "Hogla", "Barasat", "Baharu", "Joynagar Majilpur", "Mathurapur"
];
const CountryDropdown = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Mathurapur');

  // Filter locations based on input
  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setIsOpenModal(false);
    setSearchTerm(''); // clear search after selection
  };

  return (
    <>
      <Button className='countryDrop' onClick={() => setIsOpenModal(true)}>
        <div className='info d-flex flex-column'>
          <span className='label'>Your Location</span>
          <span className='name'>{selectedLocation}</span>
        </div>
        <span className='ml-auto'><FaAnglesDown /></span>
      </Button>

      <Dialog open={isOpenModal} onClose={() => setIsOpenModal(false)} className='LocationModel' slots={{ transition: Transition }}>
        <h4 className='mb-0'>Choose your Delivery Location</h4>
        <p>Enter your address and we will specify the offer for your area.</p>

        <Button className='close_' onClick={() => setIsOpenModal(false)}><IoMdClose /></Button>

        <div className='headerSearch w-100'>
          <input
            type='text'
            placeholder='Search Your Area....'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button><FaSearch /></Button>
        </div>

        <ul className='AreaList mt-3'>
          {filteredLocations.map((location, index) => (
            <li key={index}>
              <Button onClick={() => handleSelectLocation(location)}>{location}</Button>
            </li>
          ))}
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropdown;
