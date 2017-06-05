package controlvehiculos.proyecto.control_vehiculos;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;
import android.widget.Toast;

/**
 * Created by User on 03/06/2017.
 */

public class BaseDeDatos extends SQLiteOpenHelper {
    public static String path="/data/data/controlvehiculos.proyecto.control_vehiculos/databases/";
    public static String nombreBaseDeDatos="control_vehiculos.db";
    public static int version=1;
    public Context context;

    public BaseDeDatos(Context context) {
        super(context, nombreBaseDeDatos , null, version);
        this.context=context;

    }


    //Solo se ejecutara cuando no exista la base de datos. Crea la base de datos con el nombre qeu se le asigno en el constructor y te manda el argumento db de la conexion a esa base de datos.
    @Override
    public void onCreate(SQLiteDatabase db) {
        ContentValues values;
        db.execSQL("CREATE TABLE color (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombre VARCHAR(15) UNIQUE);");
        db.execSQL("INSERT INTO color (id, nombre) VALUES (1, 'rojo')," +
                "(2, 'azul')," +
                "(3, 'anaranjado')" +
                "(4, 'celeste')" +
                "(5, 'verde')" +
                "(6, 'amarillo')" +
                "(7, 'blanco')");
        //values.put("nombre",rojo);



    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }


    public Cursor consultar(String sql){
        SQLiteDatabase db;
        Cursor cursor=null;
        //Toast.makeText(this.context,"ayuda1",Toast.LENGTH_LONG);
        try {
            db=getWritableDatabase();
            cursor=db.rawQuery(sql,null);

        }
        catch (SQLiteException ex){
            Toast.makeText(this.context,ex.getMessage(),Toast.LENGTH_LONG).show();

        }

        return cursor;

    }
}
