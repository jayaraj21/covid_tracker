import React from 'react'
import './InfoBox.css'

import { Card, CardContent, Typography} from '@material-ui/core';

function InfoBox({title, cases, total}) {
    return (
        <Card  className="infoBox" variant="outlined">
        <CardContent>
          <Typography  color="textSecondary" >
            {title}
          </Typography>

    <h2 className="infoBox__cases" >{cases}</h2>

    
          <Typography className="infoBox_total"  color="textSecondary" >
            {total} Total
          </Typography>
           
        </CardContent>
        
      </Card>
    )
}

export default InfoBox
 