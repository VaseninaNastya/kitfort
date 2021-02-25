import "./Table.module.scss";
import create from "../../utils/create.utils.js";

import TableRow from "../TableRow/TableRow.js";
class Table {
  constructor(tableHeadreData, tableBodyData) {
    this.tableHeadreData = tableHeadreData;
    this.tableBodyData = tableBodyData;
  }
  generateLayout() {
    const tableHeaderData = [];
    this.tableHeadreData.map((item) => {
      tableHeaderData.push([item, ""]);
    });
    const tableHeader = new TableRow(tableHeaderData, 0, "tableRow_header");
    const tableContainer = create(
      "div",
      "table_container",
      tableHeader.generateLayout()
    );
    for (let i = 0; i < this.tableBodyData.length; i++) {
      const tableRow = new TableRow(this.tableBodyData[i], 1, "tableRow_body");
      tableContainer.append(tableRow.generateLayout());
    }
    return tableContainer;
  }
  addStickyStyle() {
    console.log(
      "ширина",
      document.querySelector(".table_cell__fixed__first").offsetWidth
    );
    Array.from(document.querySelectorAll(".table_cell__fixed__second")).forEach((item)=>{
      item.style.left = `${
        document.querySelector(".table_cell__fixed__first").offsetWidth
      }px`;
    })

    Array.from(document.querySelectorAll(".table_cell__fixed__third")).forEach((item)=>{
      item.style.left = `${
        document.querySelector(".table_cell__fixed__first").offsetWidth + 
        document.querySelector(".table_cell__fixed__second").offsetWidth
      }px`;
    })


    console.log(
      "sss",
      `${document.querySelector(".table_cell__fixed__first").offsetWidth}px`
    );

  }
}
export default Table;
