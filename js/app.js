// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');





//Listeners
cargarEventListeners();

function cargarEventListeners() {
    //this works when you click on "Add to Cart"
    cursos.addEventListener('click', comprarCurso);
    
    //This delete an item in the shopping cart
    carrito.addEventListener('click', eliminarCurso);

    //This delete all items in the Shopping Cart
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //when you refresh the dom this will show the local storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}





//Functions
    //Function that adds the item at the Cart

function comprarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //this send the selected item data
        leerDatosCurso(curso);
    }
}

    //this reads the data item that you Selected
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);

}

function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=60>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>

        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);

    //This line Storage items in the Cart
    guardarCursoLocalStorage(curso);
}

//this delete the item in Shopping Cart (DOM)
function eliminarCurso(e){
    e.preventDefault();

    let curso,
        cursoId;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);
}

function vaciarCarrito(){
    //Slow Form
    //-----> listaCursos.innerHTML = '';
    //Fast Mode
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }

    return false;
}

//this Storage items in the cart

function guardarCursoLocalStorage(curso){
    let cursos;

    cursos = obtenerCursosLocalStorage();

    //Selected item its added to the array
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos) );

}

//this check if we have elements on local storage
function obtenerCursosLocalStorage(){
    let cursosLS;

    if(localStorage.getItem('cursos')=== null){
        cursosLS = [];
    } else {
        cursosLS = JSON.parse( localStorage.getItem('cursos') );
    }
    return cursosLS;
}

//this prints the items in local storage in the cart

function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(function(curso){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=60>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>

        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        listaCursos.appendChild(row);
    });
}

//THIS DELETE THE ITEM IN LOCAL STORAGE

function eliminarCursoLocalStorage(curso) {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(cursoLs, index){
        if(curso.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}