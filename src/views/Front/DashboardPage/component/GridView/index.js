import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import _ from "lodash";
export default class GridView extends Component {

    generateDOM = () => {
        console.log('this.props.widgets', this.props.widgets)
        return _.map(this.props.widgets, (widget, i) => {
          let option;
          let component;
          if (widget.type === 'CHART33') {
            // option = getBarChart();
             component = (
              <ReactEcharts
                option={option}
                notMerge={true}
                lazyUpdate={true}
                style={{width: '100%',height:'100%'}}
              />
            )
          }else {
            component = (
              <div>{widget.i}</div>
            )
          }
          // else if (l.type === 'line') {
          //   option = getLineChart();
          // }else if (l.type === 'pie') {
          //   option = getPieChart();
          // }

          return (
            <div key={widget.i} data-grid={widget}>
              <span className='remove'>x</span>
              {component}
            </div>
          );
        });
      };
  render() {
    return (
      <div>
      {this.generateDOM()}
      </div>
    );
  }
}