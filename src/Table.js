import React from 'react'
import './Table.css'
import numeral from "numeral";



function Table({countries}) {
   

    return (
        <div  className="table" >
            
          {countries.map(({country, cases}) => (
              <tr>
                  <td>{country}</td>
                 <strong> <td>
                 {numeral(cases).format("0,0")}
                     </td> </strong> 
              </tr>

             
               
          ))}

        </div>
    )
}



export default Table