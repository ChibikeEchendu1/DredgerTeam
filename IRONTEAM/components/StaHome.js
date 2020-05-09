import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {GetStats} from '../actions';
import _ from 'lodash';
import {Input, Button, normalize} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {VARIABLES} from '../utils/Variables';
import Normalize from '../utils/Normalize';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
class StaHome extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: ''};
  }

  renderStats() {
    if (this.props.item == 0) {
      return (
        <View>
          <Text style={{color: VARIABLES.Color}}>Scores Line Chart</Text>
          <LineChart
            data={{
              labels: [1, 2, 3, 4, 5, 6],
              datasets: [
                {
                  data: this.props.stats.Scores,
                },
              ],
            }}
            width={Dimensions.get('window').width - normalize(20)} // from react-native
            height={Dimensions.get('window').height / 3 - normalize(20)}
            yAxisLabel=""
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: VARIABLES.Color,
              backgroundGradientFrom: VARIABLES.Color,
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      );
    }
    if (this.props.item == 1) {
      return (
        <View>
          <Text style={{color: VARIABLES.Color}}>Balance Bar Chart</Text>
          <BarChart
            data={{
              labels: [1, 2, 3, 4, 5, 6],
              datasets: [
                {
                  data: this.props.stats.Balances,
                },
              ],
            }}
            width={Dimensions.get('window').width - 20} // from react-native
            height={Dimensions.get('window').height / 3 - 20}
            yAxisLabel="₦"
            yAxisSuffix="k"
            chartConfig={{
              backgroundColor: VARIABLES.Color,
              backgroundGradientFrom: VARIABLES.Color,
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      );
    }
  }

  render() {
    return <View style={{marginTop: 10, flex: 1}}>{this.renderStats()}</View>;
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    opacity: 0.9,
    //borderWidth:5,
    position: 'absolute',
    //flex:1,
    //marginBottom:20,
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    height: '15%',
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    Loader: state.auth.Loader,
    stats: state.auth.stats,
  };
};

export default connect(
  mapStateToProps,
  {GetStats},
)(StaHome);
