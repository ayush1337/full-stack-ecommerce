class Product {
  constructor(
    id,
    name,
    slug,
    image,
    banner,
    price,
    originCountry,
    description,
    category,
    rating,
    numReviews,
    countInStock,
    colors = [],
    sizes = []
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.image = image;
    this.banner = banner;
    this.price = price;
    this.originCountry = originCountry;
    this.description = description;
    this.category = category;
    this.rating = rating;
    this.numReviews = numReviews;
    this.countInStock = countInStock;
    this.colors = colors;
    this.sizes = sizes;
  }

  // Additional methods or validations can be added here
}

export default Product;
