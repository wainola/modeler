class Tarea {
  constructor(nombre, texto, fecha_creacion, fecha_modificacion){
    this.nombre = nombre;
    this.texto = texto;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
  }

  // Getters y Setters
  get Nombre(){
    return this.nombre;
  }
  get Texto(){
    return this.texto;
  }
  get Fecha_creacion(){
    return this.fecha_creacion;
  }
  get Fecha_modificacion(){
    return this.fecha_modificacion;
  }
  set Nombre(nombre){
    this.nombre = nombre;
  }
  set Texto(texto){
    this.texto = texto;
  }
  set Fecha_creacion(fecha){
    this.fecha_creacion = fecha;
  }
  set Fecha_modificacion(fecha){
    this.fecha_modificacion = fecha;
  }

  // Metodo ToString
  toString(){
    return { "nombre": this.nombre, "texto": this.texto, "fecha_creacion": this.fecha_creacion, "fecha_modificacion": this.fecha_modificacion };
  }
}

export default Tarea;
