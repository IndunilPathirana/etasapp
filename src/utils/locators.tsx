type Locator = {
  locator_name: string;
  locator_value: string;
};

export const locators: Locator[] = [
  { locator_name: "click_element", locator_value: "//h5[text()='Elements']" },
  { locator_name: "click_textbox", locator_value: "//span[text()='Text Box']" },
  { locator_name: "ele_textbox", locator_value: "//div[text()='Text Box']" },
  { locator_name: "txtbox_username", locator_value: "//input[@id='userName']" },
  {
    locator_name: "txtbox_useremail",
    locator_value: "//input[@id='userEmail']",
  },
  {
    locator_name: "txt_currentaddress",
    locator_value: "//textarea[@id='currentAddress']",
  },
  {
    locator_name: "txt_permanent",
    locator_value: "//textarea[@id='permanentAddress']",
  },
  { locator_name: "btn_submit", locator_value: "//button[text()='Submit']" },
  {
    locator_name: "click_checkbox",
    locator_value: "//span[text()='Check Box']",
  },
  { locator_name: "ele_checkbox", locator_value: "//div[text()='Check Box']" },
  { locator_name: "check_home", locator_value: "//span[text()='Home']" },
  {
    locator_name: "ele_contains",
    locator_value: "//span[text()='You have selected :']",
  },
  {
    locator_name: "click_radiobutton",
    locator_value: "//span[text()='Radio Button']",
  },
  {
    locator_name: "ele_radiobutton",
    locator_value: "//div[text()='Radio Button']",
  },
  { locator_name: "select_yes", locator_value: "//label[@for='yesRadio']" },
  { locator_name: "ele_yes", locator_value: "//span[text()='Yes']" },
  { locator_name: "click_button", locator_value: "//span[text()='Buttons']" },
  { locator_name: "ele_button", locator_value: "//div[text()='Buttons']" },
  {
    locator_name: "click_doubleclick",
    locator_value: "//button[text()='Double Click Me']",
  },
  {
    locator_name: "ele_doubleclick",
    locator_value: "//p[text()='You have done a double click']",
  },
  {
    locator_name: "hover_right",
    locator_value: "//button[text()='Right Click Me']",
  },
  {
    locator_name: "click_clickme",
    locator_value: "//button[text()='Click Me']",
  },
  {
    locator_name: "ele_click",
    locator_value: "//p[text()='You have done a dynamic click']",
  },
  {
    locator_name: "click_frames",
    locator_value: "//div[text()='Alerts, Frame & Windows']",
  },
  {
    locator_name: "click_windows",
    locator_value: "//span[text()='Browser Windows']",
  },
  {
    locator_name: "ele_windows",
    locator_value: "//div[text()='Browser Windows']",
  },
  { locator_name: "click_newtab", locator_value: "//button[text()='New Tab']" },
  {
    locator_name: "btn_newwindow",
    locator_value: "//button[text()='New Window']",
  },
  { locator_name: "click_widgets", locator_value: "//div[text()='Widgets']" },
  { locator_name: "click_menu", locator_value: "//span[text()='Select Menu']" },
  { locator_name: "ele_menu", locator_value: "//div[text()='Select Menu']" },
  {
    locator_name: "dropdown_menu",
    locator_value: "//select[@id='oldSelectMenu']",
  },
  { locator_name: "click_forms", locator_value: "//div[text()='Forms']" },
  {
    locator_name: "click_practiceform",
    locator_value: "//span[text()='Practice Form']",
  },
  {
    locator_name: "txtbox_firstname",
    locator_value: "//input[@id='firstName']",
  },
  { locator_name: "txtbox_lastname", locator_value: "//input[@id='lastName']" },
  {
    locator_name: "txtbox_userEmail",
    locator_value: "//input[@id='userEmail']",
  },
  { locator_name: "radiobtn_select", locator_value: "//label[text()='Male']" },
  {
    locator_name: "txt_usernumber",
    locator_value: "//input[@id='userNumber']",
  },
  {
    locator_name: "clipboard_copy",
    locator_value: "//h5[text()='Student Registration Form']",
  },
  { locator_name: "click_elements", locator_value: "//div[text()='Elements']" },
  {
    locator_name: "click_webtable",
    locator_value: "//span[text()='Web Tables']",
  },
  {
    locator_name: "highlight_text",
    locator_value: "//div[text()='First Name']",
  },
];
