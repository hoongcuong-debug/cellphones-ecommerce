http://localhost:3004/all show full products

1/ lấy code .sql trong folder database copy mysql
2/ cấu .env
3/ yarn install
4/ yarn start

/////////////////////////////////
API Products
show all products: [GET] http://localhost:3004/products
show one product by slug: [GET] http://localhost:3004/products/:slug => vd:http://localhost:3004/products/iphone-15-pro-max
add product: [POST] http://localhost:3004/products/add
update product: [PUT] http://localhost:3004/products/:idProduct
delete product: [DELETE] http://localhost:3004/products/:id

API Brands
show all brands: [GET] http://localhost:3004/brands
add brand: [POST] http://localhost:3004/brands/add
update brand: [PUT] http://localhost:3004/brands/:id
delete brand: [DELETE] http://localhost:3004/brands/:id

API Categories
show all Categories: [GET] http://localhost:3004/categories
add Category: [POST] http://localhost:3004/Categories/add
update Category: [PUT] http://localhost:3004/Categories/:id
delete Category: [DELETE] http://localhost:3004/Categories/:id

API Specs
show all Specs: [GET] http://localhost:3004/specs
add Spec: [POST] http://localhost:3004/Specs/add
update Spec: [PUT] http://localhost:3004/Specs/:id
