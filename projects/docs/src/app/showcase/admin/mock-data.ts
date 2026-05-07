// Mock data for the admin showcase — BD-flavored to fit the Kiln UI brand story.

export interface Order {
  id: string;
  customer: string;
  customerBn: string;
  area: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: number;
  [key: string]: unknown;
}

export interface Customer {
  id: string;
  name: string;
  nameBn: string;
  email: string;
  phone: string;
  area: string;
  joined: string;
  orders: number;
  spent: number;
  status: 'active' | 'invited' | 'paused';
  [key: string]: unknown;
}

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
}

export interface ActivityEntry {
  who: string;
  action: string;
  target: string;
  when: string;
  tone: 'info' | 'success' | 'warn' | 'danger';
}

export const MOCK_ORDERS: Order[] = [
  { id: 'SD-2814', customer: 'Aisha Rahman',     customerBn: 'আয়েশা রহমান',    area: 'Dhanmondi',  total: 4250, status: 'paid',      date: '2026-05-06', items: 6 },
  { id: 'SD-2813', customer: 'Bashir Hossain',   customerBn: 'বশির হোসেন',     area: 'Gulshan',    total: 1890, status: 'shipped',   date: '2026-05-06', items: 3 },
  { id: 'SD-2812', customer: 'Chowdhury K.',     customerBn: 'চৌধুরী খান',      area: 'Uttara',     total: 7320, status: 'delivered', date: '2026-05-05', items: 11 },
  { id: 'SD-2811', customer: 'Dipika Sen',       customerBn: 'দীপিকা সেন',     area: 'Mirpur',     total: 540,  status: 'pending',   date: '2026-05-05', items: 1 },
  { id: 'SD-2810', customer: 'Emon Kabir',       customerBn: 'ইমন কবির',       area: 'Banani',     total: 3105, status: 'paid',      date: '2026-05-05', items: 5 },
  { id: 'SD-2809', customer: 'Farhana Akter',    customerBn: 'ফারহানা আক্তার',  area: 'Mohammadpur', total: 2240, status: 'cancelled', date: '2026-05-04', items: 4 },
  { id: 'SD-2808', customer: 'Gourab Roy',       customerBn: 'গৌরব রায়',       area: 'Bashundhara', total: 1620, status: 'shipped',   date: '2026-05-04', items: 2 },
  { id: 'SD-2807', customer: 'Husna Begum',      customerBn: 'হুসনা বেগম',     area: 'Dhanmondi',  total: 5870, status: 'delivered', date: '2026-05-03', items: 8 },
  { id: 'SD-2806', customer: 'Iqbal Ahmed',      customerBn: 'ইকবাল আহমেদ',    area: 'Old Dhaka',  total: 920,  status: 'paid',      date: '2026-05-03', items: 2 },
  { id: 'SD-2805', customer: 'Jaheda Nasrin',    customerBn: 'জাহেদা নাসরিন',  area: 'Mohakhali',  total: 4780, status: 'delivered', date: '2026-05-02', items: 7 },
  { id: 'SD-2804', customer: 'Kamal Hossain',    customerBn: 'কামাল হোসেন',    area: 'Tejgaon',    total: 3340, status: 'shipped',   date: '2026-05-02', items: 5 },
  { id: 'SD-2803', customer: 'Lubna Islam',      customerBn: 'লুবনা ইসলাম',    area: 'Dhanmondi',  total: 1110, status: 'paid',      date: '2026-05-01', items: 2 },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'C-1041', name: 'Aisha Rahman',    nameBn: 'আয়েশা রহমান',    email: 'aisha@example.com',    phone: '+880 1711 234567', area: 'Dhanmondi',   joined: '2024-03-12', orders: 24, spent: 84300, status: 'active' },
  { id: 'C-1042', name: 'Bashir Hossain',  nameBn: 'বশির হোসেন',     email: 'bashir@example.com',   phone: '+880 1812 345678', area: 'Gulshan',     joined: '2024-06-04', orders: 11, spent: 32850, status: 'active' },
  { id: 'C-1043', name: 'Chowdhury K.',    nameBn: 'চৌধুরী খান',      email: 'ck@example.com',       phone: '+880 1913 456789', area: 'Uttara',      joined: '2025-01-21', orders: 8,  spent: 41200, status: 'active' },
  { id: 'C-1044', name: 'Dipika Sen',      nameBn: 'দীপিকা সেন',     email: 'dipika@example.com',   phone: '+880 1714 567890', area: 'Mirpur',      joined: '2025-08-09', orders: 2,  spent: 1740,  status: 'invited' },
  { id: 'C-1045', name: 'Emon Kabir',      nameBn: 'ইমন কবির',       email: 'emon@example.com',     phone: '+880 1815 678901', area: 'Banani',      joined: '2024-11-16', orders: 14, spent: 28100, status: 'active' },
  { id: 'C-1046', name: 'Farhana Akter',   nameBn: 'ফারহানা আক্তার',  email: 'farhana@example.com',  phone: '+880 1916 789012', area: 'Mohammadpur', joined: '2025-04-22', orders: 6,  spent: 12450, status: 'paused' },
  { id: 'C-1047', name: 'Gourab Roy',      nameBn: 'গৌরব রায়',       email: 'gourab@example.com',   phone: '+880 1717 890123', area: 'Bashundhara', joined: '2024-09-30', orders: 19, spent: 51800, status: 'active' },
  { id: 'C-1048', name: 'Husna Begum',     nameBn: 'হুসনা বেগম',     email: 'husna@example.com',    phone: '+880 1818 901234', area: 'Dhanmondi',   joined: '2025-02-14', orders: 22, spent: 67340, status: 'active' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'P-1', name: 'Khaas Atta — 5kg',   nameBn: 'খাস আটা — ৫কেজি',   category: 'Grains',    price: 540,  stock: 124, active: true  },
  { id: 'P-2', name: 'Hilsa Fish — 1kg',    nameBn: 'ইলিশ মাছ — ১কেজি',   category: 'Seafood',   price: 1850, stock: 18,  active: true  },
  { id: 'P-3', name: 'Dhaka Cheese',        nameBn: 'ঢাকা পনির',          category: 'Dairy',     price: 320,  stock: 0,   active: false },
  { id: 'P-4', name: 'Mustard Oil — 2L',    nameBn: 'সরিষার তেল — ২লিটার', category: 'Oils',     price: 410,  stock: 86,  active: true  },
  { id: 'P-5', name: 'Khejur Gur — 500g',   nameBn: 'খেজুর গুড় — ৫০০গ্রাম', category: 'Sweetener', price: 280, stock: 42, active: true  },
  { id: 'P-6', name: 'Basmati Rice — 5kg',  nameBn: 'বাসমতি চাল — ৫কেজি',  category: 'Grains',    price: 990,  stock: 67,  active: true  },
  { id: 'P-7', name: 'Mango — Himsagar 5kg',nameBn: 'হিমসাগর আম — ৫কেজি', category: 'Produce',   price: 1240, stock: 22,  active: true  },
  { id: 'P-8', name: 'Tea Leaves — 250g',   nameBn: 'চা পাতা — ২৫০গ্রাম',  category: 'Beverages', price: 195,  stock: 154, active: true  },
];

export const MOCK_ACTIVITY: ActivityEntry[] = [
  { who: 'Aisha R.',    action: 'placed order',    target: 'SD-2814',   when: '2 min ago',  tone: 'success' },
  { who: 'System',      action: 'flagged',         target: 'SD-2809',   when: '12 min ago', tone: 'danger'  },
  { who: 'Chowdhury K.',action: 'requested refund',target: 'SD-2701',   when: '38 min ago', tone: 'warn'    },
  { who: 'Bashir H.',   action: 'updated profile', target: 'C-1042',    when: '1 hr ago',   tone: 'info'    },
  { who: 'Emon K.',     action: 'placed order',    target: 'SD-2810',   when: '2 hr ago',   tone: 'success' },
  { who: 'Husna B.',    action: 'placed order',    target: 'SD-2807',   when: '3 hr ago',   tone: 'success' },
];

export const ORDER_STATUS_TONE = {
  pending:   { label: 'Pending',   tone: 'warn'    as const },
  paid:      { label: 'Paid',      tone: 'info'    as const },
  shipped:   { label: 'Shipped',   tone: 'brand'   as const },
  delivered: { label: 'Delivered', tone: 'success' as const },
  cancelled: { label: 'Cancelled', tone: 'danger'  as const },
};
