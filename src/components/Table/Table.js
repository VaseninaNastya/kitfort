import "./Table.module.scss";
import create from "../../utils/create.utils.js";

import TableRow from "../TableRow/TableRow.js"
class Table {
  constructor(tableHeadreData,tableBodyData){
    this.tableHeadreData = tableHeadreData
    this.tableBodyData = tableBodyData
  }
  generateLayout() {
    console.log("this.tableHeadreData",this.tableHeadreData);
    console.log("this.tableBodyData",this.tableBodyData);
    const tableHeaderData = [] 
    this.tableHeadreData.map((item)=>{
      tableHeaderData.push([item,""])
    })
    const tableHeader = new TableRow(tableHeaderData, 0)
    const tableContainer = create('div', "table_container",tableHeader.generateLayout())
    for (let i = 0; i <this.tableBodyData.length; i++) {
      const tableRow = new TableRow(this.tableBodyData[i], 1)
      tableContainer.append(tableRow.generateLayout())
    }
    return tableContainer
  } 

}
export default Table;