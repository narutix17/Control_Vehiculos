package controlvehiculos.proyecto.control_vehiculos;

import android.provider.ContactsContract;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.ListViewCompat;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    ListView contenedorListaVehiculos;
    ListView contenedorIconoVehiculo;
    ArrayList<DataItem> listaVehiculos;
    String [] listaPrueba;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        contenedorListaVehiculos = (ListView) findViewById(R.id.listView_ListaVehiculos);
        listaVehiculos= new ArrayList<DataItem>();
        listaVehiculos.add(new DataItem(1,"My lindo Camaro","Es el mejor",R.drawable.ic_launcher));
        listaVehiculos.add(new DataItem(1,"Hyunday Accent","Es el mejor",R.drawable.ic_launcher));
        listaVehiculos.add(new DataItem(1,"Most Wanted","Es el mejor",R.drawable.ic_launcher));
        listaVehiculos.add(new DataItem(1,"El chiquito","Es el mejor",R.drawable.spark));

        adapter_listView_listaVehiculos adaptador= new adapter_listView_listaVehiculos(getApplicationContext(),listaVehiculos);
        contenedorListaVehiculos.setAdapter(adaptador);




    }
}
