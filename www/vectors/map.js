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
    // .attr("fill", "red");

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
      props: { data, path, colorHandler, onClick },
    } = this;

    console.log("update");

    svg
      .selectAll("path")
      .data(data.features)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("d", path)
            .attr("fill", (d) => colorHandler(d.properties))
            // .attr("stroke", theme.colors.black)
            .on("click", ({ target }) => onClick(target.__data__.properties)),
        (update) =>
          update
            // .transition()
            // .duration(750)
            .attr("d", path)
            .attr("fill", (d) => colorHandler(d.properties))
            // .attr("stroke", theme.colors.black)
            .on("click", ({ target }) => onClick(target.__data__.properties))
      );
  }
}

export default Map;
