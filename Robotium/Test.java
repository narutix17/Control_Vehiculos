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
 
public void test() throws InterruptedException {
    OpenDrawer();
 
    solo.waitForView(ListView.class);
 
    solo.clickInList(2);
 
    
}
		}
</mainactivity>