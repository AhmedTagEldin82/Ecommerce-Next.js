"use client";
import { addToCart } from "@/app/lib/features/Cart-Slice";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export default function Productdetails({ params }: { params: { id: number } }) {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h5">Error: Failed to fetch product</Typography>;
  }

  return (
    <>
      <Box>
        {product ? (
          <Card
            sx={{
              padding: 3,
              width: 400,
              maxHeight: 1000,
              border: "1px solid gray",
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                width="100"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h5" color="text.secondary" marginTop={5}>
                  $ {product.price}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Box
                marginTop={5}
                display="flex"
                justifyContent="space-between"
                gap={9}
              >
                <Button
                  size="large"
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    dispatch(addToCart(product));
                  }}
                >
                  Add To Cart
                </Button>
              </Box>
            </CardActions>
          </Card>
        ) : (
          <Typography variant="h5">Product not found</Typography>
        )}
      </Box>
    </>
  );
}
