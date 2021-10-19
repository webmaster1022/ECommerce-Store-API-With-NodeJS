# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 
## Database schema

##### General overview
                  List of relations
 Schema |       Name       | Type  |      Owner       
--------+------------------+-------+------------------
 public | migrations       | table | storefront_admin
 public | migrations_state | table | storefront_admin
 public | order_products   | table | storefront_admin
 public | orders           | table | storefront_admin
 public | products         | table | storefront_admin
 public | users            | table | storefront_admin
(6 rows)

##### Products table Schema
                                    Table "public.products"
  Column   |          Type          | Collation | Nullable |               Default
-----------+------------------------+-----------+----------+--------------------------------------
 id        | integer                |           | not null | nextval('products_id_seq'::regclass)
 name      | character varying(100) |           |          |
 price     | integer                |           |          |
 cathegory | character varying(100) |           |          |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

##### Users table Schema
                                            Table "public.users"
     Column      |          Type          | Collation | Nullable |              Default
-----------------+------------------------+-----------+----------+-----------------------------------
 id              | integer                |           | not null | nextval('users_id_seq'::regclass)
 first_name      | character varying(255) |           |          |
 last_name       | character varying(255) |           |          |
 username        | character varying(100) |           |          |
 password_digest | character varying(255) |           |          |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

##### Orders table Schema
                                    Table "public.orders"
 Column  |         Type          | Collation | Nullable |              Default
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 status  | character varying(64) |           |          |
 user_id | bigint                |           |          |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) 

##### Order_products table Schema

                              Table "public.order_products"
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           |          |
 order_id   | bigint  |           |          |
 product_id | bigint  |           |          |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)


## API Endpoints
#### Products
- Index (GET:'/products')
- Show (GET:'/products/:id')
- Create [token required] (POST:'/products')
- Delete [token required] (DELETE:'/products/:id')
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] (GET:'/users')
- Show [token required] (GET :'/users/:id')
- Create [token required] (POST:'/users')
- [EXTRA] Authenticate (POST:'/users/authenticate') 
- [EXTRA] Delete [token required] (DELETE:'/users/:id') 


#### Orders
- Current Order by user (args: user id)[token required] (GET:'/orders/:id/users')
- [EXTRA] Add Product (args: product id)[token required] (POST:'/orders/:id/products')
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

