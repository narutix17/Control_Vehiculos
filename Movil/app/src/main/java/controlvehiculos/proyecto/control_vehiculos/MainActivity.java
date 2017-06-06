package controlvehiculos.proyecto.control_vehiculos;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;
import android.provider.ContactsContract;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.ListViewCompat;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    ListView contenedorListaVehiculos;
    ListView contenedorIconoVehiculo;
    ArrayList<DataItem> listaVehiculos;
    String [] listaPrueba;
    BaseDeDatos baseDeDatos;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        contenedorListaVehiculos = (ListView) findViewById(R.id.listView_ListaVehiculos);
        /*
        listaVehiculos= new ArrayList<DataItem>();
        listaVehiculos.add(new DataItem(1,"My lindo Camaro","Es el mejor",R.drawable.ic_launcher));
        listaVehiculos.add(new DataItem(1,"Hyunday Accent","Es el mejor",R.drawable.ic_launcher));
        listaVehiculos.add(new DataItem(1,"Most Wanted","Es el mejor",R.drawable.ic_launcher));
        listaVehiculos.add(new DataItem(1,"El chiquito","Es el mejor",R.drawable.spark));
//gg
        adapter_listView_listaVehiculos adaptador= new adapter_listView_listaVehiculos(getApplicationContext(),listaVehiculos);
        */
        //contenedorListaVehiculos.setAdapter(adaptador);
        //cargarVehiculos();
        //baseDeDatos=new BaseDeDatos(this);
        //SQLiteDatabase sqLiteDatabase= baseDeDatos.getWritableDatabase();
        //Cursor cursor=baseDeDatos.consultar("select * from color");
        //Toast.makeText(this,String.valueOf(cursor.getCount()),Toast.LENGTH_LONG).show();
        BaseDeDatosExterna baseDeDatosExterna= new BaseDeDatosExterna(this);
        //SQLiteDatabase db=null;


        //baseDeDatosExterna.agregarVehiculo(1,1,"GY5-001","Modelo1","Marca1","Alias 1",2012,5000,null,null);
        contenedorListaVehiculos.setAdapter(baseDeDatosExterna.getAdapterVehiculos());
        /*
        try {
            db=baseDeDatosExterna.getWritableDatabase();
            Toast.makeText(this,String.valueOf(db.isOpen()),Toast.LENGTH_LONG).show();
        }
        catch (SQLiteException ex){

            Toast.makeText(this,ex.getMessage(),Toast.LENGTH_LONG).show();

        }
        Cursor cursor=db.rawQuery("select * from vehiculo",null);
        */
        //Toast.makeText(this,String.valueOf(cursor.getCount()),Toast.LENGTH_LONG).show();




    }

    public void cargarVehiculos() {
        //Cursor cursor= BaseDeDatos.consultar("select * from vehiculo");
        //Toast.makeText(getApplicationContext(),String.valueOf(cursor.getCount()),Toast.LENGTH_SHORT);
    }



}
