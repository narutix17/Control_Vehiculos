package controlvehiculos.proyecto.control_vehiculos;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

/**
 * Created by User on 03/06/2017.
 */

public class BaseDeDatos  {

    public static String nombreBaseDeDatos="control_vehiculos";


    public static Cursor consultar(String query,String[] args){
        SQLiteDatabase db=SQLiteDatabase.openDatabase(nombreBaseDeDatos,null,SQLiteDatabase.OPEN_READWRITE);

        Cursor cursor=db.rawQuery(query,args);
        db.close();
        return cursor;
    }




    public static Cursor consultar(String query){

        SQLiteDatabase db=SQLiteDatabase.openDatabase(nombreBaseDeDatos,null,SQLiteDatabase.OPEN_READWRITE);

        Cursor cursor=db.rawQuery(query,null);
        db.close();
        return cursor;
    }

    public static void insertar(String query,String args[]){
        SQLiteDatabase db=SQLiteDatabase.openDatabase(nombreBaseDeDatos,null,SQLiteDatabase.OPEN_READWRITE);

        Cursor cursor=db.rawQuery(query,args);
        db.close();


    }

}
