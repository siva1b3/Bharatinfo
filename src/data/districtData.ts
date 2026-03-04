export interface Constituency {
  name: string;
  type: "General" | "SC" | "ST";
  currentMLA: string;
  party: string;
}

export interface DistrictInfo {
  state: string;
  district: string;
  population: string;
  area: string;
  literacy: string;
  headquarters: string;
  constituencies: Constituency[];
}

// Sample data for some districts across India
const districtDatabase: Record<string, DistrictInfo> = {
  // Maharashtra
  "Mumbai, Maharashtra": {
    state: "Maharashtra",
    district: "Mumbai",
    population: "1,24,42,373",
    area: "603 km²",
    literacy: "89.73%",
    headquarters: "Mumbai",
    constituencies: [
      { name: "Colaba", type: "General", currentMLA: "Rahul Narwekar", party: "BJP" },
      { name: "Mumbadevi", type: "General", currentMLA: "Amin Patel", party: "INC" },
      { name: "Worli", type: "General", currentMLA: "Aaditya Thackeray", party: "SHS(UBT)" },
      { name: "Byculla", type: "General", currentMLA: "Manoj Jamsutkar", party: "SHS" },
      { name: "Dharavi", type: "SC", currentMLA: "Varsha Gaikwad", party: "INC" },
      { name: "Andheri East", type: "General", currentMLA: "Rutuja Latke", party: "SHS(UBT)" },
    ],
  },
  "Pune, Maharashtra": {
    state: "Maharashtra",
    district: "Pune",
    population: "94,29,408",
    area: "15,643 km²",
    literacy: "87.19%",
    headquarters: "Pune",
    constituencies: [
      { name: "Kasba Peth", type: "General", currentMLA: "Ravindra Dhangekar", party: "INC" },
      { name: "Shivajinagar", type: "General", currentMLA: "Siddharth Shirole", party: "BJP" },
      { name: "Kothrud", type: "General", currentMLA: "Chandrakant Patil", party: "BJP" },
      { name: "Hadapsar", type: "General", currentMLA: "Chetan Tupe", party: "NCP" },
      { name: "Pune Cantonment", type: "General", currentMLA: "Sunil Kamble", party: "BJP" },
    ],
  },
  "Nagpur, Maharashtra": {
    state: "Maharashtra",
    district: "Nagpur",
    population: "46,53,570",
    area: "9,892 km²",
    literacy: "89.53%",
    headquarters: "Nagpur",
    constituencies: [
      { name: "Nagpur South West", type: "General", currentMLA: "Devendra Fadnavis", party: "BJP" },
      { name: "Nagpur North", type: "General", currentMLA: "Milind Mane", party: "BJP" },
      { name: "Nagpur East", type: "General", currentMLA: "Krishna Khopde", party: "BJP" },
      { name: "Nagpur Central", type: "General", currentMLA: "Vikas Thakre", party: "INC" },
    ],
  },
  // Tamil Nadu
  "Chennai, Tamil Nadu": {
    state: "Tamil Nadu",
    district: "Chennai",
    population: "46,81,087",
    area: "426 km²",
    literacy: "90.33%",
    headquarters: "Chennai",
    constituencies: [
      { name: "Harbour", type: "General", currentMLA: "K.P.P. Samy", party: "DMK" },
      { name: "Chepauk-Thiruvallikeni", type: "General", currentMLA: "Udhayanidhi Stalin", party: "DMK" },
      { name: "Thousand Lights", type: "General", currentMLA: "Dr. Ezhilan Naganathan", party: "DMK" },
      { name: "Anna Nagar", type: "General", currentMLA: "Palanivel Rajan", party: "DMK" },
      { name: "Royapuram", type: "SC", currentMLA: "I. Paranthamen", party: "DMK" },
    ],
  },
  // Karnataka
  "Bengaluru Urban, Karnataka": {
    state: "Karnataka",
    district: "Bengaluru Urban",
    population: "96,21,551",
    area: "2,190 km²",
    literacy: "87.67%",
    headquarters: "Bengaluru",
    constituencies: [
      { name: "Jayanagar", type: "General", currentMLA: "Sowmya Reddy", party: "INC" },
      { name: "Basavanagudi", type: "General", currentMLA: "Ravi Subramanya", party: "BJP" },
      { name: "Padmanabhanagar", type: "General", currentMLA: "R. Ashoka", party: "BJP" },
      { name: "Shivajinagar", type: "General", currentMLA: "Rizwan Arshad", party: "INC" },
      { name: "Mahadevapura", type: "General", currentMLA: "Aravind Limbavali", party: "BJP" },
    ],
  },
  // Uttar Pradesh
  "Lucknow, Uttar Pradesh": {
    state: "Uttar Pradesh",
    district: "Lucknow",
    population: "45,89,838",
    area: "2,528 km²",
    literacy: "77.29%",
    headquarters: "Lucknow",
    constituencies: [
      { name: "Lucknow West", type: "General", currentMLA: "Rajesh Srivastava", party: "BJP" },
      { name: "Lucknow North", type: "General", currentMLA: "Neeraj Bora", party: "BJP" },
      { name: "Lucknow East", type: "General", currentMLA: "Ashutosh Tandon", party: "BJP" },
      { name: "Lucknow Central", type: "General", currentMLA: "Brajesh Pathak", party: "BJP" },
      { name: "Lucknow Cantt", type: "General", currentMLA: "Aparna Yadav", party: "BJP" },
    ],
  },
  // Rajasthan
  "Jaipur, Rajasthan": {
    state: "Rajasthan",
    district: "Jaipur",
    population: "66,26,178",
    area: "11,152 km²",
    literacy: "75.51%",
    headquarters: "Jaipur",
    constituencies: [
      { name: "Hawa Mahal", type: "General", currentMLA: "Balmukund Acharya", party: "BJP" },
      { name: "Civil Lines", type: "General", currentMLA: "Rajendra Rathore", party: "BJP" },
      { name: "Vidhyadhar Nagar", type: "General", currentMLA: "Mohan Lal Gupta", party: "BJP" },
      { name: "Sanganer", type: "General", currentMLA: "Ashok Lahoti", party: "BJP" },
    ],
  },
  // West Bengal
  "Kolkata, West Bengal": {
    state: "West Bengal",
    district: "Kolkata",
    population: "44,96,694",
    area: "205 km²",
    literacy: "86.31%",
    headquarters: "Kolkata",
    constituencies: [
      { name: "Jorasanko", type: "General", currentMLA: "Vivek Gupta", party: "TMC" },
      { name: "Entally", type: "General", currentMLA: "Swarna Kamal Saha", party: "TMC" },
      { name: "Ballygunge", type: "General", currentMLA: "Babul Supriyo", party: "TMC" },
      { name: "Rashbehari", type: "General", currentMLA: "Debashis Kumar", party: "TMC" },
      { name: "Tollygunge", type: "General", currentMLA: "Aroop Biswas", party: "TMC" },
    ],
  },
  // Delhi
  "New Delhi, NCT of Delhi": {
    state: "NCT of Delhi",
    district: "New Delhi",
    population: "1,10,07,835",
    area: "35 km²",
    literacy: "86.34%",
    headquarters: "New Delhi",
    constituencies: [
      { name: "New Delhi", type: "General", currentMLA: "Arvind Kejriwal", party: "AAP" },
      { name: "Kasturba Nagar", type: "SC", currentMLA: "Madan Lal", party: "AAP" },
    ],
  },
  // Gujarat
  "Ahmedabad, Gujarat": {
    state: "Gujarat",
    district: "Ahmedabad",
    population: "72,08,200",
    area: "8,707 km²",
    literacy: "85.31%",
    headquarters: "Ahmedabad",
    constituencies: [
      { name: "Ellisbridge", type: "General", currentMLA: "Amit Shah", party: "BJP" },
      { name: "Vejalpur", type: "General", currentMLA: "Kishor Chauhan", party: "BJP" },
      { name: "Maninagar", type: "General", currentMLA: "Suresh Patel", party: "BJP" },
      { name: "Danilimda", type: "SC", currentMLA: "Shailesh Parmar", party: "INC" },
    ],
  },
  // Kerala
  "Thiruvananthapuram, Kerala": {
    state: "Kerala",
    district: "Thiruvananthapuram",
    population: "33,01,427",
    area: "2,192 km²",
    literacy: "93.02%",
    headquarters: "Thiruvananthapuram",
    constituencies: [
      { name: "Kovalam", type: "General", currentMLA: "M. Vincent", party: "INC" },
      { name: "Neyyattinkara", type: "General", currentMLA: "K. Ansalan", party: "CPI(M)" },
      { name: "Nemom", type: "General", currentMLA: "V. Sivankutty", party: "CPI(M)" },
      { name: "Kazhakkoottam", type: "General", currentMLA: "Kadakampally Surendran", party: "CPI(M)" },
    ],
  },
  // Punjab
  "Amritsar, Punjab": {
    state: "Punjab",
    district: "Amritsar",
    population: "24,90,656",
    area: "5,056 km²",
    literacy: "76.53%",
    headquarters: "Amritsar",
    constituencies: [
      { name: "Amritsar North", type: "General", currentMLA: "Kunwar Vijay Pratap Singh", party: "AAP" },
      { name: "Amritsar Central", type: "General", currentMLA: "Op Soni", party: "INC" },
      { name: "Amritsar East", type: "General", currentMLA: "Jeevan Jyot Kaur", party: "AAP" },
    ],
  },
  // Telangana
  "Hyderabad, Telangana": {
    state: "Telangana",
    district: "Hyderabad",
    population: "39,43,323",
    area: "217 km²",
    literacy: "83.25%",
    headquarters: "Hyderabad",
    constituencies: [
      { name: "Charminar", type: "General", currentMLA: "Mumtaz Ahmed Khan", party: "AIMIM" },
      { name: "Goshamahal", type: "General", currentMLA: "T. Raja Singh", party: "BJP" },
      { name: "Nampally", type: "General", currentMLA: "Jaffar Hussain Meraj", party: "AIMIM" },
      { name: "Secunderabad", type: "General", currentMLA: "T. Padma Rao", party: "BJP" },
    ],
  },
};

export const getDistrictInfo = (label: string): DistrictInfo | null => {
  return districtDatabase[label] || null;
};

export const getDefaultInfo = (): { message: string } => {
  return { message: "Hover over or click a district to see details" };
};
