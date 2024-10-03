import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import Grid from "@mui/material/Grid";
import BASE_URL from "../constants/baseUrl";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/product`);
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid item md={4}>
              <ProductCard {...p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
