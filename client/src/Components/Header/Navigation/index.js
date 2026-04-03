import { TiThMenu } from "react-icons/ti";
import { FaAnglesDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { BsPcDisplayHorizontal } from "react-icons/bs";
import { AiOutlineLaptop } from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { IoGameController } from "react-icons/io5";
import { GrBlog } from "react-icons/gr";
import { LuContactRound } from "react-icons/lu";
import { useState } from "react";
import { VscTriangleRight } from "react-icons/vsc";
const Navigation=()=>{

   const [isopenSidebarVal,setisopenSidebarVal]= useState(false);
    return(
      <nav>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3 navPart1'>
            <div className='cartWrapper'>
            <Button className='allcattab align-items-center'onClick={()=>setisopenSidebarVal(!isopenSidebarVal)}>
               <span className='icon1 mr-2'><TiThMenu/></span>
              <span class='text'>ALL CATAGORIES</span>
              <span className='icon2 ml-2'><FaAnglesDown/></span>
            </Button>
            <div className={`sidebarNav ${isopenSidebarVal === true ? 'open' : ''}`}>
             <ul>
              <li>
                <Link to="/"><Button>GPU<VscTriangleRight className='ml-auto'/>
                 </Button></Link>
                 <div className='subMenu'>
                  <Link to="/"><Button>NVIDIA RTX SERIES</Button></Link>
                  <Link to="/"><Button>AMD RADEON</Button></Link>
                 </div>
              </li>
              <li><Link to="/"><Button>PROCESSOSR<VscTriangleRight className='ml-auto'/>
              </Button></Link>
              <div className='subMenu'>
                  <Link to="/"><Button>INTEL</Button></Link>
                  <Link to="/"><Button>AMD</Button></Link>
                 </div>
              </li>
              <li><Link to="/" className="flex items-center w-full"><Button>RAM<VscTriangleRight className='ml-auto'/>
              </Button></Link>
                <div className='subMenu'>
                  <Link to="/"><Button>DDR4</Button></Link>
                  <Link to="/"><Button>DDR5</Button></Link>
                 </div>
              </li>
              <li><Link to="/"><Button>STORAGE<VscTriangleRight className='ml-auto'/></Button></Link>
              <div className='subMenu'>
                  <Link to="/"><Button>NVME GEN 3</Button></Link>
                  <Link to="/"><Button>NVME GEN 4</Button></Link>
                  <Link to="/"><Button>NVME GEN 5</Button></Link>
                  <Link to="/"><Button>EXTERNAL SSD</Button></Link>
                 </div>
              </li>
              <li className='menu-item'><Link to="/"><Button>SMPS<VscTriangleRight className='ml-auto'/>
              </Button></Link>
              <div className='subMenu'>
                  <Link to="/"><Button>CERTIFIED MODEL</Button></Link>
                  <Link to="/"><Button>BASED ON BRANDS</Button></Link>
              </div>
              </li>
              <li className='menu-item'><Link to="/"><Button>MOTHERBOARD
              <VscTriangleRight className='ml-auto'/></Button></Link>
              <div className='subMenu'>
                  <Link to="/"><Button>AMD CHIPSET</Button></Link>
                  <Link to="/"><Button>INTEL CHIPSET</Button></Link>
              </div>
              </li>
              <li className='menu-item'><Link to="/"><Button>CABINTS
              <VscTriangleRight className='ml-auto'/></Button></Link>
              <div className='subMenu'>
                  <Link to="/"><Button>FORM FACTOR</Button></Link>
                  <Link to="/"><Button>CABINET FANS</Button></Link>
                  <Link to="/"><Button>STYLE BASED</Button></Link>
                  <Link to="/"><Button>CASE ACCESSORIES</Button></Link>
              </div>
              </li>
              <li className='menu-item'><Link to="/"><Button>MONITOR
              <VscTriangleRight className='ml-auto'/></Button></Link>
              <div className='subMenu'>
                  <Link to="/"><Button>SHOP BY BRANDS</Button></Link>
                  <Link to="/"><Button>SHOP BY TYPE</Button></Link>
                  <Link to="/"><Button>SHOP BY SIZE</Button></Link>
              </div>
              </li>
              <li className='menu-item'><Link to="/"><Button>CPU COOLER
              <VscTriangleRight className='ml-auto'/></Button></Link>
              <div className='subMenu'>
                  <Link to="/"><Button>AIO LIQUID COOLER</Button></Link>
                  <Link to="/"><Button>AIR COOLER</Button></Link>
                  <Link to="/"><Button>ACCESSORIES</Button></Link>
                  <Link to="/"><Button>SHOP BY BRAND</Button></Link>
              </div>
              </li>
              <li className='menu-item'><Link to="/"><Button>PERIPHERALS
              <VscTriangleRight className='ml-auto'/></Button></Link>
              <div className='subMenu'>
                  <Link to="/"><Button>KEYBOARD</Button></Link>
                  <Link to="/"><Button>MOUSE</Button></Link>
                  <Link to="/"><Button>NETWORKING</Button></Link>
                  <Link to="/"><Button>PRINTER AND SCANNER</Button></Link>
                  <Link to="/"><Button>DESKTOP ACCESSORIES</Button></Link>
                  <Link to="/"><Button>HEADSETS</Button></Link>
              </div>
              </li>
              <li className='menu-item'><Link to="/"><Button>LAPTOP
              <VscTriangleRight className='ml-auto'/></Button></Link>
              <div className='subMenu'>
                  <Link to="/"><Button>SHOP BY BRAND</Button></Link>
                  <Link to="/"><Button>LAPTOP ACCESSORIES</Button></Link>
              </div>
              </li>
              <li><Link to="/"><Button>MINI PC</Button></Link></li>
              </ul>              
          </div>
          </div>
          </div>
          <div className='col-sm-9 navPart2 d-flex align-items-center'>
            <ul className='list list-inline w-100'>
            <li className='list-inline-item'><Link to="/"><GoHome/>&nbsp;HOME</Link></li>
            <li className='list-inline-item nav-item-with-submenu'>
            <Link to="/"><Button className="parent">
            <BsPcDisplayHorizontal/>&nbsp;PC COMPONENTS</Button></Link>
            <div className='submenu shadow'>
              <Link to="/"><Button>GPU</Button></Link>
              <Link to="/"><Button>PROCESSOSR</Button></Link>
              <Link to="/"><Button>RAM</Button></Link>
              <Link to="/"><Button>STORAGE</Button></Link>
              <Link to="/"><Button>SMPS</Button></Link>
              <Link to="/"><Button>CABINTS</Button></Link>
              <Link to="/"><Button>MONITOR</Button></Link>
              <Link to="/"><Button>COOLER</Button></Link>
            </div>
            </li>
            <li className='list-inline-item'><Link to="/"><AiOutlineLaptop/>&nbsp;LAPTOP</Link></li>
            <li className='list-inline-item'><Link to="/"><SiBrandfolder/>&nbsp;BRAND</Link></li>
            <li className='list-inline-item'><Link to="/"><IoGameController/>&nbsp;GAMING COMPONENTS</Link></li>
            <li className='list-inline-item'><Link to="/"><GrBlog/>&nbsp;BLOG</Link></li>
            <li className='list-inline-item'><Link to="/"><LuContactRound/>&nbsp;CONTACT US</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    )
}
export default Navigation;