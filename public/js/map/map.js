ymaps.ready(init);

async function init() {
  let map = new ymaps.Map('map', {
    center: [59.92979160258393, 30.339240775390625],
    zoom: 12.5,
  });

  // method - get
  // action - /map/show
  const response = await fetch('/map/show');
  const data = await response.json();

  for (let i = 0; data.length; i++) {
    let dataAddress =
      data[i].bar_city + ', ' + data[i].bar_street + ', ' + data[i].bar_house;

    ymaps.geocode(dataAddress, { results: 1 }).then(function (res) {
      let firstGeoObject = res.geoObjects.get(0);
      let coords = firstGeoObject.geometry.getCoordinates();

      let title = `
        <div style='display:flex; justify-content:center'>
        <b>${data[i].bar_title}</b>
        </div>`
      let photo = `
        <hr>
        <img src='/img/${data[i].bar_photo_name}' style='height:180px; width:300px'>`;
      let text = `
        <hr>
        <div>${data[i].bar_type}</div>
        <div>${dataAddress}</div>
        <div>Средний чек: ${data[i].bar_price}</div>`;
      let content = photo + text;
      let button = `
        <div style='display:flex; justify-content:center'>
        <a id='target' href='/main/${data[i].id}' class='btn btn-btn-outline-dark' style='text-align:center'>Хочу сюда!</a>
        </div>`;

      let myPlaceNew = new ymaps.Placemark(
        coords,
        {
          balloonContentHeader: title,
          balloonContent: content,
          balloonContentFooter: button,
        },
        {}
      );
      
      map.controls.remove('geolocationControl') // Удаление геолокация
      map.controls.remove('searchControl') // Удаляем поиск
      map.controls.remove('typeSelector') // Удаляем тип
      map.controls.remove('rulerControl') // Удаляем контроль правил

      map.geoObjects.add(myPlaceNew);
    });
  }
}

