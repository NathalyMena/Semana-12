class Tarjeta {

    constructor(agregarTarjeta){
        this.agregarTarjeta = agregarTarjeta;
    }

    render = () => {
        let component = document.createElement('div');
        component.className = 'bloqueTarea';
        
        let nombreCurso = document.createElement('div');
        nombreCurso.className = 'nombreCurso';
        nombreCurso.innerHTML = this.agregarTarjeta.curso;

        let nombreEstudiante = document.createElement('div'); 
        nombreEstudiante.className = 'nombreEstudiante';
        nombreEstudiante.innerHTML = this.agregarTarjeta.estudiante;

        let codigoEstudiante = document.createElement('div'); 
        codigoEstudiante.className = 'codigoEstudiante';
        codigoEstudiante.innerHTML = this.agregarTarjeta.codigo;

        let numeroParticipaciones = document.createElement('div');
        numeroParticipaciones.className = 'numeroParticipaciones';
        numeroParticipaciones.innerHTML = this.agregarTarjeta.participaciones

        let botonBorrar = document.createElement('button');
        botonBorrar.className = "botonEliminar";

        let botonSubir = document.createElement('button');
        botonSubir.className = "botonSubirRango";
        botonSubir.innerHTML = "+";

        component.appendChild(nombreCurso);
                component.appendChild(nombreEstudiante);
                component.appendChild(codigoEstudiante);
                component.appendChild(numeroParticipaciones);
                component.appendChild(botonBorrar);
                component.appendChild(botonSubir);

        botonBorrar.addEventListener('click', ()=>{
            const database = firebase.database();
            database.ref('Estudiantes/'+this.agregarTarjeta.id).set(null);
        });

        botonSubir.addEventListener('click', ()=>{
            const database = firebase.database();
            this.agregarTarjeta.participaciones++;
            database.ref('Estudiantes/'+this.agregarTarjeta.id).set(this.agregarTarjeta);
                    
        });

        return component;
        
    }
}