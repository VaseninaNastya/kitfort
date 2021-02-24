import "./indexPage.module.scss";
import create from "../../utils/create.utils.js";


class StartPage {
  generateLayout() {

    const container = create("div", "container");
    const wrapper = create("div", "wrapper", container);
    document.body.prepend(wrapper);
  }
}
export default StartPage;