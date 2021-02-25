import "./TableRow.module.scss";
import create from "../../utils/create.utils.js";

class TableRow {
  constructor(data, headerRow, tableRow_className) {
    this.data = data;
    this.headerRow = headerRow;
    this.tableRow_className = tableRow_className
  }
  generateLayout() {
    const tableHeader_row = create("tr", `${this.tableRow_className} table_row`);
    for (let i = 0; i < this.data.length; i++) {
        const tableHeader_cell = create("td", "table_cell", String(this.data[i][this.headerRow]));
        tableHeader_row.append(tableHeader_cell);
    }
    tableHeader_row.childNodes[0].classList.add("table_cell__fixed__first")
    tableHeader_row.childNodes[1].classList.add("table_cell__fixed__second")
    tableHeader_row.childNodes[2].classList.add("table_cell__fixed__third")
    return tableHeader_row;
  }
}
export default TableRow;
