import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import * as d3 from "d3";

import Section from "component/section";
import {DatasetContext} from "view/dataset.context";

import {filterDataset} from "utils";

function Histogram() {
  const [state] = useContext(DatasetContext);
  const [margin] = useState(() => ({top: 10, right: 30, bottom: 30, left: 40}));
  const [width] = useState(() => 460 - margin.left - margin.right);
  const [height] = useState(() => 400 - margin.top - margin.bottom);
  const dataset = useMemo<any>(() => filterDataset(state.dataset, state.filter), [state.dataset, state.filter]);
  const x = useMemo(() => d3.scaleLinear()
    .domain([
      +d3.min<any, any>(dataset, datum => +datum.vol_m3_per_ha),
      +d3.max<any, any>(dataset, datum => +datum.vol_m3_per_ha)
    ])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([0, width]), [dataset])
  const histogram = useMemo(() => {
    return d3.histogram()
      .value(function (d: any) {
        return d.vol_m3_per_ha;
      })
      .domain(x.domain() as any)  // then the domain of the graphic
      .thresholds(x.ticks(10))
  }, [x])
  const ref = useRef();

  useEffect(() => {
    if (ref?.current && dataset.length) {
      // append the svg object to the body of the page
      const svg = d3.select(ref.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class", "histogram")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
        .attr("class", "axis-bottom")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)); // then the numbers of bins

      // And apply this function to data to get the bins
      const bins = histogram(dataset as any);

      // Y axis: scale and draw:
      const y = d3.scaleLinear()
        .range([height, 0]);
      y.domain([0, d3.max(bins, function (d) {
        return d.length;
      })]);
      // d3.hist has to be called before the Y axis obviously
      svg.append("g")
        .attr("class", "axis-left")
        .call(d3.axisLeft(y));

      // append the bar rectangles to the svg element
      const selection = svg.selectAll("rect.datum")
        .data(bins);

      appendRect(selection.enter(), x, y);

      return () => {
        svg.remove();
      }
    }
  }, []);

  useEffect(() => {
    const bins = histogram(dataset as any);
    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(bins, function (d) {
        return d.length;
      })]);

    d3.select(ref.current)
      .select("g.axis-bottom")
      .call(d3.axisBottom(x));

    d3.select(ref.current)
      .select("g.axis-left")
      .call(d3.axisLeft(y));

    const rects = d3.select(ref.current)
      .select("g.histogram")
      .selectAll("rect.datum")
      .data(bins);

    rects.exit()
      .remove();

    updateRect(d3.select(ref.current), x, y);

    appendRect(rects.enter(), x, y);
  }, [dataset]);

  return (
    <Section>
      <h2>Histogram</h2>
      <svg ref={ref}/>
    </Section>
  );

  function appendRect(selection, x, y) {
    selection.append("rect")
      .attr("class", "datum")
      .attr("x", 1)
      .attr("transform", function (d) {
        return "translate(" + x(d.x0) + "," + y(d.length) + ")";
      })
      .attr("width", function (d) {
        return x(d.x1) - x(d.x0) - 1;
      })
      .attr("height", function (d) {
        return height - y(d.length);
      })
      .style("fill", "#69b3a2");
  }

  function updateRect(selection, x, y) {
    selection.selectAll("rect.datum")
      .attr("transform", function (d) {
        return "translate(" + x(d.x0) + "," + y(d.length) + ")";
      })
      .attr("width", function (d) {
        return x(d.x1) - x(d.x0) - 1;
      })
      .attr("height", function (d) {
        return height - y(d.length);
      });
  }
}

export default Histogram;
