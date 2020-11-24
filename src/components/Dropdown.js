import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import Dropdown from 'react-bootstrap/Dropdown';



function DropdownElement({items,activeItem,onSelect}) {
    const [dropdownVisible,setDropdownVisible]=useState(false);

    const selectItem=(e,value)=>{

      // e.preventDefault();
      setDropdownVisible(!dropdownVisible);
      onSelect(value);
    }


   
    useEffect(()=>{
      const init=async ()=>{
     
      // onSelect(activeItem.value);

      }

      init();
    });



    
    return (
      <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    {activeItem.value.ticker}
  </Dropdown.Toggle>

  <Dropdown.Menu>

  {
          items && items.map((item,i)=>(
          <Dropdown.Item href="#" 
          className={`dropdown-item ${item.value===activeItem.value?'active':null}`}
          key={i}
          onClick={(e)=>(selectItem(e,item.value))}
          >
          {item.label}
          </Dropdown.Item>


            // <a className={`dropdown-item ${item.value===activeItem.value?'active':null}`}
            //  href="#"
            //  key={i}
            //  onClick={(e)=>(selectItem(e,item.value))}
            //  >
            // {item.label}
            // </a>

          ))
      }

    {/* // <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    // <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    // <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}

  </Dropdown.Menu>
</Dropdown>
    )

    

//     return (
//       <div className="dropdown ml-3">
// <button className="btn btn-secondary dropdown-toggle"
//  type="button"
//  onClick={()=>setDropdownVisible(!dropdownVisible)}
//  >
// {activeItem.label}
// </button>


// <div className={`dropdown-menu ${dropdownVisible?'visible':''}`} >
//       {
//           items && items.map((item,i)=>(
//             <a className={`dropdown-item ${item.value===activeItem.value?'active':null}`}
//              href="#"
//              key={i}
//              onClick={(e)=>(selectItem(e,item.value))}
//              >
//             {item.label}
//             </a>

//           ))
//       }
   
//   </div>
// </div>
//     )

    }

export default DropdownElement
