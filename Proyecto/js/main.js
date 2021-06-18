
var listaCursos = [
    [1, "Unitil Dawn", 249.00, "https://secureservercdn.net/198.71.233.47/ezq.760.myftpupload.com/wp-content/uploads/2019/12/P4J144-1-300x300.jpg"],
    [2, "The Last of Us", 79.00, "https://secureservercdn.net/198.71.233.47/ezq.760.myftpupload.com/wp-content/uploads/2019/12/P4J128-1-300x300.jpg"],
    [3, "FiFa 21 PS4", 200.00, "https://secureservercdn.net/198.71.233.47/ezq.760.myftpupload.com/wp-content/uploads/2020/09/FIFA-21-300x300.jpg"],
    [4, "The Last of Us", 50.00, "https://secureservercdn.net/198.71.233.47/ezq.760.myftpupload.com/wp-content/uploads/2020/01/P4J403-2-300x300.jpg"],
    [5, "Uncharted the nathan", 169.00, "https://secureservercdn.net/198.71.233.47/ezq.760.myftpupload.com/wp-content/uploads/2019/12/P4J142-1-300x300.jpg"],
    [6, "Mortal Kombat", 239.00, "https://secureservercdn.net/198.71.233.47/ezq.760.myftpupload.com/wp-content/uploads/2019/12/P4J348-300x300.jpg"],
    [7, "PES 2021", 249.00, "https://secureservercdn.net/198.71.233.47/ezq.760.myftpupload.com/wp-content/uploads/2020/08/P4J426-300x300.jpg"],
    [8, "Dragon Ball ", 189.00, "https://secureservercdn.net/198.71.233.47/ezq.760.myftpupload.com/wp-content/uploads/2019/12/P4J163-1-300x300.jpg"]
];

var carrito = [];

$(document).ready(function () {
    listarCursos();
    mostrarCarrito();
});

function listarCursos() {
    $(".lista-cursos").html("");
    listaCursos.forEach(c => {
        curso = '<div class="col-4">';
        curso +=    '<div class="card">';
        curso +=        '<img src="' + c[3] + '" alt="curso" class="card-img-top">';
        curso +=        '<div class="card-body">';
        curso +=            '<span>' + c[1] + '</span>';
        curso +=            '<h5>S/ ' + c[2] + '</h5>';
        curso +=            '<p class="card-text">Descripción</p>'
        curso +=            '<center><button class="btn btn-danger btnAgregar" onclick="agregar(' + c[0] + ')" id="' + c[0] + '">Agregar</button></center>';
        curso += '</div></div></div>';
        $(".lista-cursos").append(curso);
    });
}

function agregar(id) {
    carrito.push(listaCursos[id - 1]);
    document.getElementById(id.toString()).disabled = true;
    document.getElementById(id.toString()).innerHTML = "Agregado";
    mostrarCarrito();
}

function mostrarCarrito() {
    $("#tblDatos").html("");
    if (carrito.length != 0) {
        carrito.forEach(producto => {
            p = '<tr>';
            p +=    '<td class="text-center"><button class="btn btn-danger btn-sm" onclick="eliminarDeCarrito(' + producto[0] + ')">X</button></td>';
            p +=    '<td>' + producto[1] + '</td>';
            p +=    '<td> S/ ' + producto[2] + '</td>';
            p += '</tr>';
            $("#tblDatos").append(p);
        });
    }
    mostrarTotal();
}

function eliminarDeCarrito(id) {
    carrito.splice(carrito.indexOf(listaCursos[id - 1]), 1);
    document.getElementById(id.toString()).disabled = false;
    document.getElementById(id.toString()).innerHTML = "Agregar";
    mostrarCarrito();
    mostrarTotal();
}

var total;

function mostrarTotal() {
    $("#total").html("");
    total = 0;
    if (carrito.length != 0){
        carrito.forEach(p => total = total + p[2]);
        
        t = '<td colspan="2">Total a pagar:</td>';
        t += '<td>S/' + total + '</td>';
    
        $("#total").append(t);
    }
}

function limpiarCarrito() {
    carrito.forEach(p => {
        document.getElementById(p[0].toString()).disabled = false;
        document.getElementById(p[0].toString()).innerHTML = "Agregar ";
    });
    carrito = [];
    mostrarCarrito();
}

function comprar() {
    nombres = $("#txtNombres").val();
    email = $("#txtEmail").val();

    $("#contenido-modal").html("");
    c = "<h6>Confirme sus datos:</h6>";
    c += '<span class="ml-4">Nombres y Apellidos: </span>';
    c += '<span class="font-weight-bold">' + nombres + "</span><br>";
    c += '<span class="ml-4">Email: </span>';
    c += '<span class="font-weight-bold">' + email + "</span>";
    c += '<table class="table table-sm mt-4">';
    c +=    '<thead>';
    c +=        '<tr>';
    c +=            '<th>Producto</th>';
    c +=            '<th>Precio</th>';
    c +=        '</tr>';
    c +=    '</thead>';
    c +=    '<tbody>';
    carrito.forEach(p => {
        c +=    '<tr>';
        c +=        '<td>' + p[1] + '</td>';
        c +=        '<td>S/ ' + p[2] + '</td>';
        c +=    '</tr>';
    });
    c +=    '</tbody>';
    c +=    '<tfoot class="font-weight-bold">';
    c +=        '<tr>';
    c +=            '<td>Total:</td>';
    c +=            '<td>S/ ' + total + '</td>';
    c +=        '</tr>'
    c +=    '</tfoot>';
    c += '</table>'

    $("#contenido-modal").append(c);
}

function confirmarCompra() {
    limpiarCarrito();
    $("#txtNombres").val("");
    $("#txtEmail").val("");
}
