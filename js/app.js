// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('cursos');







//Listeners
cargarEventListeners();

function cargarEventListeners() {
    //this works when you click on "Add to Cart"
    cursos.addEventListener('click', comprarCurso);
}






//Functions
    //Function that adds the item at the Cart

function comprarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;

        console.log(curso);
    }
}
