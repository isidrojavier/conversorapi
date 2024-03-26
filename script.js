//Declaración de constantes
const monedaEl_one = document.getElementById('moneda-uno');
const monedaEl_two = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tasaEl = document.getElementById('tasa');


//función que calculará la conversión de monedas
function calculate(){
    const moneda_one = monedaEl_one.value;
    const moneda_two = monedaEl_two.value;

    const direccion = `https://api.exchangerate-api.com/v4/latest/${moneda_one}`;

    //Inicio de la fetch, función asíncrona que devolverá de la dirección indicada el conjunto de datos
    fetch(direccion)
   .then(res => res.json())
   .then(data => {
       const tasa = data.rates[moneda_two]; //de los datos obtenidos, sólo me interesa data.rates que es la que contiene todas las monedas con su cambio
                                            // y de ahí como la moneda que aparece en el segundo select
       cambioEl.innerText = `1 ${moneda_one} = ${tasa} ${moneda_two}`; //este es el cartelito que aparece con la equivalencia completa

       cantidadEl_two.value = (cantidadEl_one.value * tasa).toFixed(2); //calcula la tasa y la devuelve al cuadro de texto
    } );
    
}

//función que rellena los select con el resultado obtenido de la fetch
function rellenarSelect(){
    const direccion = `https://api.exchangerate-api.com/v4/latest/USD`;
    let arraydedatos = [];
    //exactamente como calculate
   fetch(direccion)
   .then(res => res.json())
   .then(data => {
       arraydedatos = data.rates; //esta vez el resultado lo guardo en un array. Este array no tiene indice numérico, con lo cual hay que tener cuidado
       //texto = data.rates;

        let contador = 0;
        for(let indice in arraydedatos){ //recorro todo el array
            contador++;
            //console.log(indice);
            //console.log(arraydedatos[indice]);
            var opciones = document.createElement('option'); //creo un elemento de tipo opción
            opciones.value = indice; //como valor el índice que es un texto: EUR,USD, etc...
            opciones.text = indice; //como texto que aparece el mismo índice
            monedaEl_one.appendChild(opciones); //agrego el option al select
         }
         contador = 0;
         for(let indice in arraydedatos){
            contador++;
            var opciones = document.createElement('option');
            opciones.value = indice;
            opciones.text = indice;
            monedaEl_two.appendChild(opciones);
         }
    } );
    
}

//Event listeners
monedaEl_one.addEventListener('change', calculate);
cantidadEl_one.addEventListener('input', calculate);
monedaEl_two.addEventListener('change', calculate);
cantidadEl_two.addEventListener('input', calculate);

tasa.addEventListener('click', () =>{
    const temp = monedaEl_one.value;
    monedaEl_one.value = monedaEl_two.value;
    monedaEl_two.value = temp;
    calculate();
} );


calculate();