package models;

import java.util.ArrayList;

public class Servicio {

    private ArrayList<ServicioRealizado> serviciosRealizados;
    private String nombre;
    private String tipoIntervalo;
    private int intervalo;
    private int ultimoRealizado;

    public Servicio(int intervalo, int ultimoRealizado, String nombre, String tipoIntervalo, ArrayList<ServicioRealizado> servicioRealizados){
        this.nombre = nombre;
        this.tipoIntervalo = tipoIntervalo;
        this.intervalo = intervalo;
        this.ultimoRealizado = ultimoRealizado;
        this.serviciosRealizados = servicioRealizados;
    }

    public int obtenerFaltante(int valorActual){
        return ultimoRealizado + intervalo - valorActual;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipoIntervalo() {
        return tipoIntervalo;
    }

    public void setTipoIntervalo(String tipoIntervalo) {
        this.tipoIntervalo = tipoIntervalo;
    }

    public int getIntervalo() {
        return intervalo;
    }

    public void setIntervalo(int intervalo) {
        this.intervalo = intervalo;
    }

    public int getUltimoRealizado() {
        return ultimoRealizado;
    }

    public void setUltimoRealizado(int ultimoRealizado) {
        this.ultimoRealizado = ultimoRealizado;
    }

    public ArrayList<ServicioRealizado> getServiciosRealizados() {
        return serviciosRealizados;
    }

    public void setServiciosRealizados(ArrayList<ServicioRealizado> serviciosRealizados) {
        this.serviciosRealizados = serviciosRealizados;
    }
}
