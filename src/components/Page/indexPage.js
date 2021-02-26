import "./indexPage.module.scss";
import create from "../../utils/create.utils.js";
import Table from "../Table/Table.js";
import DataAPI from "../getData/getData.js";
class StartPage {
  async generateLayout() {
    await this.getData();
    const table = new Table(this.tableHeaderData, this.tableBodyData);
    /*const tableData = await table.generateLayout();*/
    const wrapper = create("div", "wrapper"/*, tableData*/);
    document.body.prepend(wrapper);
    table.generateLayout();
  }
  async getData() {
    const API = new DataAPI();
    this.data = await API.getAll();
    const unsortedDataHeaders = Object.entries(this.data[0]);
    this.tableHeaderData = [];
    this.tableBodyData = [];
    this.tableHeaderData.push("№")
    for (let i = 0; i < unsortedDataHeaders.length; i++) {
      if (typeof unsortedDataHeaders[i][1] != "object") {
        this.tableHeaderData.push(unsortedDataHeaders[i][0]);
      }
    }
    for (let i = 0; i < /* this.data.length*/5; i++) {
      const unsortedDataItem = Object.entries(this.data[i]);
      const dataItemWithoutArrays = [];
      for (let i = 0; i < unsortedDataItem.length; i++) {
        if (typeof unsortedDataItem[i][1] != "object") {
          dataItemWithoutArrays.push(unsortedDataItem[i]);
        }
      }
      const tableBodyDataItem = [];
      this.tableHeaderData.map((item) => {
        tableBodyDataItem.push([item, ""]);
      });
     // this.tableHeaderData.push("№")
      tableBodyDataItem.splice(0,1,["№",`${i+1}`]) 
      this.tableHeaderData.map((item) => {
        item[0];
      });
      for (let j = 0; j < dataItemWithoutArrays.length; j++) {
        if (this.tableHeaderData.includes(dataItemWithoutArrays[j][0])) {
          let index = this.tableHeaderData.indexOf(dataItemWithoutArrays[j][0]);
          tableBodyDataItem.splice(index, 1, dataItemWithoutArrays[j]);
        }
      }
      this.tableBodyData.push(tableBodyDataItem);
    }
  }

}
export default StartPage;
