package models;

public class Notificacion {
    private Servicio servicio;
    private int cuandoRealizar;

    public Notificacion(Servicio servicio, int cuandoRealizar){
        this.servicio = servicio;
        this.cuandoRealizar = cuandoRealizar;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }

    public int getCuandoRealizar() {
        return cuandoRealizar;
    }

    public void setCuandoRealizar(int cuandoRealizar) {
        this.cuandoRealizar = cuandoRealizar;
    }

    public void posponerNotificacion(){

    }

    public void eliminarNotificacion(){

    }

    public void aceptarNotificacion(){

    }

}
