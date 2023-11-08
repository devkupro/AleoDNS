import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
function ImageItem({img}) {

  const handleOpenNewTabEsol = () => {
    const url = 'https://esollabs.com/'; 
    window.open(url, '_blank');
  };

  const handleOpenNewTabAleo = () => {
    const url = 'https://aleo.org/'; 
    window.open(url, '_blank');
  };

      
  return (
    <Card  sx={{ maxWidth: 280, maxHeight: 350,borderRadius:'20px' }}>
      <CardActionArea>
        <div style={{margin:'16px'}}>
          <CardMedia
            component="img"
            height="240"
            image={img}
            alt="green iguana"
            sx={{borderRadius:'20px'}}
          />
        </div>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Typography className="text-esol" gutterBottom variant="h5" color={'white'} component="div"
          sx={{textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}
          onClick={handleOpenNewTabEsol}
          >
            Esollabs
          </Typography>
          <Typography gutterBottom variant="h5" component="div"
          onClick={handleOpenNewTabAleo}
          
          >
            Aleo
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ImageItem;
