export type Product = {
  id: string
  name: string
  origin: string
  roast: 'Light' | 'Medium' | 'Dark'
  notes: string[]
  price: number
  weight: string
  image: string
  short: string
  description: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'huila-sunrise',
    name: 'Huila Sunrise',
    origin: 'Colombia',
    roast: 'Light',
    notes: ['Red apple', 'Caramel', 'Orange zest'],
    price: 14.5,
    weight: '250g',
    image: 'images/coffee-1.svg',
    short: 'Bright and juicy, with a sweet caramel finish.',
    description:
      'Grown by a cooperative of small family farms on the steep slopes of the Huila department in southern Colombia, this washed coffee is picked at peak ripeness between 1,600 and 1,900 metres above sea level, fermented for around thirty-six hours in tiled tanks, then dried slowly on raised beds under shade cloth to protect the delicate fruit acidity that makes this lot so distinctive, and we roast it light to preserve that brightness, so in the cup you can expect red apple and orange zest up front, a round caramel sweetness in the middle and a clean, lingering finish that works beautifully as a pour-over or a light espresso, although we would recommend letting the beans rest for at least seven days after the roast date printed on the bag before brewing, since very fresh beans release a lot of carbon dioxide which can make extraction uneven and mute some of the fruit notes we worked hard to bring out.',
  },
  {
    id: 'yirga-bloom',
    name: 'Yirga Bloom',
    origin: 'Ethiopia',
    roast: 'Light',
    notes: ['Jasmine', 'Bergamot', 'Peach'],
    price: 16,
    weight: '250g',
    image: 'images/coffee-2.svg',
    short: 'Floral and tea-like. A favourite for filter.',
    description:
      'Heirloom varieties from Yirgacheffe, washed and dried on raised beds. Delicate jasmine aromatics, bergamot and stone fruit sweetness. Best as a filter coffee.',
  },
  {
    id: 'cerrado-classic',
    name: 'Cerrado Classic',
    origin: 'Brazil',
    roast: 'Medium',
    notes: ['Milk chocolate', 'Hazelnut', 'Brown sugar'],
    price: 12,
    weight: '250g',
    image: 'images/coffee-3.svg',
    short: 'Smooth, nutty and chocolatey. Great with milk.',
    description:
      'A natural-process coffee from the Cerrado Mineiro region. Low acidity, heavy body and a sweetness that holds up well in milk drinks.',
  },
  {
    id: 'antigua-ember',
    name: 'Antigua Ember',
    origin: 'Guatemala',
    roast: 'Medium',
    notes: ['Cocoa', 'Plum', 'Spice'],
    price: 13.5,
    weight: '250g',
    image: 'images/coffee-4.svg',
    short: 'Balanced and rich with a gentle spice.',
    description:
      'Grown in volcanic soil around Antigua. A balanced cup with cocoa, ripe plum and a warm spice finish.',
  },
  {
    id: 'sumatra-night',
    name: 'Sumatra Night',
    origin: 'Indonesia',
    roast: 'Dark',
    notes: ['Dark chocolate', 'Cedar', 'Molasses'],
    price: 13,
    weight: '250g',
    image: 'images/coffee-5.svg',
    short: 'Bold, earthy and full-bodied.',
    description:
      'Wet-hulled coffee from North Sumatra. Earthy, syrupy and intense. Built for French press and dark espresso lovers.',
  },
  {
    id: 'kenya-ruby',
    name: 'Kenya Ruby',
    origin: 'Kenya',
    roast: 'Light',
    notes: ['Blackcurrant', 'Grapefruit', 'Cane sugar'],
    price: 17.5,
    weight: '250g',
    image: 'images/coffee-6.svg',
    short: 'Vibrant and fruity with a sparkling acidity.',
    description:
      'SL28 and SL34 varieties from Nyeri. Intense blackcurrant, grapefruit and a sparkling, juicy acidity.',
  },
  {
    id: 'house-espresso',
    name: 'House Espresso',
    origin: 'Blend',
    roast: 'Medium',
    notes: ['Chocolate', 'Toffee', 'Cherry'],
    price: 11.5,
    weight: '250g',
    image: 'images/coffee-7.svg',
    short: 'Our everyday espresso blend.',
    description:
      'A blend of Brazil and Colombia, roasted for espresso. Sweet, forgiving and great on its own or with milk.',
  },
  {
    id: 'decaf-valle',
    name: 'Decaf Valle',
    origin: 'Colombia',
    roast: 'Medium',
    notes: ['Panela', 'Red fruit', 'Cocoa'],
    price: 13,
    weight: '250g',
    image: 'images/coffee-8.svg',
    short: 'All the flavour, none of the jitters.',
    description:
      'Sugarcane-process decaf from Valle del Cauca. Sweet and fruity, with no chemical aftertaste.',
  },
]

export const SHIPPING_FEE = 6.9
