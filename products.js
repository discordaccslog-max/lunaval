// PRODUCT DATA - shared across all pages
window.LUNA_PRODUCTS = [
  {
    handle: 'travis-scott-account-50-150-skins',
    title: 'TRAVIS SCOTT ACCOUNT',
    subtitle: '50-150 SKINS',
    price: 16.99,
    image: 'https://cdn.shopify.com/s/files/1/0720/3019/1694/files/background.webp?v=1770915272',
    features: ['INSTANT DELIVERY', 'TRAVIS SCOTT GUARANTEED', '50-150 SKINS', '24/7 SUPPORT', '30 DAY WARRANTY']
  },
  {
    handle: 'wildcat-account-50-150-skins',
    title: 'WILDCAT ACCOUNT',
    subtitle: '50-150 SKINS',
    price: 39.99,
    image: 'https://cdn.shopify.com/s/files/1/0720/3019/1694/files/bg.webp?v=1770915239',
    features: ['INSTANT DELIVERY', 'WILDCAT GUARANTEED', '50-150 SKINS', '24/7 SUPPORT', '30 DAY WARRANTY']
  },
  {
    handle: 'purple-skull-trooper-account-50-150-skins',
    title: 'PURPLE SKULL TROOPER ACCOUNT',
    subtitle: '50-150 SKINS',
    price: 58.99,
    image: 'https://cdn.shopify.com/s/files/1/0720/3019/1694/files/purple-skull-trooper-6mtbkb8f9ixuyf0g.webp?v=1770915210',
    features: ['INSTANT DELIVERY', 'PURPLE SKULL TROOPER GUARANTEED', '50-150 SKINS', '24/7 SUPPORT', '30 DAY WARRANTY']
  },
  {
    handle: 'pink-ghoul-trooper-account-50-150-skins',
    title: 'PINK GHOUL TROOPER ACCOUNT',
    subtitle: '50-150 SKINS',
    price: 58.99,
    image: 'https://cdn.shopify.com/s/files/1/0720/3019/1694/files/fortnite-ghoul-trooper-style-pink.webp?v=1770915156',
    features: ['INSTANT DELIVERY', 'PINK GHOUL TROOPER GUARANTEED', '50-150 SKINS', '24/7 SUPPORT', '30 DAY WARRANTY']
  },
  {
    handle: 'wonder-account-150-300-skins-limited-edition',
    title: 'WONDER ACCOUNT',
    subtitle: '150-300 SKINS LIMITED EDITION',
    price: 38.99,
    image: 'https://cdn.shopify.com/s/files/1/0720/3019/1694/files/latest.webp?v=1770915091',
    transparent: true,
    features: ['INSTANT DELIVERY', 'WONDER GUARANTEED', '150-300 SKINS', '24/7 SUPPORT', '30 DAY WARRANTY']
  },
  {
    handle: 'ikonik-account-50-150-skins',
    title: 'IKONIK ACCOUNT',
    subtitle: '50-150 SKINS',
    price: 38.99,
    image: 'https://cdn.shopify.com/s/files/1/0720/3019/1694/files/transparent_25bdde25-e965-4925-beb5-29228ff3c471.webp?v=1770914943',
    transparent: true,
    features: ['INSTANT DELIVERY', 'IKONIK GUARANTEED', '50-150 SKINS', '24/7 SUPPORT', '30 DAY WARRANTY']
  },
  {
    handle: 'black-knight-account-50-150-skins',
    title: 'BLACK KNIGHT ACCOUNT',
    subtitle: '50-150 SKINS',
    price: 52.99,
    image: 'https://cdn.shopify.com/s/files/1/0720/3019/1694/files/fortnite-outfit-black-knight.webp?v=1770822222',
    features: ['INSTANT DELIVERY', 'BLACK KNIGHT GUARANTEED', '50-150 SKINS', '24/7 SUPPORT', '30 DAY WARRANTY']
  },
  {
    handle: 'honor-guard-account-50-150-skins',
    title: 'HONOR GUARD ACCOUNT',
    subtitle: '50-150 SKINS',
    price: 37.99,
    image: 'https://cdn.shopify.com/s/files/1/0720/3019/1694/files/New_Honor_Guard.webp?v=1770822182',
    features: ['INSTANT DELIVERY', 'HONOR GUARD GUARANTEED', '50-150 SKINS', '24/7 SUPPORT', '30 DAY WARRANTY']
  }
];

// Find product by handle
window.findProduct = function(handle) {
  return window.LUNA_PRODUCTS.find(function(p) { return p.handle === handle; });
};

// Format price
window.formatPrice = function(price) {
  return '$' + price.toFixed(2) + ' USD';
};
