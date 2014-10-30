package help;

==============================================PROXY=====================================================================

public class Main {
    public static void main(String[] args) {

        Test test1 = (Test) Proxy.newProxyInstance(Main.class.getClassLoader(), new Class[]{Test.class}, new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println("xxxxxxxxxxxxxxxxxxxxxxxx");
                return "";
                Main
            }
        });

        System.out.println(test1.lala("aaa"));
    }


    public static interface Test {
        String lala(String a);
    }
}

============================================UNIVERSAL CONTROLLER===========================================

private Throwable t;

private final static Logger LOGGER=Logger.getLogger(UniversalController.class);

private ApplicationContext springContext;

        {
        try{
        springContext=new ClassPathXmlApplicationContext("spring-config.xml");
        }catch(Throwable t){
        this.t=t;
        LOGGER.error(t.getCause());
        }
        }


@Override
@Transactional
public void service(HttpServletRequest req,HttpServletResponse res)throws ServletException,IOException{
        Action action=actionMap.get(req.getRequestURI());
        try{
        action.showView(req,res);
        }catch(NullPointerException|EvilUserDetectedException|DataSourceException e){
        ControllerEntityUtils.doDataSourceExceptionScenario(e,req,res);
        }

        }

@Override
public void init()throws ServletException{
        springContext=WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext());

        long startTime=System.currentTimeMillis();
        actionMap=Collections.unmodifiableMap(new HashMap<String, Action>(){
        {
        put("/jobs",springContext.getBean(GoToStartPage.class)); // go to start page
        //departments
        put("/deplist",springContext.getBean(GoToDepartmentList.class)); // go to departments list
        put("/depAddOrUpdate",springContext.getBean(GoToAddOrUpdateDepartment.class)); // go to form for update or add department
        put("/doDepAddOrUpdate",springContext.getBean(DoAddOrUpdateDepartment.class)); // execute add or update department and go to department list
        put("/depdeleted",springContext.getBean(DelDepAndGoToDepartmentList.class)); // delete department and go to department list
        //employees
        put("/depempl",springContext.getBean(GoToEmployeeList.class)); //show employees list of department
        put("/empedit",springContext.getBean(GoToAddOrUpdateEmployee.class)); //go to employee add or update form
        put("/empedited",springContext.getBean(DoAddOrUpdateEmployee.class)); //execute add or update employee
        put("/empdel",springContext.getBean(DelEmpAndGoToEmployeeList.class)); //delete employee
        }
        });
        LOGGER.info("Actions have been initialised in ["+(System.currentTimeMillis()-startTime)+"] ms");
        }

=============================================ACTION BEANS===============================================================

<bean id="goToDepartmentList"class="com.aimprosoft.jobs.controller.actions.GoToDepartmentList"scope="prototype"/>
<bean id="delDepAndGoToDepartmentList"class="com.aimprosoft.jobs.controller.actions.DelDepAndGoToDepartmentList"
        scope="prototype"/>
<bean id="goToAddOrUpdateDepartment"class="com.aimprosoft.jobs.controller.actions.GoToAddOrUpdateDepartment"
        scope="prototype"/>
<bean id="doAddOrUpdateDepartment"class="com.aimprosoft.jobs.controller.actions.DoAddOrUpdateDepartment"
        scope="prototype"/>
<bean id="goToEmployeeList"class="com.aimprosoft.jobs.controller.actions.GoToEmployeeList"scope="prototype"/>
<bean id="delEmpAndGoToEmployeeList"class="com.aimprosoft.jobs.controller.actions.DelEmpAndGoToEmployeeList"
        scope="prototype"/>
<bean id="goToAddOrUpdateEmployee"class="com.aimprosoft.jobs.controller.actions.GoToAddOrUpdateEmployee"
        scope="prototype"/>
<bean id="doAddOrUpdateEmployee"class="com.aimprosoft.jobs.controller.actions.DoAddOrUpdateEmployee"
        scope="prototype"/>