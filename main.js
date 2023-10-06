// İlk kısım, HTML'deki iki canvas elementini (carCanvas ve networkCanvas) alıp genişliklerini ayarlıyor:
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

//Ardından, iki canvas için 2D bağlamını (context) alıyor:
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

//Road sınıfından bir nesne oluşturuluyor. Bu kod parçasında Road sınıfının nasıl tanımlandığına dair bilgi bulunmuyor, ancak road adında bir yol nesnesi oluşturuluyor:
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

//N adında bir sabit tanımlanıyor ve generateCars fonksiyonu kullanılarak N adet araç oluşturuluyor:
const N = 1; // Yalnızca bir araç olacak şekilde ayarlandı
const cars = generateCars(N);

function generateCars(N) {
  const cars = [new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS", 5)];
  return cars;
}

let bestCar = cars[0];

if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.1);
    }
  }
}


//traffic arrayi oluşturuluyor, Dummy araclar tanımlanıyor
const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 4, getRandomColor()),
  new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 4, getRandomColor()),
  new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 4, getRandomColor()),
  new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 4, getRandomColor()),
  new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 4, getRandomColor()),
  new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 4, getRandomColor()),
  new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 4, getRandomColor()),
  new Car(road.getLaneCenter(0), -900, 30, 50, "DUMMY", 4, getRandomColor()),
  new Car(road.getLaneCenter(1), -900, 30, 50, "DUMMY", 4, getRandomColor()),
  new Car(road.getLaneCenter(0), -1100, 30, 50, "DUMMY", 4, getRandomColor()),
  new Car(road.getLaneCenter(1), -1100, 30, 50, "DUMMY", 4, getRandomColor()),
];

animate();

function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem("bestBrain");
}

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  
  // Sadece bir aracı güncelle
  cars[0].update(road.borders, traffic);
  bestCar = cars[0]; // Tek araç olduğu için bestCar direkt olarak cars[0] olacak
  
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx);
  }
  carCtx.globalAlpha = 0.2;
  
  // Sadece bir aracı çiz
  cars[0].draw(carCtx);
  
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, true);

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  requestAnimationFrame(animate);
}


