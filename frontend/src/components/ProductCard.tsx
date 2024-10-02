import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

interface IProps {
  _id: string;
  title: string;
  image: string;
  price: string;
}

export default function ProductCard({ title, image, price }: IProps) {
  return (
    <Container>
      <Card>
        <CardMedia sx={{ height: 300 }} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            EGP {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small">
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
