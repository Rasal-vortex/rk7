export const initialServices = [
  { id:'construction', title:'Construction', eyebrow:'Built to last', description:'Thoughtful planning, skilled craftsmanship and dependable delivery for the places that matter.', image:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=85', content:'From the first foundation to the finishing details, our team brings care, clarity and quality to every build.', published:true },
  { id:'events', title:'Event Management', eyebrow:'Gather beautifully', description:'Well-planned celebrations and events, brought to life with care from first sketch to final moment.', image:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85', content:'We manage the moving pieces so you can be present for the moments that matter.', published:true },
  { id:'tools', title:'Rent Tools', eyebrow:'The right tool, right on time', description:'Reliable equipment for your next project, with straightforward rental enquiries and local support.', image:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=85', content:'Get the equipment you need to move your work forward. Ask our team about the right tool for your job.', published:true }
];
export const initialTools = [
  {id:1,name:'Concrete Mixer',category:'Concrete',description:'Reliable site mixer for consistent small and mid-size pours.',price:'From ₹900 / day',image:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',published:true},
  {id:2,name:'Rotary Hammer Drill',category:'Power tools',description:'Heavy-duty drilling for masonry, concrete and renovation work.',price:'From ₹450 / day',image:'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80',published:true},
  {id:3,name:'Portable Generator',category:'Site equipment',description:'Dependable portable power for work sites and outdoor events.',price:'From ₹1,200 / day',image:'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80',published:true},
  {id:4,name:'Angle Grinder',category:'Power tools',description:'Versatile cutting and finishing for metal, stone and concrete.',price:'From ₹300 / day',image:'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=900&q=80',published:true},
  {id:5,name:'Scaffolding Set',category:'Access',description:'Stable modular access equipment for elevated work areas.',price:'Ask for a quote',image:'https://images.unsplash.com/photo-1590644365607-1c5a93bcab5e?auto=format&fit=crop&w=900&q=80',published:true},
  {id:6,name:'Plate Compactor',category:'Site equipment',description:'Compact and prepare soil and aggregate with confidence.',price:'From ₹1,000 / day',image:'https://images.unsplash.com/photo-1513467655676-561b7d489a88?auto=format&fit=crop&w=900&q=80',published:true}
];
export const initialGallery = [
  {id:1,title:'A home shaped around light',category:'Construction',description:'Residential construction, Malappuram',image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',published:true},
  {id:2,title:'A day worth celebrating',category:'Events',description:'Wedding celebration, Kerala',image:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',published:true},
  {id:3,title:'Craft in every detail',category:'Construction',description:'Contemporary residential project',image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',published:true},
  {id:4,title:'An evening together',category:'Events',description:'Outdoor reception styling',image:'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85',published:true},
  {id:5,title:'Ready for the next job',category:'Tools',description:'Equipment for projects of every scale',image:'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=1200&q=85',published:true},
  {id:6,title:'Spaces with purpose',category:'Construction',description:'Modern build with natural materials',image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',published:true}
];
export const initialReviews = [
  {id:1,name:'Fathima K.',service:'Construction',rating:5,review:'The team kept us informed at every step and delivered a home we are proud of.',date:'2026-08-16',status:'Approved'},
  {id:2,name:'Shameer A.',service:'Event Management',rating:5,review:'Every detail felt considered. We could enjoy the day knowing the team had it covered.',date:'2026-09-03',status:'Approved'},
  {id:3,name:'Nihal P.',service:'Rent Tools',rating:5,review:'Straightforward to enquire and the equipment was ready when we needed it.',date:'2026-09-21',status:'Approved'}
];
export const initialEnquiries = [
  {id:1,name:'Arun Prakash',phone:'+91 98765 43210',email:'arun@example.com',service:'Construction',message:'Looking for an estimate for a 2,000 sq ft family home in Manjeri.',date:'2026-11-10',status:'New'},
  {id:2,name:'Nisha Rahman',phone:'+91 98470 11223',email:'nisha@example.com',service:'Event Management',message:'Planning a reception for around 250 guests in February.',date:'2026-11-09',status:'Contacted'},
  {id:3,name:'Muneer K.',phone:'+91 94470 32109',email:'',service:'Rent Tools',message:'Need a concrete mixer for a weekend project.',date:'2026-11-07',status:'In Progress'}
];

const keys={services:initialServices,tools:initialTools,gallery:initialGallery,reviews:initialReviews,enquiries:initialEnquiries};
export function readData(key){try{const saved=localStorage.getItem(`rk7_${key}`);return saved?JSON.parse(saved):keys[key]}catch{return keys[key]}}
export function writeData(key,value){localStorage.setItem(`rk7_${key}`,JSON.stringify(value));return value}
export const ADMIN_EMAIL='admin@rk7.in';
export const ADMIN_PASSWORD='rk7demo';
