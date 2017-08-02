import  android.graphics.Point ;
import  android.support.v4.widget.DrawerLayout ;
import  android.test.ActivityInstrumentationTestCase2 ;
import  android.view.Gravity ;
import  android.widget.ListView 

import android.test.ActivityInstrumentationTestCase2;

import com.robotium.solo.Solo;
public class MainTest extends
        ActivityInstrumentationTestCase2<mainactivity> {
 
    private Solo solo;
 
    public MainTest() {
        super(MainActivity.class);
    }
 
    public void setUp() throws Exception {
        solo = new Solo(getInstrumentation(), getActivity());
    }
 
    @Override
    public void tearDown() throws Exception {
        solo.finishOpenedActivities();
    }
 
    public void testBuscarVehiculo(){
    solo.enterText(0,"hcs189");
    solo.enterText(1,"red");
	solo.enterText(2,"MyCar1");
	solo.enterText(1,"Hyundai");
    solo.clickOnButton("Buscar");
    assertTrue(solo.searchText("My Car1"));
    }
     public void testCaseModificarVehiculo() throws Exception {
      String vResult="mycar1";
      EditText vEditText = (EditText) solo.getView(R.id.edit1);
      solo.clearEditText(vEditText);
      solo.enterText(vEditText,"mycar1");
      solo.clickOnButton("modificar");
      assertTrue(solo.searchText(vResult));
      TextView textField = (TextView) solo.getView(R.id.txt1);
       assertEquals(vResult, textField.getText().toString());
   }   

     public void test3() {

            solo.clickOnEditText(0); 

            solo.enterText((EditText) getActivity().findViewById(

                id.activity_add_new_vehiculo),
                            "vehiculo ");
             solo.clickOnEditText(1);
            solo.enterText((EditText) getActivity().findViewById(
                            id.activity_add_new_vehiculo),
                            "Qrt123");
             solo.clickOnEditText(2);
            solo.enterText((EditText) getActivity().findViewById(
                            id.activity_add_new_vehiculo),
                            "red");

          

            solo.clickOnEditText(0);
            solo.searchText(getActivity().getResources().getString(R.string.activity_add_new_vehiculo_color));
            solo.clickOnView(solo.getCurrentEditTexts().get(0));
            solo.enterText(0, "mycar1");
            solo.clickOnView(solo.getCurrentEditTexts().get(0));
            solo.enterText(1, "red");

              solo.clickOnButton(getActivity().getResources().getString(R.string.OK));

             solo.clickOnButton(getActivity().getResources().getString(R.string.OK));

         
            boolean flagOKDatabase=solo.waitForText(getActivity().getResources().getString(R.string.database_success_storing_data),1,120);
            assertEquals("Something wrong happened with the database", true, flagOKDatabase);
        }
   
   
   
   
public void testOpenDrawerFromDragAction() throws InterruptedException {
    Point deviceSize = new Point();
    getActivity().getWindowManager().getDefaultDisplay().getSize(deviceSize);
 
    int screenWidth = deviceSize.x;
    int screenHeight = deviceSize.y;
    int fromX = 0;
    int toX = screenWidth / 2;
    int fromY = screenHeight / 2;
    int toY = fromY;
 
    solo.drag(fromX, toX, fromY, toY, 1);
 
    solo.waitForView(ListView.class);
 
    DrawerLayout drawerLayout = (DrawerLayout) solo.getView(R.id.drawer_layout);
 
    Assert.assertTrue(drawerLayout.isDrawerOpen(Gravity.LEFT));
}


private void OpenDrawer() {
    Point deviceSize = new Point();
    getActivity().getWindowManager().getDefaultDisplay().getSize(deviceSize);
 
    int screenWidth = deviceSize.x;
    int screenHeight = deviceSize.y;
    int fromX = 0;
    int toX = screenWidth / 2;
    int fromY = screenHeight / 2;
    int toY = fromY;
 
    solo.drag(fromX, toX, fromY, toY, 1);
}
 
public void test4() throws InterruptedException {
    OpenDrawer();
 
    solo.waitForView(ListView.class);
 
    solo.clickInList(2);
 
    
}
		}
</mainactivity>