// import bcrypt from 'bcryptjs';
// users: [
//     {
//       name: 'John',
//       email: 'admin@example.com',
//       password: bcrypt.hashSync('123456'),
//       isAdmin: true,
//     },
//     {
//       name: 'Jane',
//       email: 'user@example.com',
//       password: bcrypt.hashSync('123456'),
//       isAdmin: false,
//     },
//   ]
const data = {
  products: [
    {
      id: '0',
      name: 'FAUX LEATHER PUFFER JACKET',
      slug: 'free-shirt',
      category: 'Shirts',
      image:
        'https://static.zara.net/photos///2024/V/0/1/p/6688/259/800/2/w/750/6688259800_6_1_1.jpg?ts=1705479820209',
      price: 3450,
      brand: 'Nike',
      gender: 'woman',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description:
        'Coat made of a spun wool blend. Notched lapel collar and long sleeves. Flap pockets at the front and welt pockets on the chest. Matching lining. Button-up',
      isFeatured: true,
      banner: '/images/banner1.jpg',
      sizes: ['xs', 'l', 'm'],
      stock: {
        xs: 20,
        l: 15,
        m: 10,
      },
      origin: 'Morocco',
    },
    {
      id: '1',

      name: 'SKINNY FIT JEANS',
      slug: 'fit-shirt',
      category: 'Shirts',
      image:
        'https://static.zara.net/photos///2024/V/0/1/p/9878/082/080/2/w/1920/9878082080_1_1_1.jpg?ts=1706273338273',
      price: 7590,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      sizes: ['xs', 'l', 'm'],
      banner: '/images/banner2.jpg',
      stock: {
        xs: 20,
        l: 15,
        m: 10,
      },
    },
    {
      id: '2',

      name: 'FAUX LEATHER PUFFER JACKET',
      slug: 'free-shirt',
      category: 'Shirts',
      image:
        'https://static.zara.net/photos///2024/V/0/1/p/6688/259/800/2/w/750/6688259800_6_1_1.jpg?ts=1705479820209',
      price: 3450,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      sizes: ['xs', 'l', 'm'],
      banner: '/images/banner1.jpg',
      sizes: ['xs', 'l', 'm'],
      stock: {
        xs: 20,
        l: 15,
        m: 10,
      },
    },
    {
      id: '3',

      name: 'SKINNY FIT JEANS',
      slug: 'fit-shirt',
      category: 'Shirts',
      image:
        'https://static.zara.net/photos///2024/V/0/1/p/9878/082/080/2/w/1920/9878082080_1_1_1.jpg?ts=1706273338273',
      price: 7590,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      sizes: ['xs', 'l', 'm'],
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
      stock: {
        xs: 20,
        l: 15,
        m: 10,
      },
    },
    {
      id: '4',

      name: 'FAUX LEATHER PUFFER JACKET',
      slug: 'free-shirt',
      sizes: ['xs', 'l', 'm'],
      category: 'Shirts',
      image:
        'https://static.zara.net/photos///2024/V/0/1/p/6688/259/800/2/w/750/6688259800_6_1_1.jpg?ts=1705479820209',
      price: 3450,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
      sizes: ['xs', 'l', 'm'],
      isFeatured: true,
      banner: '/images/banner1.jpg',
      stock: {
        xs: 20,
        l: 15,
        m: 10,
      },
    },
    {
      id: '5',

      name: 'SKINNY FIT JEANS',
      slug: 'fit-shirt',
      category: 'Shirts',
      image:
        'https://static.zara.net/photos///2024/V/0/1/p/9878/082/080/2/w/1920/9878082080_1_1_1.jpg?ts=1706273338273',
      price: 7590,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      sizes: ['xs', 'l', 'm'],
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
      stock: {
        xs: 20,
        l: 15,
        m: 10,
      },
    },
    {
      id: '6',

      name: 'FAUX LEATHER PUFFER JACKET',
      slug: 'free-shirt',
      category: 'Shirts',
      image:
        'https://static.zara.net/photos///2024/V/0/1/p/6688/259/800/2/w/750/6688259800_6_1_1.jpg?ts=1705479820209',
      price: 3450,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
      sizes: ['xs', 'l', 'm'],
      isFeatured: true,
      banner: '/images/banner1.jpg',
      stock: {
        xs: 20,
        l: 15,
        m: 10,
      },
    },
    {
      id: '7',

      name: 'SKINNY FIT JEANS',
      slug: 'fit-shirt',
      category: 'Shirts',
      image:
        'https://static.zara.net/photos///2024/V/0/1/p/9878/082/080/2/w/1920/9878082080_1_1_1.jpg?ts=1706273338273',
      price: 7590,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      sizes: ['xs', 'l', 'm'],
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
      stock: {
        xs: 20,
        l: 15,
        m: 10,
      },
    },
  ],
};

export default data;
