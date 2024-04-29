# E-Commerce API Documentation

This API provides endpoints to manage users, products, orders, and reviews for an e-commerce platform.

## Authentication

- **Login User**: `POST /auth/login`
- **Logout User**: `GET /auth/logout`
- **Register User**: `POST /auth/register`

## Orders

- **Create Order**: `POST /orders`
- **Get All Orders**: `GET /orders`
- **Get Single Order**: `GET /orders/:id`
- **Show Current User Orders**: `GET /orders/my-orders`
- **Update Order**: `PATCH /orders/:id`

## Products

- **Create Product**: `POST /products`
- **Delete Product**: `DELETE /products/:id`
- **Get All Products**: `GET /products`
- **Get Single Product**: `GET /products/:id`
- **Get Single Product Reviews**: `GET /products/:id/reviews`
- **Update Product**: `PATCH /products/:id`
- **Upload Image**: `POST /products/upload-image`

## Reviews

- **Create Review**: `POST /reviews`
- **Delete Review**: `DELETE /reviews/:id`
- **Get All Reviews**: `GET /reviews`
- **Get Single Review**: `GET /reviews/:id`
- **Update Review**: `PATCH /reviews/:id`

## Users

- **Get All Users**: `GET /users`
- **Get Single User**: `GET /users/:id`
- **Show Current User**: `GET /users/me`
- **Update User**: `PATCH /users/update-user`
- **Update User Password**: `PATCH /users/update-user-password`

---

**Author**: Burak Bilgili  
**E-Commerce API**  
© 2024
