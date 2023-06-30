/** asignación de variables */

const carrito = document.getElementById('carrito');
const bodycarrito = document.querySelector('tbody');
const footerCarrito = document.querySelector('tfoot');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('.lista-cursos');

/** Arreglo para los cursos que se esten seleccionando por el usuario */
let arregloCarrito = [];

cargarEventos();
/** Método para llamar a las demas funciones que se ejecutaran en el carrito */
function cargarEventos(){
    //adEvenlistener

    listaCursos.addEventListener('click', seleccionarCurso);


}

/** Método para saber que curso seleccionó el usuario */
function seleccionarCurso(e){
    //Validar que el hipervinculop no genere la redirección
    //PreventDefault = es un método que cancela la acción de un elemento html
    e.preventDefault()

    //condicionamos que el usuario dio click en el boton
    //classList.contains verifica si existw una clase en html
    if(e.target.classList.contains('agregar-carrito')){

        console.log(e.target.parentElement.parentElement);
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Curso Agregado',
            showConfirmButton: false,
            timer: 1500
          })
    }

}

//metodo para almacenar los valores del curso en un arreglo
function leerDatosCurso(curso){
    //console.log(curso)

    const objetoCurso = {
        imagen: curso.querySelector('img').src, //capturando la dirección de la imagen
        titulo: curso.querySelector('h5').textContent, //capturando el texto del h5
        precio: curso.querySelector('.precio').textContent, //$15.00
        id: curso.querySelector('a').getAttribute('data-id'), //sacando el valor que hay dentro del data-id
        cantidad: 1
    }

    //verificar si el curso ya existe en el arreglo
    // some => metodo que retorna si la condición se cumple en algún elemento
    const existe_curso = arregloCarrito.some(curso => curso.id === objetoCurso.id);
    console.log(existe_curso);
    //iterando arreglo para condicionar que curso vamos a actualizar
    if(existe_curso){
        //incrementando
        arregloCarrito.map(curso =>{
            if(curso.id === objetoCurso.id){
                curso.cantidad += 1;
                return curso;
            }else{
                return curso;
            }
        })

    }else{
        arregloCarrito.push(objetoCurso)
    }

    

    //agregando el curso en un arreglo
    //push => agrega un elemento al arreglo de ultimo

    console.table(arregloCarrito);
}


function guardarPedido(){


}