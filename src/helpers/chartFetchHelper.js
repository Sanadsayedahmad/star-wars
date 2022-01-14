export default async function chartData() {
  const homeLands = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];
  let data = [];
  let homeLandArray = [];

  //  planets data
  for (let i = 1; i < 8; i++) {
    await fetch(`https://swapi.py4e.com/api/planets/?page=${i}`)
      .then((x) => x.json())
      .then((x) => (homeLandArray = homeLandArray.concat(x.results)))
      .catch((e) => console.log(e));
  }

  // getting the population for all required homeLands
  homeLandArray.forEach((homeLand) => {
    if (homeLands.indexOf(homeLand.name) != -1) {
      let obj = { name: homeLand.name, population: homeLand.population };
      data.push(obj);
    }
  });
  return data;
}
