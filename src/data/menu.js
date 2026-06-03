const imageBase = 'https://images.unsplash.com/photo-';

const imageUrl = (id, width = 760, quality = 74) =>
  `${imageBase}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;

const dishImage = (id) => ({
  imageSmall: imageUrl(id, 480, 70),
  image: imageUrl(id),
  imageLarge: imageUrl(id, 1200, 78),
});

export const heroDishes = [
  {
    id: 'fluffy-pancakes',
    name: 'Fluffy Pancakes',
    description: 'Cloud-soft stacks with maple butter and seasonal berries.',
    price: 390,
    ...dishImage('1528207776546-365bb710ee93'),
    time: 'morning',
    tag: 'veg',
  },
  {
    id: 'avocado-on-toast',
    name: 'Avocado on Toast',
    description: 'Smashed avocado, citrus, seeds, and crisp sourdough.',
    price: 490,
    ...dishImage('1525351484163-7529414344d8'),
    time: 'morning',
    tag: 'veg',
  },
  {
    id: 'power-protein-bowl',
    name: 'Power Protein Bowl',
    description: 'A bright, balanced bowl with greens, grains, and crunch.',
    price: 450,
    ...dishImage('1512621776951-a57141f2eefd'),
    time: 'afternoon',
    tag: 'veg',
  },
  {
    id: 'fresh-boccacini-caprice-open-sandwich',
    name: 'Fresh Boccacini Caprice Open Sandwich',
    description: 'Boccacini, tomatoes, basil, and olive oil on toast.',
    price: 350,
    ...dishImage('1509722747041-616f39b57569'),
    time: 'afternoon',
    tag: 'veg',
  },
  {
    id: 'bagel-cream-cheese',
    name: 'Bagel & Cream Cheese',
    description: 'Toasted bagel with cool cream cheese and herbs.',
    price: 320,
    ...dishImage('1567620905732-2d1ec7ab7445'),
    time: 'evening',
    tag: 'veg',
  },
  {
    id: 'classic-french-toast',
    name: 'Classic French Toast',
    description: 'Custardy toast, caramelized edges, and a sweet finish.',
    price: 390,
    ...dishImage('1484723091739-30a097e8f929'),
    time: 'evening',
    tag: 'non-veg',
  },
  {
    id: 'turkish-eggs-cilbir',
    name: 'Turkish Eggs Cilbir',
    description: 'Silky yogurt, spiced butter, soft eggs, and herbs.',
    price: 400,
    ...dishImage('1608039829572-78524f79c4c7'),
    time: 'night',
    tag: 'non-veg',
  },
  {
    id: 'parsi-akuri',
    name: 'Parsi Akuri',
    description: 'Creamy spiced eggs folded with herbs and toasted pav.',
    price: 400,
    ...dishImage('1525351484163-7529414344d8'),
    time: 'night',
    tag: 'non-veg',
  },
];

export const additionalMenuItems = [
  {
    id: 'eggs-benny',
    name: 'Eggs Benny',
    description: 'Poached eggs, hollandaise, and a warm breakfast base.',
    price: 435,
    ...dishImage('1608039829572-78524f79c4c7'),
    time: 'morning',
    tag: 'non-veg',
  },
];

export const menuItems = [...heroDishes, ...additionalMenuItems];
