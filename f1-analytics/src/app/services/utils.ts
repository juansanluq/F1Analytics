import { Type } from '@angular/compiler';

export const API_URL = 'https://ergast.com/api/f1';

export interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
  countryCode: string;
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  countryCode: string;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface Time {
  millis: string;
  time: string;
}

export interface Time2 {
  time: string;
}

export interface AverageSpeed {
  units: string;
  speed: string;
}

export interface FastestLap {
  rank: string;
  lap: string;
  Time: Time2;
  AverageSpeed: AverageSpeed;
}

export interface Result {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time: Time;
  FastestLap: FastestLap;
}

export interface GP {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  Results: Result[];
  real_date?: Date;
}

export const countryList = [
  ["AE", "United Arab Emirates", "12-02", "Emirati", "+4"],
  ["AE", "UAE", "12-02", "Emirati", "+4"],
  ["AF", "Afghanistan", "08-19", "Afghan", "+4.5"],
  ["AG", "Antigua and Barbuda", "11-01", "Antiguan", "-4"],
  ["AI", "Anguilla", "05-30", "Anguillian", "-4"],
  ["AL", "Albania", "11-28", "Albanian", "+1"],
  ["AM", "Armenia", "09-21", "Armenian", "+4"],
  ["AN", "Netherlands Antilles", "04-30", "", "-4"],
  ["AO", "Angola", "11-11", "Angolan", "+1"],
  ["AQ", "Antarctica", "", "", "-3"],
  ["AR", "Argentina", "07-09", "Argentine", "-3"],
  ["AS", "American Samoa", "04-17", "American Samoan", "-11"],
  ["AT", "Austria", "10-26", "Austrian", "+1"],
  ["AU", "Australia", "01-26", "Australian", "+8 to +10.5"],
  ["AW", "Aruba", "03-18", "Aruban", "-4"],
  ["AX", "Åland Islands", "", "", "+2"],
  ["AZ", "Azerbaijan", "10-18", "Azerbaijani", "+4"],
  ["BA", "Bosnia and Herzegovina", "03-01", "Bosnian", "+1"],
  ["BB", "Barbados", "11-30", "Barbadian", "-4"],
  ["BD", "Bangladesh", "03-26", "Bangladeshi", "+6"],
  ["BE", "Belgium", "07-21", "Belgian", "+1"],
  ["BF", "Burkina Faso", "08-05", "Burkinabé", "0"],
  ["BG", "Bulgaria", "09-22", "Bulgarian", "+2"],
  ["BH", "Bahrain", "08-15", "Bahraini", "+3"],
  ["BI", "Burundi", "07-01", "Burundian", "+2"],
  ["BJ", "Benin", "08-01", "Beninese", "+1"],
  ["BM", "Bermuda", "05-24", "Bermudian", "-4"],
  ["BN", "Brunei Darussalam", "02-23", "Bruneian", "+8.1"],
  ["BO", "Bolivia", "08-06", "Bolivian", "-4"],
  ["BR", "Brazil", "09-07", "Brazilian", "-2 to -5"],
  ["BS", "Bahamas", "07-10", "Bahamian", "-5"],
  ["BT", "Bhutan", "12-17", "Bhutanese", "+6"],
  ["BV", "Bouvet Island", "", "", "+1"],
  ["BW", "Botswana", "09-30", "Batswana", "+2"],
  ["BY", "Belarus", "07-03", "Belarusian", "+2"],
  ["BZ", "Belize", "09-21", "Belizean", "-6"],
  ["CA", "Canada", "07-01", "Canadian", "-3.5 to -8"],
  ["CC", "Cocos (Keeling) Islands", "01-26", "Cocos Island", "+6.5"],
  ["CD", "Congo, Democratic Republic of the", "06-30", "Congolese", "+1 to +2"],
  ["CF", "Central African Republic", "12-01", "Central African", "+1"],
  ["CG", "Congo", "08-15", "Congolese", "0"],
  ["CH", "Switzerland", "08-01", "Swiss", "+1"],
  ["CI", "Cote D'ivoire", "08-07", "Ivorian/Ivoirian", "0"],
  ["CK", "Cook Islands", "08-04", "Cook Islander", "-10"],
  ["CL", "Chile", "02-12", "Chilean", "-4"],
  ["CM", "Cameroon", "05-20", "Cameroonian", "+1"],
  ["CN", "China", "10-01", "Chinese", "+8"],
  ["CO", "Colombia", "07-20", "Colombian", "-5"],
  ["CR", "Costa Rica", "09-15", "Costa Rican", "-6"],
  ["CS", "Serbia and Montenegro", "", "", ""],
  ["CU", "Cuba", "01-01", "Cuban", "-5"],
  ["CV", "Cape Verde", "09-12", "Cape Verdean", "-1"],
  ["CX", "Christmas Island", "01-26", "Christmas Island", "+7"],
  ["CY", "Cyprus", "10-01", "Cypriot", "+2"],
  ["CZ", "Czech Republic", "10-28", "Czech", "+1"],
  ["DE", "Germany", "10-03", "German", "+1"],
  ["DJ", "Djibouti", "06-27", "Djiboutian", "+3"],
  ["DK", "Denmark", "06-05", "Danish", "+1"],
  ["DM", "Dominica", "11-03", "Dominican", "-4"],
  ["DO", "Dominican Republic", "02-27", "Dominican", "-4"],
  ["DZ", "Algeria", "07-05", "Algerian", "+1"],
  ["EC", "Ecuador", "08-10", "Ecuadorian", "-5, -6"],
  ["EE", "Estonia", "02-24", "Estonian", "+2"],
  ["EG", "Egypt", "07-23", "Egyptian", "+2"],
  ["EH", "Western Sahara", "", "Sahrawi", "0"],
  ["ER", "Eritrea", "05-24", "Eritrean", "+3"],
  ["ES", "Spain", "10-12", "Spanish", "+1"],
  ["ET", "Ethiopia", "05-28", "Ethiopian", "+3"],
  ["FI", "Finland", "12-06", "Finnish", "+2"],
  ["FJ", "Fiji", "10-10", "Fijian/Fiji Islander", "+12"],
  ["FK", "Falkland Islands (Malvinas)", "06-14", "Falkland Islander", "-4"],
  ["FM", "Micronesia", "05-10", "Micronesian", "+10 and +11"],
  ["FO", "Faroe Islands", "07-29", "Faroese", "+1"],
  ["FR", "France", "07-14", "French", "+1"],
  ["GA", "Gabon", "08-17", "Gabonese", "+1"],
  ["GB", "United Kingdom", "", "British", "0"],
  ["GD", "Grenada", "02-07", "Grenadian", "-4"],
  ["GE", "Georgia", "05-26 04-09", "Georgian", "+4"],
  ["GF", "French Guiana", "07-14", "", "0"],
  ["GH", "Ghana", "03-06", "Ghanaian", "0"],
  ["GI", "Gibraltar", "09-10", "Gibraltarian", "+1"],
  ["GL", "Greenland", "06-21", "Greenlander", "0 to -4"],
  ["GM", "Gambia", "02-18", "Gambian", "0"],
  ["GN", "Guinea", "04-03", "Guinean", "0"],
  ["GP", "Guadeloupe", "07-14", "", "0"],
  ["GQ", "Equatorial Guinea", "10-12", "Equatorial Guinean", "+1"],
  ["GR", "Greece", "03-25", "Greek", "+2"],
  ["GS", "South Georgia and the South Sandwich Islands", "", "", "-2"],
  ["GT", "Guatemala", "09-15", "Guatemalan", "-6"],
  ["GU", "Guam", "07-21", "Guamanian", "+10"],
  ["GW", "Guinea-Bissau", "09-24", "Guinean", "0"],
  ["GY", "Guyana", "05-26", "Guyanese", "-4"],
  ["HK", "Hong Kong", "07-01", "Hongkonger", "+8"],
  ["HM", "Heard Island and Mcdonald Islands", "", "", "0"],
  ["HN", "Honduras", "09-15", "Honduran", "-6"],
  ["HR", "Croatia", "10-08", "Croat", "+1"],
  ["HT", "Haiti", "01-01", "Haitian", "-5"],
  ["HU", "Hungary", "08-20", "Hungarian", "+1"],
  ["ID", "Indonesia", "08-17", "Indonesian", "+7 to +9"],
  ["IE", "Ireland", "03-17", "Irish", "0"],
  ["IL", "Israel", "05-14", "Israeli", "+2"],
  ["IN", "India", "08-15", "Indian", "+5.5"],
  ["IO", "British Indian Ocean Territory", "", "", "+6"],
  ["IQ", "Iraq", "10-03", "Iraqi", "+3"],
  ["IR", "Iran, Islamic Republic of", "04-01", "Iranian", "+3.5"],
  ["IS", "Iceland", "06-17", "Icelander", "0"],
  ["IT", "Italy", "06-02", "Italian", "+1"],
  ["JM", "Jamaica", "08-06", "Jamaican", "-5"],
  ["JO", "Jordan", "05-25", "Jordanian", "+2"],
  ["JP", "Japan", "02-11", "Japanese", "+9"],
  ["KE", "Kenya", "12-12", "Kenyan", "+3"],
  ["KG", "Kyrgyzstan", "08-31", "Kyrgy", "+6"],
  ["KH", "Cambodia", "11-09", "Cambodian", "+7"],
  ["KI", "Kiribati", "07-12", "I-Kiribati", "+12, +13, +14"],
  ["KM", "Comoros", "07-06", "Comorian", "+3"],
  ["KN", "Saint Kitts and Nevis", "09-19", "Kittitian", "-4"],
  ["KP", "Korea, Democratic People's Republic of", "08-15", "North Korean", "+9"],
  ["KR", "Korea, Republic of", "09-08", "South Korean", "+9"],
  ["KR", "Korea", "09-08", "South Korean", "+9"],
  ["KW", "Kuwait", "01-26", "Kuwaiti", "+7"],
  ["KY", "Cayman Islands", "", "Caymanian", "-5"],
  ["KZ", "Kazakhstan", "12-16", "Kazakhstani", "+5/+6"],
  ["LA", "Lao People's Democratic Republic", "12-02", "Laotian", "+7"],
  ["LB", "Lebanon", "11-22", "Lebanese", "+2"],
  ["LC", "Saint Lucia", "12-13", "Saint Lucian", "-4"],
  ["LI", "Liechtenstein", "08-15", "Liechtensteinian", "+1"],
  ["LK", "Sri Lanka", "02-04", "Sri Lankan", "+5.5"],
  ["LR", "Liberia", "07-26", "Liberian", "0"],
  ["LS", "Lesotho", "10-04", "Mosotho", "+2"],
  ["LT", "Lithuania", "02-16 03-11", "Lithuanian", "+2"],
  ["LU", "Luxembourg", "06-23", "Luxembourgers", "+1"],
  ["LV", "Latvia", "11-18", "Latvian", "+2"],
  ["LY", "Libyan Arab Jamahiriya", "09-01", "Libyan", "+2"],
  ["MA", "Morocco", "03-02", "Moroccan", "0"],
  ["MC", "Monaco", "11-19", "Monégasque/Monegasque", "+1"],
  ["MD", "Moldova", "08-27", "Moldovan/Moldavian", "+2"],
  ["ME", "Montenegro", "05-21", "Montenegrin", "+1"],
  ["MG", "Madagascar", "06-26", "Malagasy", "+3"],
  ["MH", "Marshall Islands", "05-01", "Marshallese", "+12"],
  ["MK", "Macedonia, the Former Yugoslav Republic of", "09-08", "Macedonian", "+1"],
  ["ML", "Mali", "09-22", "Malian", "0"],
  ["MM", "Myanmar", "01-04", "Burmese", "+6.5"],
  ["MN", "Mongolia", "11-26", "Mongolian", "+7 to +8"],
  ["MO", "Mozambique", "12-20", "Macanese", "+8"],
  ["MP", "Northern Mariana Islands", "01-08", "", "+10"],
  ["MQ", "Martinique", "07-14", "", "0"],
  ["MR", "Mauritania", "11-28", "Mauritanian", "+1"],
  ["MS", "Montserrat", "", "", "-4"],
  ["MT", "Malta", "09-21", "Maltese", "+1"],
  ["MU", "Mauritius", "03-12", "Mauritian", "+4"],
  ["MV", "Maldives", "07-26", "Maldivian", "+5"],
  ["MW", "Malawi", "07-06", "Malawian", "+2"],
  ["MX", "Mexico", "09-16", "Mexican", "-8 to -6"],
  ["MY", "Malaysia", "08-31", "Malaysian", "+8"],
  ["MZ", "Mozambique", "06-25", "Mozambican", "+2"],
  ["NA", "Namibia", "03-21", "Namibian", "+1"],
  ["NC", "New Caledonia", "07-14", "", "+11"],
  ["NE", "Niger", "08-03", "Nigerien", "+1"],
  ["NF", "Norfolk Island", "06-08", "", "+11.5"],
  ["NG", "Nigeria", "10-01", "Nigerian", "+1"],
  ["NI", "Nicaragua", "09-15", "Nicaraguan", "-6"],
  ["NL", "Netherlands", "04-30", "Dutch", "+1"],
  ["NO", "Norway", "06-07", "Norwegian", "+1"],
  ["NP", "Nepal", "07-07", "Nepali", "+5.75"],
  ["NR", "Nauru", "01-31", "Nauruan", "+12"],
  ["NT", "Neutral Zone", "", "", ""],
  ["NU", "Niue", "02-06", "Niuean", "-11"],
  ["NZ", "New Zealand", "02-06", "New Zealander", "+12"],
  ["OM", "Oman", "11-18", "Omani", "+4"],
  ["PA", "Panama", "11-28", "Panamanian", "-5"],
  ["PE", "Peru", "07-28", "Peruvian", "-5"],
  ["PF", "French Polynesia", "07-14", "French Polynesian", "-10"],
  ["PG", "Papua New Guinea", "09-16", "Papua New Guinean", "+10"],
  ["PH", "Philippines", "06-12", "Filipino", "+8"],
  ["PK", "Pakistan", "08-14", "Pakistani", "+5"],
  ["PL", "Poland", "11-11", "Pole/Polish", "+1"],
  ["PM", "Saint Pierre and Miquelon", "07-14", "", "-3"],
  ["PN", "Pitcairn", "", "", "-8"],
  ["PR", "Puerto Rico", "07-25", "Puerto Rican", "-4"],
  ["PS", "Palestinian Territory, Occupied", "", "", "0"],
  ["PT", "Portugal", "12-01", "Portuguese", "0"],
  ["PW", "Palau", "07-09", "Palauan", "+9"],
  ["PY", "Paraguay", "05-15", "Paraguayan", "-4"],
  ["QA", "Qatar", "09-03", "Qatari", "+3"],
  ["RE", "Reunion", "07-14", "", "0"],
  ["RO", "Romania", "05-09", "Romanian", "+2"],
  ["RS", "Serbia", "02-15", "Serbian", "+1"],
  ["RU", "Russian Federation", "06-12", "Russian", "+2 to +12"],
  ["RU", "Russia", "06-12", "Russian", "+2 to +12"],
  ["RW", "Rwanda", "07-01", "Rwandan", "+2"],
  ["SA", "Saudi Arabia", "09-23", "Saudi", "+3"],
  ["SB", "Solomon Islands", "07-07", "Solomon Islander", "+11"],
  ["SC", "Seychelles", "06-29", "Seychellois", "+4"],
  ["SD", "Sudan", "01-01", "Sudanese", "+3"],
  ["SE", "Sweden", "06-06", "Swedish", "+1"],
  ["SG", "Singapore", "08-09", "Singaporean", "+8"],
  ["SH", "Saint Helena", "", "", "0"],
  ["SI", "Slovenia", "06-25", "Slovenian", "+1"],
  ["SJ", "Svalbard and Jan Mayen Islands", "", "", "0"],
  ["SK", "Slovakia", "07-17", "Slovak", "+1"],
  ["SL", "Sierra Leone", "04-27", "Sierra Leonean", "0"],
  ["SM", "San Marino", "09-03", "Sammarinese", "+1"],
  ["SN", "Senegal", "04-04", "Senegalese", "0"],
  ["SO", "Somalia", "10-21", "Somali", "+3"],
  ["SR", "Suriname", "11-25", "Surinamese", "-3"],
  ["ST", "Sao Tome and Principe", "07-12", "Santomean", "0"],
  ["SV", "El Salvador", "09-15", "Salvadoran", "-6"],
  ["SY", "Seychelles", "04-17", "Syrian", "+2"],
  ["SZ", "Swaziland", "09-06", "Swazi", "+2"],
  ["TC", "Turks and Caicos Islands", "08-30", "", "-5"],
  ["TD", "Chad", "08-11", "Chadian", "+1"],
  ["TF", "French Southern Territories", "", "", "0"],
  ["TG", "Togo", "04-27", "Togolese", "0"],
  ["TH", "Thailand", "12-05", "Thai", "+7"],
  ["TJ", "Tajikistan", "09-09", "Tajik", "+5"],
  ["TK", "Tokelau", "02-06", "Tokelauan", "-10"],
  ["TL", "Timor-Leste", "05-20", "East Timorese", "+9"],
  ["TM", "Turkmenistan", "10-27", "Turkmen", "+5"],
  ["TN", "Tunisia", "03-20", "Tunisian", "+1"],
  ["TO", "Tonga", "06-04", "Tongan", "+13"],
  ["TR", "Turkey", "10-29", "Turkish", "+2"],
  ["TT", "Trinidad and Tobago", "08-31", "Trinidadian", "-4"],
  ["TV", "Tuvalu", "10-01", "Tuvaluan", "+12"],
  ["TW", "Taiwan", "10-10", "Taiwanese", "+8"],
  ["TZ", "Tanzania, United Republic of", "04-26", "Tanzanian", "+3"],
  ["UA", "Ukraine", "08-24", "Ukrainian", "+2"],
  ["UG", "Uganda", "10-09", "Ugandan", "+3"],
  ["GB", "UK", "", "", ""],
  ["US", "United States", "07-04", "American", "-5 to -10"],
  ["US", "USA", "07-04", "American", "-5 to -10"],
  ["UY", "Uruguay", "08-25", "Uruguayan", "-3"],
  ["UZ", "Uzbekistan", "09-01", "Uzbekistani", "+5"],
  ["VA", "Vatican City State", "04-24", "", "+1"],
  ["VC", "Saint Vincent and the Grenadines", "10-27", "Vincentian", "-4"],
  ["VE", "Venezuela", "07-05", "Venezuelan", "-4.5"],
  ["VG", "Virgin Islands, British", "07-01", "", "-4"],
  ["VI", "Virgin Islands, U.S.", "03-31", "", "-4"],
  ["VN", "Viet Nam", "09-02", "Vietnamese", "+7"],
  ["VU", "Vanuatu", "07-30", "Ni-Vanuatu", "+11"],
  ["WF", "Wallis and Futuna Islands", "07-14", "Wallisian/Futunan", "+12"],
  ["WS", "Samoa", "06-01", "Samoan", "-11"],
  ["YE", "Yemen", "11-30", "Yemeni/Yemenite", "+3"],
  ["YT", "Mayotte", "07-14", "Mahoran", "+3"],
  ["YU", "Yugoslavia", "", "", ""],
  ["ZA", "South Africa", "12-11", "South African", "+2"],
  ["ZM", "Zambia", "10-24", "Zambian", "+2"],
  ["ZW", "Zimbabwe", "04-18", "Zimbabwean", "+2"]
];
