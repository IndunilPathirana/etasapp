export type Command = {
  name: string;
  locator?: boolean;
  data?: boolean;
  branch?: boolean;
};

export const commands: Command[] = [
  {
    name: "Branch.BasedOnData",
    locator: false,
    data: true,
    branch: true,
  },
  {
    name: "Branch.BasedOnValue",
    locator: false,
    data: true,
    branch: true,
  },
  {
    name: "Branch.OnElementAttribute",
    locator: true,
    data: true,
    branch: true,
  },
  {
    name: "Branch.OnElementText",
    locator: true,
    data: true,
    branch: true,
  },
  {
    name: "Branch.OnElementValue",
    locator: true,
    data: true,
    branch: true,
  },
  {
    name: "Browser.Alerts.Cancel",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.Alerts.OK",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.ExecuteScript",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Browser.Frames.ToChild",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.Frames.ToMainPage",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.Frames.ToParent",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.Frames.ToVisibleChild",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.GetSource",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.Navigate.Back",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.Navigate.Forward",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.Navigate.ToURL",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Browser.Open",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.Quit",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.Switch",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Browser.Validate.Title",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Browser.Validate.URL",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Browser.Windows.Close",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Browser.Windows.Switch",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Checkbox.Check",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Checkbox.Uncheck",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Checkbox.Validate.Checked",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Checkbox.Validate.Unchecked",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Clipboard.ChangeValue",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Clipboard.Clear",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Clipboard.CopyAttribute",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Clipboard.CopyText",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Clipboard.CopyValue",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Clipboard.InsertValue",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Clipboard.PasteToElement",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Clipboard.PasteToExcel",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Clipboard.PasteToReport",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Component.Load",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Dropdown.Select.ByIndex",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Dropdown.Select.ByText",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Dropdown.Select.ByValue",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Dropdown.Validate.Contain",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Dropdown.Validate.ExactlyMatch",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Dropdown.Validate.LooselyMatch",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Dropdown.Validate.Selected",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Element.Click",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Element.CompareCount",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Element.Contains.Attribute",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Element.Contains.Text",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Element.Contains.Value",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Element.Highlight",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Element.IsNotPresent",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Element.IsPresent",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Element.Matches.Attribute",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Element.Matches.Text",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Element.Matches.Value",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Element.PressKey",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Excel.Validate.CellValue",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "File.Upload",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "GoTo.LineNumber",
    locator: false,
    data: false,
    branch: true,
  },
  {
    name: "Mouse.Click",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Mouse.DoubleClick",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Mouse.Hover",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "RadioButton.Select",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "RadioButton.Validate.Selected",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "RadioButton.Validate.Unselected",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Report.Error",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Report.Fail",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Report.Info",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Report.Success",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Screenshot.Capture",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Settings.Set",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Store.Tables.AddNewRow",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Store.Tables.Create",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Store.Tables.Delete",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Store.Tables.InsertRow",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Store.Tables.InsertValue",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Store.Tables.SetDefault",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Store.Tables.WriteToExcel",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "System.GetFromClipboard",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "System.KeyCombo",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "System.KeyPress",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "System.SendToClipboard",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "System.Type",
    locator: false,
    data: true,
    branch: false,
  },
  {
    name: "Table.Init",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Table.SetHeaders",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Table.SetRows",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Table.Validate.ColumnContains",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Table.Validate.RowCount",
    locator: true,
    data: true,
    branch: false,
  },
  {
    name: "Textbox.Clear",
    locator: true,
    data: false,
    branch: false,
  },
  {
    name: "Textbox.Validate.Contain",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Textbox.Validate.Match",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Textbox.Write",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Pause",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.AlertIsPresent",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.ElementIsClickable",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.ElementIsNotVisible",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.ElementIsPresent",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.ElementIsSelected",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.ElementIsVisible",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.ElementsArePersent",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.ElementsAreVisible",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.ElementStateIs",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.ElementTextIs",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.ElementTextIsNot",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.ElementValueIs",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.TitleContains",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "Wait.Until.TitleIs",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "While.Count",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "While.DataExists",
    locator: false,
    data: false,
    branch: false,
  },
  {
    name: "While.End",
    locator: false,
    data: false,
    branch: false,
  },
];
