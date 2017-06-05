package models;


import java.util.Date;

public class ServicioRealizado {

    private String detalle;
    private float precio;
    private Date fechaRealizado;

    public ServicioRealizado(String detalle, float precio, Date fechaRealizado, Servicio servicio){
        this.detalle = detalle;
        this.precio = precio;
        this.fechaRealizado = fechaRealizado;
    }


    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }

    public Date getFechaRealizado() {
        return fechaRealizado;
    }

    public void setFechaRealizado(Date fechaRealizado) {
        this.fechaRealizado = fechaRealizado;
    }

}
