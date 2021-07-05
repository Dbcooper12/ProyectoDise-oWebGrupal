function guardarDato() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;

    var datos = {
        'email': email,
       // 'avatarURL': avatarURL
    };

    localStorage.setItem(nombre, JSON.stringify(datos));

    // Borrando los datos
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";

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
                elementos += ' <p>Email <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> ' + datos.email + '</p>';
                elementos += '</div></div></div>';
            }
        }
        // Actualizando "#contactos" con los "elementos" previamente enriquecidos
        document.getElementById('contactos').innerHTML = elementos;
}