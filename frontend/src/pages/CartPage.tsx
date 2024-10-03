import { Container, Typography } from "@mui/material";
import BASE_URL from "../constants/baseUrl";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";

const CartPage = () => {
  const { token } = useAuth();
  const [cart, setCart] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to fetch user cart");
      }

      const data = await response.json();
      setCart(data);
    };

    fetchData();
  }, [token]);

  console.log(cart);

  return (
    <>
      <Container
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">My Cart</Typography>
      </Container>
    </>
  );
};

export default CartPage;
