export const EVENT_TYPES = [
  'Wedding',
  'Corporate Conference',
  'Birthday',
  'College Event',
];

export const BUDGET_CATEGORIES = [
  'Low Budget',
  'Medium Budget',
  'High Budget',
];

// Standardized food packages for all events 
const FOOD_PACKAGES = [
  {
    id: 1,
    name: 'Breakfast',
    items: [
      'Continental Breakfast',
      'Indian Breakfast',
      'Healthy Options',
    ],
    price: 250,
    image: 'https://media.istockphoto.com/id/182186809/photo/continental-breakfast.jpg?s=612x612&w=0&k=20&c=PyDcdvtGeSv-cPi-TruSCJlaytsjWn5rYJMmFIhOAG4=',
    description: 'A delightful breakfast spread to kickstart the day.',
  },
  {
    id: 2,
    name: 'Lunch',
    items: [
      'Soups',
      'Salads', 
      'Appetizers',
      'Main Course',
      'Desserts',
      'Beverages',
    ],
    price: 500,
    image: 'https://himalayarestaurant.com.au/wp-content/uploads/2023/10/img-catering-002.jpg',
    description: 'A lavish lunch buffet with a variety of options.',
  },
  {
    id: 3,
    name: 'Snacks',
    items: [
      'Finger Foods',
      'Spring Rolls',
      'Mini Sandwiches',
      'Samosas',
      'Pastries',
      'Drinks',
    ],
    price: 150,
    image: 'https://img.freepik.com/free-photo/buffet-table-with-snacks-from-burgers-cheeses-etc_140725-9343.jpg',
    description: 'Light snacks and refreshments for your guests.',
  },
  {
    id: 4,
    name: 'Dinner',
    items: [
      'Starters',
      'Main Course',
      'Desserts',
    ],
    price: 400,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgBjruV1EAbA-z5Fp1xXNKRT6DGJVaXqycUjPyK5p7DeeudXcKt7Z8hbwidZlAoO0MWgE&usqp=CAU',
    description: 'A delicious dinner spread with a variety of cuisines.',
  },
];

// Standardized employees for all events
const EMPLOYEES = [
  {
    id: 1,
    name: 'Sound Engineer',
    price: 1500,
    image: 'https://iscve.org.uk/wp-content/uploads/ISCVE-Core-Skills-Image-600x300-1.jpg',
    description: 'Ensure perfect audio for performances.',
  },
  {
    id: 2,
    name: 'Host',
    price: 1500,
    image: 'https://jballoondecorators.in/wp-content/uploads/2023/07/game-host.jpg',
    description: 'A lively host to keep the event engaging.',
  },
  {
    id: 3,
    name: 'Photographer',
    price: 2000,
    image: 'https://images.squarespace-cdn.com/content/v1/56457d9be4b0ed8bf45381d2/1449362076547-XBTIMNCN3FBAUL4T8XDS/shutterstock_150468989.jpg?format=2500w',
    description: 'Capture all the special moments.',
  },
  {
    id: 4,
    name: 'Event Coordinator',
    price: 2000,
    image: 'https://vajraevents.com/wp-content/uploads/2024/09/61731.jpg',
    description: 'Ensure everything runs smoothly.',
  },
];

// Mock data for events
export const EVENTS = [
  {
    id: 1,
    name: 'Luxury Wedding',
    type: 'Wedding',
    category: 'High Budget',
    price: 75000,
    image: 'https://www.jansatta.com/wp-content/uploads/2022/01/mouni-roy-wedding.jpg',
    description: 'A luxurious wedding package with premium venues, gourmet dining, and live entertainment.',
    subEvents: [
      { id: 1, name: 'Engagement', price: 4000, description: 'A romantic engagement ceremony to celebrate your commitment.', image: 'https://d397bfy4gvgcdm.cloudfront.net/180649-HL_0050.jpeg'},
      { id: 2, name: 'Haldi', price: 3500, description: 'A vibrant haldi ceremony with turmeric and blessings.', image: 'https://www.ptaufiqphotography.com/wp-content/uploads/2024/07/ptaufiq-indian-wedding-india-haldi2.jpg' },
      { id: 3, name: 'Mehendi', price: 5000, description: 'Traditional henna application with artists for a festive look.', image: 'https://images.shaadisaga.com/shaadisaga_production/photos/pictures/000/716/227/new_medium/1543238384_A_V90.jpg' },
      { id: 4, name: 'Sangeeth', price: 6000, description: 'Dance and music evening for family and friends.', image: 'https://weddingservices.co.in/wsimages/1672478136_sangeeeth%20image2.jpg' },
      { id: 5, name: 'Pre-Wedding Ceremony', price: 4500, description: 'A special start to the celebrations with traditional rituals.', image: 'https://asiancustoms.eu/wp-content/uploads/2018/07/indianwedding2.jpg' },
      { id: 6, name: 'Bharaat', price: 5000, description: 'A dancing ceremony with full on sound and energy .', image: 'https://shaadiwish.com/blog/wp-content/uploads/2022/03/baraat-ideas.jpg' },
      { id: 7, name: 'Reception', price: 7000, description: 'A grand reception to celebrate with all your loved ones.', image: 'https://i0.wp.com/blog.strokesphotography.com/wp-content/uploads/2022/01/rahul-rashmi-wedding-reception35-1.jpg?w=960&ssl=1' },
    ],
    venues: [
      {
        id: 1,
        name: 'Royal Palace',
        address: '123 Palace Road, Downtown',
        price: 15000,
        image: 'https://rameehotels.com/wp-content/uploads/2024/10/The-Oberoi-Udaivilas-Udaipur__2018_Chandni-the-al-fresco-dining-The-Oberoi-Udaivilas-Udaipur-1290x540.webp',
        description: 'A majestic palace with grand architecture.',
      },
      {
        id: 2,
        name: 'Convention center',
        address: '456 Convention St, City Center',
        price: 12000,
        image: 'https://vajraevents.com/wp-content/uploads/2024/06/IMG_6200-scaled.jpg',
        description: 'A spacious venue with modern amenities.',
      },
    ],
    foodPackages: FOOD_PACKAGES,
    employees: EMPLOYEES,
  },
  {
    id: 2,
    name: 'Corporate Summit',
    type: 'Corporate Conference',
    category: 'Medium Budget',
    price: 45000,
    image: 'https://framerusercontent.com/images/Iypyiuz6Pg0sLJPdXA4kdCeggA.jpg',
    description: 'A professional summit with modern facilities and networking opportunities.',
    subEvents: [
      { id: 1, name: 'Keynote Speech', price: 3000, description: 'Inspirational talk by industry leaders.', image: 'https://www.amitjadhav.com/blogs/images/What-Is-A-Keynote-Speaker-And-Why-Are-They-Important.jpg' },
      { id: 2, name: 'Networking Session', price: 1500, description: 'Connect with professionals in a relaxed setting.', image: 'https://static.zawya.com/view/acePublic/alias/contentid/NWIyMTI2NWMtMGRkZC00/0/businessnetworking-jpg.webp?f=3%3A2&q=0.75&w=3840' },
      { id: 3, name: 'Panel Discussion', price: 2000, description: 'Expert panel on industry trends and insights.', image: 'https://busyconf.com/blog/images/2013-07-03-panel.jpg' },
    ],
    venues: [
      {
        id: 1,
        name: 'Business Center',
        address: '789 Business Ave, City Center',
        price: 8000,
        image: 'https://plus.unsplash.com/premium_photo-1661634770590-d26305bab9bd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzaW5lc3MlMjBjZW50ZXJ8ZW58MHx8MHx8fDA%3D',
        description: 'A modern business facility with conference rooms.',
      },
      {
        id: 2,
        name: 'Convention Hall',
        address: '101 Convention St, Downtown',
        price: 9000,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJN5pqpSSBJOy-d5RNY4IMLXvyziwEd5uXDowsoHcgQ5led1wrHMi5sCMulmxhKpaMdzA&usqp=CAU',
        description: 'Spacious hall for large gatherings.',
      },
    ],
    foodPackages: FOOD_PACKAGES,
    employees: EMPLOYEES,
  },
  {
    id: 3,
    name: 'Grand Birthday Celebration',
    type: 'Birthday',
    category: 'Medium Budget',
    price: 30000,
    image: 'https://admin.balloonsunlimited.in/pub/media/mageplaza/blog/post/9/5/957.jpeg',
    description: 'A fun-filled birthday celebration with decorations, entertainment, and delicious food.',
    subEvents: [
      { id: 1, name: 'Cake Cutting', price: 2000, description: 'A special cake cutting ceremony with a custom cake.', image: 'https://alittlecake.com/wp-content/uploads/2022/04/Sculpted-Panda-Bear-Birthday-Cake-.jpg' },
      { id: 2, name: 'Magic Show', price: 1500, description: 'An entertaining magic show for kids and adults.', image: 'https://5.imimg.com/data5/SELLER/Default/2022/8/SN/NT/MC/17997538/manoj4-500x500.jpeg' },
      { id: 3, name: 'Games & Activities', price: 1000, description: 'Fun games and activities for all ages.', image: 'https://cdn.cdnparenting.com/articles/2018/03/179257061-H.webp' },
    ],
    venues: [
      {
        id: 1,
        name: 'Party Hall',
        address: '123 Celebration St, City Center',
        price: 5000,
        image: 'https://images.pexels.com/photos/16985118/pexels-photo-16985118/free-photo-of-tables-in-hall-in-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        description: 'A vibrant party hall with ample space.',
      },
      {
        id: 2,
        name: 'Rooftop Terrace',
        address: '654 Terrace St, Downtown',
        price: 6000,
        image: 'https://ik.imagekit.io/pu0hxo64d/uploads/gallery/tr:e-sharpen,w-450,h-250/terrace-party-at-pllatos-air-bar-216.jpeg',
        description: 'An open-air rooftop with stunning views.',
      },
    ],
    foodPackages: FOOD_PACKAGES,
    employees: EMPLOYEES,
  },
  {
    id: 4,
    name: 'College Fest',
    type: 'College Event',
    category: 'High Budget',
    price: 60000,
    image: 'https://newsmantra.in/wp-content/uploads/2023/12/Mood-Indigo-Fest-IIT-Bombay.png',
    description: 'A vibrant college fest with cultural performances, competitions, and food stalls.',
    subEvents: [
      { id: 1, name: 'Cultural Performance', price: 5000, description: 'Dance, music, and drama performances by students.', image: 'https://i.ytimg.com/vi/XOsxa7TDvDM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCarXu22IDjpY2735luc-tUp_k4cg' },
      { id: 2, name: 'Tech Competition', price: 3000, description: 'A coding and robotics competition for tech enthusiasts.', image: 'https://media.npr.org/assets/img/2023/10/04/mleong_scioly_20230831_wide-cd2b09a460bfd67ec9c1bb818dae776b0f24744b.jpg?s=1400&c=100&f=jpeg' },
      { id: 3, name: 'Fashion Show', price: 4000, description: 'A stylish fashion show showcasing student designs.', image: 'https://files.prokerala.com/news/photos/imgs/1024/mumbai-model-during-she-s-got-the-look-fashion-254584.jpg' },
    ],
    venues: [
      {
        id: 1,
        name: 'College Auditorium',
        address: 'In your college campus',
        price: 0,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGyY6pZQPSqrCxovFRwxY3WkPIMU-oSzgnNA&s',
        description: 'A spacious auditorium for large events.',
      },
      {
        id: 2,
        name: 'Open Ground',
        address: 'In your college campus',
        price: 0,
        image: 'https://vcetputtur.ac.in/assets/main/Ground2-1645606088.jpg',
        description: 'An open ground for outdoor activities.',
      },
    ],
    foodPackages: FOOD_PACKAGES,
    employees: EMPLOYEES,
  },
];

// Placeholder for API endpoints (to be updated with Node.js backend)
export const API_URLS = {
  events: '/api/events',
  auth: '/api/auth',
};