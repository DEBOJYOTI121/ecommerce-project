import Button from '@mui/material/Button';
import { FaSearch } from "react-icons/fa";
const SearchBox=()=>{
    return(
          <div className='headerSearch w-'>
            <input type='text'placeholder='Search for Products....'/>
            <Button><FaSearch/></Button>
          </div>

    )
}
export default SearchBox;