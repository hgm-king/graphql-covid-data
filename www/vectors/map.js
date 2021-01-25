import * as d3 from "d3";

class Map {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height, data } = props;

    this.svg = d3
      .select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // turn our geodata into a lovely map
    this.props.path = d3
      .geoPath()
      .projection(
        d3
          .geoConicConformal()
          .parallels([33, 45])
          .rotate([96, -39])
          .fitSize([width, height], data)
      );

    // build a tooltip for our map
    this.props.tooltip = this.svg
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 1);

    this.update();
  }

  update() {
    const {
      svg,
      props: { height, width, data, valueHandler, tooltip, path },
    } = this;

    console.log(data.features);

    svg
      .selectAll("path")
      .data(data.features)
      .join((enter) =>
        enter
          .append("path")
          .attr("d", path)
          .attr("fill", "#404040")
          .attr("stroke", "#f0f0f0")
          .attr("d", path)
      );
  }
}

export default Map;