import React from 'react';
import * as d3 from 'd3';

class My_First_React_D3_Library_Component extends React.Component {
  myRef: any;
  dataset: number[];

  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
    this.dataset = [100, 200, 300, 400, 500];
  }

  componentDidMount() {
    let size = 500;
    let svg = d3
      .select(this.myRef.current)
      .append('svg')
      .attr('width', size)
      .attr('height', size);
    let rect_width = 95;
    svg
      .selectAll('rect')
      .data(this.dataset)
      .enter()
      .append('rect')
      .attr('x', (d: any, i: number) => 5 + i * (rect_width + 5))
      .attr('y', (d: number) => size - d)
      .attr('width', rect_width)
      .attr('height', (d: any) => d)
      .attr('fill', 'teal');
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default My_First_React_D3_Library_Component;
