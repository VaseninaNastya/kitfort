import "./Table.module.scss";
import create from "../../utils/create.utils.js";
import TableRow from "../TableRow/TableRow.js";

class Table {
  constructor(tableHeaderData, tableBodyData) {
    this.tableHeaderData = tableHeaderData;
    this.tableBodyData = tableBodyData;
  }
  generateLayout() {
    const tableHeaderData = [];
    this.tableHeaderData.map((item) => {
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
    document.querySelector(".wrapper").append(tableContainer);
    this.addEventListeners();
  }
  sortData() {
    const newTableBodyData = [];
    this.tableBodyData.map((item) => {
      let newItem = [];
      this.tableHeaderData.map((i) => {
        newItem.push(i);
      });
      for (let i = 0; i < item.length; i++) {
        let index = newItem.indexOf(item[i][0]);
        newItem.splice(index, 1, item[i]);
      }
      newTableBodyData.push(newItem);
    });
    this.tableBodyData = newTableBodyData;
  }
  /*addStickyStyle() {
    Array.from(document.querySelectorAll(".table_cell__fixed__second")).forEach(
      (item) => {
        item.style.left = `${
          document.querySelector(".table_cell__fixed__first").offsetWidth
        }px`;
      }
    );
    Array.from(document.querySelectorAll(".table_cell__fixed__third")).forEach(
      (item) => {
        item.style.left = `${
          document.querySelector(".table_cell__fixed__first").offsetWidth +
          document.querySelector(".table_cell__fixed__second").offsetWidth
        }px`;
      }
    );
  }*/
  filterFromHight(parametr) {
    this.sortParametrIndex = null;
    this.tableBodyData[0].map((item, index) => {
      if (item.includes(parametr)) {
        this.sortParametrIndex = index;
      }
    });
    this.tableBodyData.sort((a, b) => {
      return a[this.sortParametrIndex][1] > b[this.sortParametrIndex][1]
        ? 1
        : -1;
    });
    for (let i = 0; i < this.tableBodyData.length; i++) {
      this.tableBodyData[i][0][1] = `${i + 1}`;
    }
    document.querySelector(".wrapper").innerHTML = "";
    this.generateLayout();
  }
  filterFromLow(parametr) {
    this.sortParametrIndex = null;
    this.tableBodyData[0].map((item, index) => {
      if (item.includes(parametr)) {
        this.sortParametrIndex = index;
      }
    });
    this.tableBodyData.sort((a, b) => {
      return a[this.sortParametrIndex][1] < b[this.sortParametrIndex][1]
        ? 1
        : -1;
    });
    for (let i = 0; i < this.tableBodyData.length; i++) {
      this.tableBodyData[i][0][1] = `${i + 1}`;
    }
    document.querySelector(".wrapper").innerHTML = "";
    this.generateLayout();
  }
  addEventListeners() {
    document
      .querySelector(".tableRow_header")
      .addEventListener(`mousedown`, (e) => {
        if (e.target.classList.contains("table_cell_headerName")) {
          e.target.classList.add("tableRow_header__selected");
        }
        if (e.target.classList.contains("icon_triangle_fromHight")) {
          this.filterFromHight(e.target.getAttribute("data-sort-name"));
        }
        if (e.target.classList.contains("icon_triangle_fromLow")) {
          this.filterFromLow(e.target.getAttribute("data-sort-name"));
        }
      });
    document
      .querySelector(".tableRow_header")
      .addEventListener(`mouseup`, () => {
        if (document.querySelector(".tableRow_header__selected")) {
          document
            .querySelector(".tableRow_header__selected")
            .classList.remove("tableRow_header__selected");
        }
      });
    document
      .querySelector(".tableRow_header")
      .addEventListener(`dragenter`, (evt) => {
        evt.preventDefault();
        if (evt.target.classList.contains("tableHeader_cell") && evt.target.children[1].innerHTML !="№") {
          this.currentElement = evt.target;
          console.log("this.currentElement",this.currentElement);
        }
        if (this.currentElement) {
          this.isMoveable = this.currentElement.classList.contains(
            `tableHeader_cell`
          );
        }
        if (this.isMoveable) {
          Array.from(
            document.querySelectorAll(".tableHeader_cell__invisible")
          ).forEach((item) => {
            item.classList.remove("tableHeader_cell__invisible");
          });
          this.currentElement.classList.add("tableHeader_cell__invisible");
        }
      });
    document
      .querySelector(".tableRow_header")
      .addEventListener(`dragend`, (e) => {
        if (document.querySelector(".tableRow_header__selected")) {
          this.movedItem = document.querySelector(
            ".tableRow_header__selected"
          ).innerHTML;
          console.log("this.movedItem", this.movedItem);
        }
        if (document.querySelector(".tableHeader_cell__invisible")) {
          this.indexOfCurrent = this.tableHeaderData.indexOf(
            document.querySelector(".tableHeader_cell__invisible").children[1]
              .innerHTML
          );
          console.log("indexOfCurrent",document.querySelector(".tableHeader_cell__invisible").children[0]
          .innerHTML);
        }
        let indexOfMoved = this.tableHeaderData.indexOf(this.movedItem);
        this.tableHeaderData.splice(indexOfMoved, 1);
        this.tableHeaderData.splice(this.indexOfCurrent, 0, this.movedItem);
        if (document.querySelector(".tableHeader_cell__invisible")) {
          document
            .querySelector(".tableHeader_cell__invisible")
            .classList.remove("tableHeader_cell__invisible");
        }
        if (document.querySelector(".tableRow_header__selected")) {
          document
            .querySelector(".tableRow_header__selected")
            .classList.remove("tableRow_header__selected");
        }
        document.querySelector(".wrapper").innerHTML = "";
        this.sortData();
        this.generateLayout();
      });
    document
      .querySelector(".tableRow_header")
      .addEventListener("dblclick", (e) => {
        console.log("ksksksks", e.target);
        if (e.target.classList.contains(`tableHeader_cell`)) {
          e.target.classList.add("table_cell__invisible");
          Array.from(
            document.querySelectorAll(`td[data-info=${e.target.innerHTML}]`)
          ).forEach((item) => {
            item.classList.add("table_cell__invisible");
          });
        }
      });
  }
}
export default Table;
