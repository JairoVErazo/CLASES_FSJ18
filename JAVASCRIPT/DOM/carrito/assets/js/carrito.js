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

    //Evento de escucha para vaciar carrito
    vaciarCarrito.addEventListener('click', ()=>{
        Swal.fire({
            title: 'Estas seguro de vaciar el carrito?',
            text: "Se eliminaran todos los cursos selecionados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, vaciar carrito!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Se vació el carrito',
                'Ya no tienes ningun curso',
                'success'
              ).then(function(){
                window.location = "index.html";
              })
            }
          })

    })
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
    carritoTabla()
}

//metodo para iterar el arreglo y asignarlo en la tabla
function carritoTabla(){
    limpiarTabala(bodycarrito);
    let total_curso = 0;
    arregloCarrito.map(item=>{
        const tr = document.createElement('tr');

        //slice => cadena, arreglo
        let precio_actualizado = item.precio.substring(1);
        let subTotal = Number(precio_actualizado * item.cantidad)

        tr.innerHTML = `
            <td>
                <img src="${item.imagen}" width="100">
            </td>
            <td>${item.titulo}</td>
            <td>${item.precio}</td>
            <td>${item.cantidad}</td>
            <td>${subTotal}</td>
            <td>
                <a href="#" class="borrar-item" data-id="${item.id}">
            </td>
        `;

      total_curso += subTotal;

        //Agregamos la fila dentro del tbody
        bodycarrito.appendChild(tr)
    })

    //creando fila para el tfoot (asignando el total de cursos)
    limpiarTabala(footerCarrito);
    const fila_foot = document.createElement('tr');
    fila_foot.innerHTML = `
    <td colspan ="4">Total de pedido</td>
    <td>$${total_curso.toFixed(2)}</td>`;
    footerCarrito.appendChild(fila_foot)

}

function limpiarTabala(contenedor){
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}


function guardarPedido(){
    Swal.fire({
        title: 'Estás seguro de guardar el pediod?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar pedido',
        denyButtonText: `No guardar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('El pedido se cargara en tu targeta', '', 'success').then(function(){
            //recarga la pagina index
            window.location = "index.html"
          })
        } else if (result.isDenied) {
          Swal.fire('Cambios no guardados', '', 'info')
        }
      })

}

//metodo para eliminar un curso en especifico
function eliminarItem(e){
  //verificando si la clase 'borrar-item' existe
  if(e.target.classList.contains('borrar-item')){
      //obtener el id del curso
      const cursoId = e.target.getAttribute('data-id');
      console.log(cursoId);
      //filtrar todos los cursos que sean diferentes al id del curso que la persona selecciono
      arregloCarrito = arregloCarrito.filter(curso => curso.id !== cursoId);
      carritoTabla();
  }
}