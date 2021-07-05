function guardarDato() {
    // Capturando Variables
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var correo = document.getElementById("correo").value;

    // Generando un avatar único
    //var avatarURL = 'http://api.adorable.io/avatars/80/' + email + '.png';
    var datos = {
        'apellido': apellido,
        'correo': correo,
       // 'avatarURL': avatarURL
    };

    // Almacenando los datos
    localStorage.setItem(nombre, JSON.stringify(datos));

    // Borrando los datos
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("correo").value = "";

    // Actualizando la lista
    actualizarDatos();
}

function recuperarDato() {
    // Capturando el nombre
    var nombre = document.getElementById("nombre").value;

    // Parseando los datos
    var datos = localStorage.getItem(nombre);
    datos = JSON.parse(datos);

    // Incluyendo los datos en el HTML
    document.getElementById("apellido").value = datos.apellido;
    document.getElementById("correo").value = datos.correo;
}

function eliminarDato() {
    // Capturando el nombre
    var nombre = document.getElementById("nombre").value;

    // Borrando el dato
    localStorage.removeItem(nombre);

    // Actualizando la lista
    actualizarDatos();
}

function eliminarTodo() {
    // Borrando todos los datos
    localStorage.clear();

    // Actualizando la lista
    actualizarDatos();
}

function actualizarDatos() {
    var elementos = "";

    // Verificando si existen datos
    if (localStorage.length === 0) {
        elementos += '<div class="panel panel-default"><div class="panel-body">Vacío</div></div>';
    } else {
        // Enriqueciendo "elementos" con cada par de valores almacenados
        for (var i = 0; i <= localStorage.length - 1; i++) {
            var key = localStorage.key(i);

            // Parseando los datos 
            var datos = localStorage.getItem(key);
            datos = JSON.parse(datos);

            // Enriqueciendo los datos con HTML
            elementos += '<div class="panel panel-default"><div class="panel-body">';
            elementos += '<div class="col-xs-9">';
            elementos += '<p>Nombre: <b>' + key + '</b></p>';
            elementos += '<p>apellido:<span class="glyphicon glyphicon-phone" aria-hidden="true"></span> ' + datos.apellido + '</p>';
            elementos += ' <p>correo:<span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> ' + datos.correo + '</p>';
            elementos += '</div></div></div><br><br>';
        }
    }
    // Actualizando "#contactos" con los "elementos" previamente enriquecidos
    document.getElementById('contactos').innerHTML = elementos;
}
