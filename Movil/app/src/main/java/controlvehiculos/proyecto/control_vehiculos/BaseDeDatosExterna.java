package controlvehiculos.proyecto.control_vehiculos;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;
import android.provider.ContactsContract;
import android.widget.Toast;

import com.readystatesoftware.sqliteasset.SQLiteAssetHelper;

import java.util.ArrayList;

/**
 * Created by User on 05/06/2017.
 */

public class BaseDeDatosExterna extends SQLiteAssetHelper {

    private static final String DATABASE_NAME = "control_vehiculos.db";
    private static final int DATABASE_VERSION = 1;
    public SQLiteDatabase db;
    public Context context;

    public BaseDeDatosExterna(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
        this.context=context;
        try {
            db=getWritableDatabase();

        }
        catch (SQLiteException ex){
            Toast.makeText(this.context,ex.getMessage(),Toast.LENGTH_LONG).show();
        }
    }


    public adapter_listView_listaVehiculos getAdapterVehiculos(){

        ArrayList<DataItem> lista=new ArrayList<DataItem>();
        try {
            Cursor cursor=db.rawQuery("select * from vehiculo",null);

            if (cursor.moveToFirst()){

                lista.add(new DataItem(cursor.getInt(0),cursor.getString(6),cursor.getString(4),R.drawable.ic_launcher));

                while (cursor.moveToNext()){

                    lista.add(new DataItem(cursor.getInt(0),cursor.getString(6),cursor.getString(4),R.drawable.ic_launcher));
                }
            }
        }
        catch (SQLiteException ex){
            Toast.makeText(this.context,ex.getMessage(),Toast.LENGTH_LONG).show();

        }



        adapter_listView_listaVehiculos adapter=new adapter_listView_listaVehiculos(this.context,lista);
        return adapter;

    }

    public long agregarVehiculo(Integer idTipo,Integer idColor,String placa,String modelo,String marca,String alias,Integer año,Integer kilometraje,String imagen,Integer vista){

        ContentValues values= new ContentValues();
        values.put("idTipo",idTipo);
        values.put("idColor",idColor);
        values.put("placa",placa);
        values.put("modelo",modelo);
        values.put("marca",marca);
        values.put("alias",alias);
        values.put("año",año);
        values.put("kilometraje",kilometraje);
        values.put("imagen",imagen);
        values.put("vista",vista);

        long idNewRow=-1;
        try{
            idNewRow=db.insert("vehiculo",null,values);
            Toast.makeText(this.context,"Se agrego con Exito",Toast.LENGTH_LONG).show();

        }
        catch (SQLiteException ex){
            Toast.makeText(this.context,ex.getMessage(),Toast.LENGTH_LONG).show();

        }
        return idNewRow;





    }

    public long agregarServicio(Integer idTipoIntervalo,String nombre,Integer intervalo,Integer ultimoRealizado){
        ContentValues values= new ContentValues();
        values.put("idTipoIntervalo",idTipoIntervalo);
        values.put("nombre",nombre);
        values.put("intervalo",intervalo);
        values.put("ultimoRealizado",ultimoRealizado);


        long idNewRow=-1;
        try{
            idNewRow=db.insert("servicio",null,values);
            Toast.makeText(this.context,"Se agrego con Exito",Toast.LENGTH_LONG).show();

        }
        catch (SQLiteException ex){
            Toast.makeText(this.context,ex.getMessage(),Toast.LENGTH_LONG).show();

        }
        return idNewRow;


    }




}