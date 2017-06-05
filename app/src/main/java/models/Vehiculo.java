package models;

import java.util.ArrayList;

public class Vehiculo {

    private String placa;
    private String color;
    private String marca;
    private int year;
    private String foto;
    private String identificador;
    private int kilometraje;
    private String tipo;
    private String alias;
    private ArrayList<Servicio> servicios;

    public Vehiculo(String placa, String color, String marca, int year, String foto, String identificador, int kilometraje, String tipo, String alias, ArrayList<Servicio> servicios) {
        this.placa = placa;
        this.color = color;
        this.marca = marca;
        this.year = year;
        this.foto = foto;
        this.identificador = identificador;
        this.kilometraje = kilometraje;
        this.tipo = tipo;
        this.alias = alias;
        this.servicios = servicios;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    public int getKilometraje() {
        return kilometraje;
    }

    public void setKilometraje(int kilometraje) {
        this.kilometraje = kilometraje;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public ArrayList<Servicio> getServicios() {
        return servicios;
    }

    public void setServicios(ArrayList<Servicio> servicios) {
        this.servicios = servicios;
    }

    public float calcularGastos(int ini, int fin){
        return 0;
    }

    public void agregarServicio(Servicio s){

    }

    public void eliminarServicio(Servicio s){

    }

    public void agregarMantenimiento(ServicioRealizado sr){

    }

    public void eliminarMantenimiento(ServicioRealizado sr){

    }

    public void mostrarServiciosARealizar(){

    }

    public void obtenerServiciosMasProntos(){

    }

}
