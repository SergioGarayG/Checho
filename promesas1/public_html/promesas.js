/*
 * retirna un nuevo objeto promesa, mismo que recibe como constructor una 
 * unción anónima JAVA que a su vez contiene dos parametros para conocer
 * los resultados de la ejecución de la promesa: resolve si el resultado
 * fue positivo y reject si el resultado es de error
 */
function TareaAsincrona1(parametro){
    //retorna el objeto, no necesita el handle del objeto
    return new Promise(function(resolve, reject){
        //simula que esta haciendo alguna tarea y espera que presione ok
        console.log("Haciendo algo asincronico");

        //si parametro es true se asume que la tarea sincrona
        //se realizó con éxito, caso contrario pues... obvio
        if(parametro){
            resolve("Tarea asincrona terminada ok 0");
        }
        else{
            reject("Tarea asincrona terminada con error 1");
        }                    
    });                            
}

/*
 * recibe un formulario html como parámetro que simula la información que 
 * será procesada por la promesa (TareaAsincrona1)
 */
function PromesaSola(parametro){
    var VoF= false;
    var frm= parametro;
    if (frm.VerdaderoFalso.value== "Exito")
        VoF= true;

    TareaAsincrona1(VoF)
        .then (function() 
                {
                    alert("Terminó la Promesa con ok\n\
                           ahora se hace lo que se quiera\n\
                           generalmente llamar a otra funcion");
                }
              )
        .catch (function() {alert("Terminó la Promesa con Error");})
}

/*
 * similar a la función TareaAsincrona1 con la diferencia que muestra el llamado
 * concatenado o encadenado o continuo de la promesa
 */
function PromesaAnidada(parametro){
    var VoF= false;
    var frm= parametro;
    if (frm.VerdaderoFalso.value== "Exito")
        VoF= true;

    TareaAsincrona1(VoF)
        .then(function(){alert("promesa 1");})
        .then(function(){alert("promesa 2");})
        .then(function(){alert("promesa 3");})
        .catch (function() {alert("Terminó la Promesa con Error");})
}   

/*
 * muestra el uso de datos retornados por la ejecución de la promesa
 */
function PromesaDato(parametro){
    var VoF= false;
    var frm= parametro;
    if (frm.VerdaderoFalso.value== "Exito")
        VoF= true;

    TareaAsincrona1(VoF)
        .then (function(dato_ok) 
                {
                    alert("El dato retornado es: "+dato_ok);
                }
              )
        .catch (function(dato_mal) {alert("Terminó la Promesa con Error: "+dato_mal);})
}

/*
 * invoca al metodo fetch que encapsula la manipulacion el canal HTTP para
 * peticiones y respuestas, antes se hacia usando XMLHttpRequest directamente
 */
function EjecutarAJAX() {  
    fetch('ArchivoJSON.json')
      .then(ajaxOK) 
      .catch(ajaxERR);
}

/*
 * la funcion que se ejecuta si la función EjecutarAJAX retorna estatus ok
 * el estatus ok corresponde al codigo 200 y los otros son similares a 400 o 500
 * el hecho de recibir un then quiere decir que el codigo se ejecutó bien, pero
 * no necesariamente que nos retorno un código valido para nosotros, por eso 
 * ok representa el status 200 es decir toto ok, y en catch 404 por ejemplo
 * página o recurso no encontrado, 500 error a nivel del server
 */
function ajaxOK(response) {
  console.log('response.ok: ', response.ok);
  if(response.ok) {
    response.text().then(MuestraDato);
  } else {
    showError('status code: ' + response.status);
  }
}

/*
 * muestra el valor retornado por la Promese
 */
function MuestraDato(txt) {
  console.log('Se recibe un texto en formato JSON: ', txt);
  document.getElementById("json").value= txt;
}

/*
 * la función que se ejecuta si la función EjecutarAJAX retorna con error
 */
function ajaxERR(err) { 
  console.log('muestra error', err);
}