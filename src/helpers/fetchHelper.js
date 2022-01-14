export default async function getData() {
  let vehicleArray = [];
  let pilotsArray = [];
  let homeLandArray = [];

  // vehicles data
  for (let i = 1; i < 5; i++) {
    await fetch(`https://swapi.py4e.com/api/vehicles/?page=${i}`)
      .then((x) => x.json())
      .then((x) => (vehicleArray = vehicleArray.concat(x.results)))
      .catch((e) => console.log(e));
  }

  //  people data
  for (let i = 1; i < 10; i++) {
    await fetch(`https://swapi.py4e.com/api/people/?page=${i}`)
      .then((x) => x.json())
      .then((x) => (pilotsArray = pilotsArray.concat(x.results)))
      .catch((e) => console.log(e));
  }

  //  planets data
  for (let i = 1; i < 8; i++) {
    await fetch(`https://swapi.py4e.com/api/planets/?page=${i}`)
      .then((x) => x.json())
      .then((x) => (homeLandArray = homeLandArray.concat(x.results)))
      .catch((e) => console.log(e));
  }

  let allData = [];

  // iteration on all the vehicles
  vehicleArray.forEach((vehicle) => {
    let data = {
      vehicleName: vehicle.name,
      relatedHomePlanets: [],
      relatedPilotNames: [],
      populationSum: 0,
    };

    // getting pilots data for every vehicle
    vehicle.pilots.forEach((pilot) => {
      pilotsArray.forEach((p) => {
        if (p.url == pilot) {
          data.relatedPilotNames.push(p.name);
          homeLandArray.forEach((planet) => {
            if (planet.url == p.homeworld) {
              //checking if homeLand is exist
              const found = data.relatedHomePlanets.find((element) => {
                if (element.name === planet.name) {
                  return true;
                }
              });
              if (!found) {
                let homeObj = {
                  name: planet.name,
                  population: planet.population,
                };
                data.relatedHomePlanets.push(homeObj);
                data.populationSum = +data.populationSum + +planet.population;
              }
            }
          });
        }
      });
    });
    allData.push(data);
  });
  return findMax(allData);
}

function findMax(arr) {
  let max = 0;
  let maxItem = {};
  arr.forEach((item) => {
    if (item.populationSum > max) {
      max = item.populationSum;
      maxItem = item;
    }
  });
  return maxItem;
}
