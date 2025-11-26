// SPDX-License-Identifier: MIT
uint256 id;
string make; // marque
string model; // modèle
uint16 year; // année
string color; // couleur
string engineType; // type de moteur (ex: "V6", "Electric")
uint16 horsepower; // puissance
uint8 doors; // nombre de portes
uint8 seats; // nombre de sièges
bool isElectric; // électrique ou non
string vin; // numéro VIN
}


Car[] public cars;
mapping(uint256 => address) public ownerOf;


event CarCreated(uint256 indexed id, address indexed owner, string make, string model);


constructor() {
nextId = 1;
}


function createCar(
string memory make,
string memory model,
uint16 year,
string memory color,
string memory engineType,
uint16 horsepower,
uint8 doors,
uint8 seats,
bool isElectric,
string memory vin
) public returns (uint256) {
uint256 id = nextId++;
cars.push(Car({
id: id,
make: make,
model: model,
year: year,
color: color,
engineType: engineType,
horsepower: horsepower,
doors: doors,
seats: seats,
isElectric: isElectric,
vin: vin
}));


ownerOf[id] = msg.sender;


emit CarCreated(id, msg.sender, make, model);
return id;
}


function getCar(uint256 id) public view returns (Car memory) {
require(id > 0 && id < nextId, "Car: not found");
// search linear (small dataset). Alternatively store mapping id => Car
for (uint256 i = 0; i < cars.length; i++) {
if (cars[i].id == id) return cars[i];
}
revert("Car: not found");
}


function totalCars() public view returns (uint256) {
return cars.length;
}
}
