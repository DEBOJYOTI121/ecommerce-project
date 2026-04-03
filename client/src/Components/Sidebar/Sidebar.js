import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useState } from 'react';
const Sidebar = () => {
  const [value, setValue]=useState([100,60000]);

  return (
    <>
      <div className="sidebar">
      <div className="sticky">
        <div className="filterBox">
          <h5>PRODUCT CATEGORIES</h5>
          <div className='scroll'>
            <ul>
              <li>
                <FormControlLabel control={<Checkbox/>} label="AMD" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox/>} label="AMD" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox/>} label="AMD" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox/>} label="AMD" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox/>} label="AMD" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox/>} label="AMD" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox/>} label="AMD" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox/>} label="AMD" />
              </li>
            </ul>
         </div>
        </div>
        <div className="filterbox">
          <h6 className='mt-3'>FILTER BY PRICE</h6>
          <div className="upper">
           <RangeSlider value={value} onInput={setValue} min={100} max={60000} step={5}/>
           <div className='d-flex pt-2 pb-2 priceRange'>
            <span>Form: <strong className='text-success'>Rs:{value[0]}</strong></span>
            <span className='ml-5'>From: <strong className='text-success'>Rs:
            {value[1]}</strong></span>
            </div>
           </div>
        <div className="filterbox">
          <h6 className='mt-1'>PRODUCT STATUS</h6>
          <div className="upper">
          <div className='scroll'>
          <ul>
            <li>
              <FormControlLabel className='w-100' control={<Checkbox/>} label="In Stock">
              </FormControlLabel>
            </li>
            <li>
              <FormControlLabel className='w-100' control={<Checkbox/>} label="On Sale">
              </FormControlLabel>
            </li>
          </ul>
          </div>
          </div>
        </div>
        <div className="filterbox">
          <h6 className='mt-1'>BRANDS</h6>
          <div className="upper">
          <div className='scroll'>
          <ul>
            <li>
              <FormControlLabel className='w-100' control={<Checkbox/>} label="AMD">
              </FormControlLabel>
            </li>
            <li>
              <FormControlLabel className='w-100' control={<Checkbox/>} label="INTEL">
              </FormControlLabel>
            </li>
            <li>
              <FormControlLabel className='w-100' control={<Checkbox/>} label="NVIDIA">
              </FormControlLabel>
            </li>
            <li>
              <FormControlLabel className='w-100' control={<Checkbox/>} label="RADEON">
              </FormControlLabel>
            </li>
            <li>
              <FormControlLabel className='w-100' control={<Checkbox/>} label="REDGEAR">
              </FormControlLabel>
            </li>
          </ul>
          </div>
          </div>
          <br/>
           <img
          src="/images/Inosuke.jpeg"
          alt="offer"
          className="anime2"
          />
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;

