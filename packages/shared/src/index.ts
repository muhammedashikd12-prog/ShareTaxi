export type RideMode = 'intercity' | 'on-demand' | 'commute';

export type City = {
  id: string;
  name: string;
  state: string;
  region: 'Kerala' | 'Tamil Nadu' | 'Karnataka';
};

export type Driver = {
  id: string;
  name: string;
  rating: number;
  trips: number;
  vehicle: string;
  seats: number;
  etaMinutes: number;
  verified: boolean;
  location: string;
};

export type TripCard = {
  id: string;
  title: string;
  route: string;
  departure: string;
  arrival: string;
  seatsLeft: number;
  price: number;
  rating: number;
  driver: string;
  mode: RideMode;
};

export const cities: City[] = [
  { id: 'kochi', name: 'Kochi', state: 'Kerala', region: 'Kerala' },
  { id: 'trivandrum', name: 'Thiruvananthapuram', state: 'Kerala', region: 'Kerala' },
  { id: 'kozhikode', name: 'Kozhikode', state: 'Kerala', region: 'Kerala' },
  { id: 'bangalore', name: 'Bengaluru', state: 'Karnataka', region: 'Karnataka' }
];

export const tripCards: TripCard[] = [
  {
    id: 'trip-1',
    title: 'Kochi to Bengaluru',
    route: 'Kochi → Bengaluru',
    departure: 'Today, 7:30 AM',
    arrival: 'Today, 2:10 PM',
    seatsLeft: 3,
    price: 1299,
    rating: 4.8,
    driver: 'Anoop K.',
    mode: 'intercity'
  },
  {
    id: 'trip-2',
    title: 'Trivandrum to Kochi',
    route: 'Trivandrum → Kochi',
    departure: 'Today, 8:15 AM',
    arrival: 'Today, 1:45 PM',
    seatsLeft: 2,
    price: 899,
    rating: 4.7,
    driver: 'Shibin M.',
    mode: 'intercity'
  },
  {
    id: 'trip-3',
    title: 'Kochi office commute',
    route: 'Infopark → MG Road',
    departure: 'Mon to Fri, 8:40 AM',
    arrival: '9:10 AM',
    seatsLeft: 4,
    price: 250,
    rating: 4.9,
    driver: 'Rasheed N.',
    mode: 'commute'
  },
  {
    id: 'trip-4',
    title: 'Kozhikode city ride',
    route: 'Calicut → Beach Road',
    departure: 'Right now',
    arrival: '12 min away',
    seatsLeft: 1,
    price: 180,
    rating: 4.6,
    driver: 'Jithin P.',
    mode: 'on-demand'
  }
];

export const drivers: Driver[] = [
  {
    id: 'driver-1',
    name: 'Anoop K.',
    rating: 4.8,
    trips: 882,
    vehicle: 'Hyundai Creta',
    seats: 3,
    etaMinutes: 9,
    verified: true,
    location: 'Kakkanad'
  },
  {
    id: 'driver-2',
    name: 'Shibin M.',
    rating: 4.7,
    trips: 610,
    vehicle: 'Maruti Swift',
    seats: 4,
    etaMinutes: 12,
    verified: true,
    location: 'Pattom'
  },
  {
    id: 'driver-3',
    name: 'Rasheed N.',
    rating: 4.9,
    trips: 1430,
    vehicle: 'Mahindra XUV',
    seats: 4,
    etaMinutes: 6,
    verified: true,
    location: 'Kadavanthra'
  }
];

export const fareBreakdown = [
  { label: 'Base fare', value: '₹850' },
  { label: 'Seat booking', value: '₹120' },
  { label: 'Platform fee', value: '₹49' },
  { label: 'Taxes', value: '₹91' }
];
