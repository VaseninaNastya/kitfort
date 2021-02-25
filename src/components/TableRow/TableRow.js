import "./TableRow.module.scss";
import create from "../../utils/create.utils.js";

class TableRow {
  constructor(data, headerRow) {
    this.data = data;
    this.headerRow = headerRow
  }
  generateLayout() {
    const tableHeader_row = create("tr", "table_row");
    for (let i = 0; i < this.data.length; i++) {
      //if(typeof this.data[i][1] != "object"){
        const tableHeader_cell = create("td", "table_cell", String(this.data[i][this.headerRow]));
        tableHeader_row.append(tableHeader_cell);
     // }
    }
    return tableHeader_row;
  }
}
export default TableRow;
