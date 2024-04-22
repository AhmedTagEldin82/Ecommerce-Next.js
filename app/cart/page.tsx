"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";

import {
  clear,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../lib/features/Cart-Slice";

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

const cart = () => {
  const cart = useSelector((state: any) => state.cart);

  const dispatch = useDispatch();
  const cartArray = Object.values(cart); // Convert the cart object to an array

  const totalPrice: any = cartArray.reduce((acc: any, product: any) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);
  const formattedTotalPrice = totalPrice.toFixed(2);

  return (
    <Box>
      <Box margin="5" display="flex" justifyContent="space-between">
        <Button
          size="large"
          sx={{ marginLeft: 5 }}
          variant="outlined"
          color="error"
          onClick={() => dispatch(clear(cart))}
        >
          Clear Cart
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: 20 }} align="center">
                Id
              </TableCell>
              <TableCell style={{ fontSize: 20 }} align="center">
                Title
              </TableCell>
              <TableCell style={{ fontSize: 20 }} align="center">
                Image
              </TableCell>
              <TableCell style={{ fontSize: 20 }} align="center">
                Quantity
              </TableCell>
              <TableCell style={{ fontSize: 20 }} align="center">
                Price
              </TableCell>
              <TableCell style={{ fontSize: 20 }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(cart) &&
              cart.map((product: ProductProps) => (
                <TableRow
                  key={product.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {product.id}
                  </TableCell>
                  <TableCell align="center">{product.title}</TableCell>
                  <TableCell align="center">
                    <img
                      src={product.image}
                      alt="image"
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <Stack spacing={2} direction="row">
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => dispatch(decrementQuantity(product))}
                    >
                      -
                    </Button>

                    <TableCell align="center">{product.quantity} </TableCell>
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => dispatch(incrementQuantity(product))}
                    >
                      +
                    </Button>
                  </Stack>

                  <TableCell align="center">{product.price} $</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => dispatch(removeFromCart(product))}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          border: "solid 1px gray",
          borderRadius: 2,
          margin: 5,
          width: 450,
          padding: 1,
        }}
      >
        <h3> Total Price: {formattedTotalPrice} $</h3>
      </Box>
    </Box>
  );
};

export default cart;
