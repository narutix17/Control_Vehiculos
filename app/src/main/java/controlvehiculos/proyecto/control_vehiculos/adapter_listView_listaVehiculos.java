package controlvehiculos.proyecto.control_vehiculos;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

/**
 * Created by User on 03/06/2017.
 */

public class adapter_listView_listaVehiculos extends BaseAdapter {
    Context contexto;
    List<DataItem> listaObjetos;

    public adapter_listView_listaVehiculos(Context context, List<DataItem> listaObjetos) {
        this.contexto = context;
        this.listaObjetos = listaObjetos;
    }

    @Override
    public int getCount() {
        return listaObjetos.size();
    }

    @Override
    public Object getItem(int position) {
        return listaObjetos.get(position);
    }

    @Override
    public long getItemId(int position) {
        return listaObjetos.get(position).getId();
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        LayoutInflater inflate=LayoutInflater.from(contexto);
        View vista=inflate.inflate(R.layout.itemlistavehiculos,null);

        ImageView imagenItemVehiculo=(ImageView) vista.findViewById(R.id.imagenItemVehiculo);
        TextView tituloItemVehiculo=(TextView) vista.findViewById(R.id.tituloItemVehiculo);
        TextView detalleItemVehiculo=(TextView) vista.findViewById(R.id.detalleItemVehiculo);

        tituloItemVehiculo.setText(listaObjetos.get(position).getTitulo().toString());
        detalleItemVehiculo.setText(listaObjetos.get(position).getDetalle().toString());
        imagenItemVehiculo.setImageResource(listaObjetos.get(position).getImagen());
        //imagenItemVehiculo.setOnClickListener(clickEnImagen);
        imagenItemVehiculo.setOnTouchListener(touch);


        imagenItemVehiculo.setOnClickListener(clickEnImagen);

        return vista;

    }

    public View.OnTouchListener touch= new View.OnTouchListener(){


        @Override
        public boolean onTouch(View v, MotionEvent event) {
            ImageView imagen=(ImageView)v;
            //int alpha=imagen.getImageAlpha();

            switch (event.getAction()) {
                case MotionEvent.ACTION_DOWN: {
                    //Toast.makeText(v.getContext(),"PRESIONA",Toast.LENGTH_LONG).show();

                    imagen.setImageAlpha(100);
                    break;
                }

                case MotionEvent.ACTION_CANCEL:{
                    imagen.setImageAlpha(255);

                    Toast.makeText(v.getContext(),"CANCELO",Toast.LENGTH_LONG).show();

                    break;
                }



                case MotionEvent.ACTION_UP:{
                    imagen.setImageAlpha(255);
                    Toast.makeText(v.getContext(),"sALE",Toast.LENGTH_LONG).show();
                    break;
                }
            }
            return false;
        }
    };

    public View.OnClickListener clickEnImagen=new View.OnClickListener() {
        @Override
        public void onClick(View v) {

            //ImageView imagen=(ImageView)v;
            //imagen.setImageAlpha(100);
            //Toast.makeText(v.getContext(),"hola",Toast.LENGTH_LONG).show();

        }
    };


}
