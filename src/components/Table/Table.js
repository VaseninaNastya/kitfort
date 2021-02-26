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
    this.addStickyStyle();
    this.addEventListeners();
  }
  sortData() {
    const newTableBodyData = [];
    this.tableBodyData.map((item) => {
      let newItem = [];
      this.tableHeaderData.map((i) => {
        newItem.push(i);
      });
      console.log("newItem", newItem);
      for (let i = 0; i < item.length; i++) {
        let index = newItem.indexOf(item[i][0]);
        newItem.splice(index, 1, item[i]);
      }
      newTableBodyData.push(newItem);
    });
    this.tableBodyData = newTableBodyData;
  }
  addStickyStyle() {
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
  }
  addEventListeners() {
    document
      .querySelector(".tableRow_header")
      .addEventListener(`mousedown`, (e) => {
        console.log("dddd", e.target);
        e.target.classList.add("tableRow_header__selected");
      });
    document
      .querySelector(".tableRow_header")
      .addEventListener(`dragenter`, (evt) => {
        evt.preventDefault();
        const activeElement = document.querySelector(
          `.tableRow_header__selected`
        );
        const currentElement = evt.target;
        let isMoveable = currentElement.classList.contains(`tableHeader_cell`);
        if (isMoveable) {
          Array.from(
            document.querySelectorAll(".tableHeader_cell__invisible")
          ).forEach((item) => {
            item.classList.remove("tableHeader_cell__invisible");
          });
          currentElement.classList.add("tableHeader_cell__invisible");
        }
      });
    document
      .querySelector(".tableRow_header")
      .addEventListener(`dragend`, (e) => {
        let movedItem = document.querySelector(".tableRow_header__selected")
          .innerHTML;
        let indexOfCurrent = this.tableHeaderData.indexOf(
          document.querySelector(".tableHeader_cell__invisible").innerHTML
        );
        let indexOfMoved = this.tableHeaderData.indexOf(movedItem);
        this.tableHeaderData.splice(indexOfMoved, 1);
        this.tableHeaderData.splice(indexOfCurrent, 0, movedItem);
        document
          .querySelector(".tableHeader_cell__invisible")
          .classList.remove("tableHeader_cell__invisible");
        document
          .querySelector(".tableRow_header__selected")
          .classList.remove("tableRow_header__selected");
        document.querySelector(".wrapper").innerHTML = "";
        this.sortData();
        this.generateLayout();
      });
    document
      .querySelector(".tableRow_header")
      .addEventListener("dblclick", (e) => {
        if (e.target.classList.contains(`tableHeader_cell`)) {
          e.target.classList.add("table_cell__invisible")
          console.log("e.target.innerHTML",e.target.innerHTML);
          console.log(">>>>>>>>>>>>",Array.from(document.querySelectorAll(`td[data-info=${e.target.innerHTML}]`)));
          Array.from(document.querySelectorAll(`td[data-info=${e.target.innerHTML}]`)).forEach((item)=>{
            item.classList.add("table_cell__invisible")
          })
        }
      });
  }
}
export default Table;
