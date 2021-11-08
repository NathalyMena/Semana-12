
const estudiante = document.getElementById('estudiante'); 
const codigo = document.getElementById('codigo'); 
const curso = document.getElementById('curso'); 
const matricular = document.getElementById('matricular');
const contenedorTarjetas = document.getElementById('contenedorTarjetas'); 
const contenedorTarjetas2 = document.getElementById('contenedorTarjetas2'); 
const contenedorTarjetas3 = document.getElementById('contenedorTarjetas3'); 
const sinBono = document.getElementById('sinBono');
const bonoPlata = document.getElementById('bonoPlata');
const bonoOro = document.getElementById('bonoOro');

const database = firebase.database();

//funciones

registrarEstudiante = () => {

    if (estudiante.value === ''){
        alety('Campo Vacio');
        return;
    }
    if (codigo.value === ''){
        alety('Campo Vacio');
        return;
    }
    if (curso.value === ''){
        alety('Campo Vacio');
        return;
    }

    let referencia = database.ref('Estudiantes').push();
    let agregarTarjeta = {
        id: referencia.key,
        participaciones: 1,
        estudiante: estudiante.value,
        codigo: codigo.value, 
        curso: curso.value,
    };

    referencia.set(agregarTarjeta);

    estudiante.value='';
    codigo.value='';
    curso.value='';
}

matricular.addEventListener('click', registrarEstudiante);

database.ref('Estudiantes').on('value', function(data) {
    contenedorTarjetas.innerHTML = '';
    contenedorTarjetas2.innerHTML = '';
    contenedorTarjetas3.innerHTML = '';
    data.forEach(
        agregarTarjeta => {
            let valor = agregarTarjeta.val();
            
            if(valor.participaciones > 0 && valor.participaciones <= 5){
                sinBono.value=''
                let tarjeta = new Tarjeta(valor);
                contenedorTarjetas.appendChild(tarjeta.render());
                
            }

            if(valor.participaciones > 5 && valor.participaciones <= 10){
                bonoPlata.value=''
                let tarjeta = new Tarjeta(valor);
                contenedorTarjetas2.appendChild(tarjeta.render());
            }

            if(valor.participaciones > 10){
                bonoOro.value=''
                let tarjeta = new Tarjeta(valor);
                contenedorTarjetas3.appendChild(tarjeta.render());
            }
        }
    )

});