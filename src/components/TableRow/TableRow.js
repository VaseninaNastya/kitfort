import "./TableRow.module.scss";
import create from "../../utils/create.utils.js";

class TableRow {
  constructor(data, headerRow, tableRow_className) {
    this.data = data;
    this.headerRow = headerRow;
    this.tableRow_className = tableRow_className;
  }
  generateLayout() {
    const tableHeader_row = create(
      "tr",
      `${this.tableRow_className} table_row`
    );
    for (let i = 0; i < this.data.length; i++) {
      
      this.table_cell = create(
        "td",
        "table_cell",
        String(this.data[i][this.headerRow])
      )
      if(!this.headerRow){
        this.table_cell.setAttribute('draggable',"true")
        this.table_cell.classList.add("tableHeader_cell")
      }
      /*if (String(this.data[i][this.headerRow]).indexOf("https")) {
        console.log("kdkdkd");
        this.tableHeader_cell = create(
          "td",
          "table_cell",
          String(this.data[i][this.headerRow])
        );
      } else {
        this.tableHeader_cell = create(
          "td",
          "table_cell",
          create("img", null, "table_cell_flagImg", null, [
            "src",
            String(this.data[i][this.headerRow]),
          ])
        );
      }*/
      // const tableHeader_cell = create("td", "table_cell", String(this.data[i][this.headerRow]));
      tableHeader_row.append(this.table_cell);
    }
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//надо обязательно вернуть эти стили
    //tableHeader_row.childNodes[0].classList.add("table_cell__fixed__first");
   // tableHeader_row.childNodes[1].classList.add("table_cell__fixed__second");
  //  tableHeader_row.childNodes[2].classList.add("table_cell__fixed__third");
    return tableHeader_row;
  }
}
export default TableRow;
