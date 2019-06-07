import React from 'react';
import {
  Text,
  View,
  ART,
  TouchableWithoutFeedback
} from 'react-native';

const {
  Surface,
  Group,
  Shape,
} = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';

const d3 = {
  scale,
  shape,
};

const colors = [
  "blue",
  "green",
  "yellow",
  "red",
  "orange",
  "purple",
  "brown",
  "black",
  "grey",
  "navy",
  "white",
];

export default class PieChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = { highlightedIndex: 0 };
    this._createPieChart = this._createPieChart.bind(this);
    this._value = this._value.bind(this);
    this._label = this._label.bind(this);
    this._color = this._color.bind(this);
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
  }

  _value(item) { return item.taskTime; }

  _label(item) { return item.taskName; }

  _color(index) { return colors[index]; }

  _createPieChart(index) {

    var arcs = d3.shape.pie()
      .value(this._value)
      (this.props.data);

    var hightlightedArc = d3.shape.arc()
      .outerRadius(this.props.pieWidth / 2 + 10)
      .padAngle(.05)
      .innerRadius(30);

    var arc = d3.shape.arc()
      .outerRadius(this.props.pieWidth / 2)
      .padAngle(.05)
      .innerRadius(30);

    var arcData = arcs[index];
    var path = (this.state.highlightedIndex == index) ?
      hightlightedArc(arcData)
      :
      arc(arcData);

    return path;
  }

  _onPieItemSelected(index) {
    this.setState({ ...this.state, highlightedIndex: index });
  }

  render() {
    const margin = styles.container.margin;
    const x = this.props.pieWidth / 2 + margin;
    const y = this.props.pieHeight / 2 + margin;

    if (this.props.data === undefined || this.props.projectTime === 0 ) {
      return (
        <View>
          <Text>Complete a task in order to view project summary!</Text>
        </View>
      )
    } else {
      return (

        <View width={this.props.width} height={this.props.height}>
          <Surface width={this.props.width} height={this.props.height}>
            <Group x={x} y={y}>
              {
                this.props.data.map((item, index) =>
                  (<Shape
                    key={'pie_shape_' + index}
                    color={this._color(index)}
                    d={this._createPieChart(index)}
                    fill={this._color(index)}
                    stroke={this._color(index)}
                  />)
                )
              }
            </Group>
          </Surface>
          <View
            style={{
              position: 'absolute',
              top: margin,
              left: 2 * margin + this.props.pieWidth
            }}>
            {
              this.props.data.map((item, index) => {
                var fontWeight =
                  this.state.highlightedIndex == index ? 'bold' : 'normal';
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => this._onPieItemSelected(index)}
                  >
                    <View>
                      <Text
                        style={[
                          styles.label,
                          {
                            color: this._color(index),
                            fontWeight: fontWeight
                          },
                        ]}>
                        {this._label(item)}
                        :&nbsp;
                          {this._value(item)}
                        %
                          </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })
            }
            <Text>Total Time: {this.props.projectTime} Minutes</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    margin: 20,
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'normal',
  }
};