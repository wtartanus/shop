DROP TABLE stocks;
DROP TABLE products;

CREATE TABLE products (
  id serial4 PRIMARY KEY,
  item VARCHAR,
  model VARCHAR,
  name VARCHAR, 
  weightInKg FLOAT,
  image VARCHAR, 
  description VARCHAR,
  price FLOAT,
  rrp FLOAT,
  productThumbail VARCHAR, 
  smallMultiImage1 VARCHAR, 
  smallMultiImage2 VARCHAR,
  smallMultiImage3 VARCHAR,
  smallMultiImage4 VARCHAR,
  bigMultiImage1 VARCHAR,
  bigMultiImage2 VARCHAR,
  bigMultiImage3 VARCHAR,
  xlImage VARCHAR,
  xlImage2 VARCHAR,
  xlImage3 VARCHAR,
  xlImage4  VARCHAR,
  xlImage5 VARCHAR,
  productSize VARCHAR,
  productPower VARCHAR,
  lubeType VARCHAR,
  condomSafe BOOLEAN,
  liquidVolume VARCHAR,
  noOfPills VARCHAR,
  fastening VARCHAR,
  washing VARCHAR, 
  insertable VARCHAR, 
  diameter VARCHAR,
  harnessCompatible BOOLEAN,
  originalCircumference VARCHAR,
  originalDiameter VARCHAR, 
  productWidth VARCHAR,
  coulur VARCHAR,
  flexability VARCHAR,
  controller VARCHAR,
  waterproof BOOLEAN,
  designedForWho VARCHAR,
  whatIsIt VARCHAR,
  whatIsFor VARCHAR,
  features VARCHAR,
  misc VARCHAR,
  materialName VARCHAR,
  brandName VARCHAR,
  styleName VARCHAR,
  productEAN VARCHAR,
  inCatName VARCHAR,
  productLength VARCHAR,
  motion VARCHAR,
  opening VARCHAR,
  categoryId int,
  categoryName VARCHAR
);

CREATE TABLE stocks (
  id SERIAL4 PRIMARY KEY,
  productId INT REFERENCES products(id),
  inStock BOOLEAN,
  size VARCHAR
)

CREATE TABLE reviews (
  id SERIAL4 PRIMARY KEY,
  productId INT REFERENCES products(id),
  name VARCHAR,
  text VARCHAR,
  ranking INT
)

CREATE TABLE categories (
  id SERIAL4 PRIMARY KEY,
  categoryId INT,
  name VARCHAR,
  image VARCHAR,
  parentId INT
)

CREATE TABLE discontinued (
  id SERIAL4 PRIMARY KEY,
  item VARCHAR,
  discontinued BOOLEAN,
  date TIMESTAMP
)

CREATE TABLE orders (
  id SERIAL4 PRIMARY KEY,
  referenceNumber VARCHAR,
  dateOrdered TIMESTAMP,
  totalCost FLOAT,
  totalPersonalCost FLOAT,
  ordered BOOLEAN,
  email VARCHAR,
  fullName VARCHAR,
  adres VARCHAR,
  city VARCHAR,
  postcode VARCHAR,
  deliveryType VARCHAR,
)

CREATE TABLE orderedItems (
  id SERIAL4 PRIMARY KEY,
  orderId INT REFERENCES orders(id),
  productId INT REFERENCES products(id),
  model VARCHAR,
  size VARCHAR
)
