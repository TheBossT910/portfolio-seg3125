export interface Part {
  id: number;
  name: string;
  make: string;
  category: string;
  price: number;
  inStock: boolean;
  specs: string;
}

export const partsData: Part[] = [
  { id: 1, name: "Rivian R1T Performance Suspension Kit", make: "Rivian", category: "Suspension", price: 1200, inStock: true, specs: "Adjustable ride height. Includes dampeners." },
  { id: 2, name: "Tesla Model 3 Track Brake Rotors", make: "Tesla", category: "Brakes", price: 450, inStock: true, specs: "Slotted design. High thermal capacity." },
  { id: 3, name: "Lucid Air Carbon Fiber Spoiler", make: "Lucid", category: "Aero", price: 850, inStock: false, specs: "Pre-preg carbon fiber. Matte finish." },
  { id: 4, name: "Supermileage EV CAN Bus Telemetry Scanner", make: "Universal", category: "Electronics", price: 299, inStock: true, specs: "Real-time CAN bus monitoring over Wi-Fi." },
  { id: 5, name: "Papaya Orange Racing Gloves", make: "Universal", category: "Apparel", price: 85, inStock: true, specs: "FIA homologated. Nomex construction." },
  { id: 6, name: "VxWorks Embedded Flashing Cable", make: "Universal", category: "Electronics", price: 45, inStock: true, specs: "Serial to USB for embedded firmware updates." }
];