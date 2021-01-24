import * as d3 from "d3";
import { LinearScale } from "../utils/scale-tools";

class Population {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;

    this.svg = d3
      .select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.update();
  }

  update() {
    const {
      svg,
      props: { height, width, data, valueHandler },
    } = this;

    const radius = 14;
    const countHorizontal = Math.floor(width / (2 * radius));
    const countVertical = Math.floor(data.length / countHorizontal);
    const y = (i) => Math.floor(i / countHorizontal);
    const x = (i) => i % countHorizontal;

    const scaleX = LinearScale([0, countHorizontal], [0, width]);
    const scaleY = LinearScale([0, countVertical], [0, height]);

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", (d, i) => radius + scaleY(y(i)))
      .attr("cx", (d, i) => radius + scaleX(x(i)))
      .attr("r", () => radius)
      .attr("fill", valueHandler)
      .attr("stroke-width", "0.5");
  }
}

export default Population;
