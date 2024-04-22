"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../lib/features/Cart-Slice";
import { fetchProducts } from "../lib/features/Product-Slice";

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number; // Add the quantity property
}

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // Filter products based on selected category and search query
  const filteredProducts =
    Array.isArray(products) &&
    products.filter((product: ProductProps) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }
      if (
        searchQuery &&
        !product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

  return (
    <>
      <div>
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value), setSelectedCategory("All");
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }} // Set selected category to "All" and clear search query when clicked
            disabled={selectedCategory === "All"} // Disable the button if already selected
          >
            All
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setSelectedCategory("electronics");
              setSearchQuery("");
            }}
            disabled={selectedCategory === "electronics"}
          >
            Electronics
          </Button>{" "}
          <Button
            variant="contained"
            onClick={() => {
              setSelectedCategory("jewelery");
              setSearchQuery("");
            }}
            disabled={selectedCategory === "jewelery"}
          >
            Jewelery
          </Button>{" "}
          <Button
            variant="contained"
            onClick={() => {
              setSelectedCategory("men's clothing"), setSearchQuery("");
            }}
            disabled={selectedCategory === "men's clothing"}
          >
            Men's Clothing
          </Button>{" "}
          <Button
            variant="contained"
            onClick={() => {
              setSelectedCategory("women's clothing"), setSearchQuery("");
            }}
            disabled={selectedCategory === "women's clothing"}
          >
            Women's Clothing
          </Button>{" "}
        </Stack>
      </div>
      <Stack
        spacing={4}
        marginTop={10}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        {/*   TypeError: products.map is not a function */}
        {Array.isArray(filteredProducts) &&
          filteredProducts.map((product: ProductProps) => (
            <Card
              key={product.id}
              sx={{
                padding: 3,
                width: 400,
                height: 900,
                border: "1px solid gray",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="600"
                  width="100"
                  image={product.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    noWrap={true}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap={true}
                  >
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
                  <Link href={`/products/${product.id}`}>
                    <Button size="large" color="primary" variant="outlined">
                      Details
                    </Button>
                  </Link>
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
          ))}
      </Stack>
    </>
  );
}
