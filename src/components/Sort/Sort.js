import "./Sort.module.scss";
import create from "../../utils/create.utils.js";
import icon_triangle from "../../assets/icon_triangle.png";
class Sort {
 constructor(containerData){
    this.containerData = containerData
  }
  generateLayout() {
    this.filter_fromHight = create(
      "img",
      "icon_triangle_fromHight",
      null,
      null,
      ["src", icon_triangle],
      ["data-sort-name", `${this.containerData}`]
    );
    this.filter_fromLow = create("img", 
      "icon_triangle_fromLow", 
      null, 
      null, 
      ["src",
      icon_triangle,
    ],["data-sort-name", `${this.containerData}`]);
    const filter_icons_container = create("div", `filter_icons_container`, [
      this.filter_fromHight,
      this.filter_fromLow,
    ])
    return filter_icons_container
  }
}
export default Sort;
