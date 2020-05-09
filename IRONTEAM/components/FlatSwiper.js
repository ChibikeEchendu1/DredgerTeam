/**
 * TODO Finish this for optimized Android swiping
 * Inspired by react-native-swiper but based on cross-platform and optimized FlatList
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Platform, Dimensions} from 'react-native';
import MachineListG from './MachineListG';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

const SCREENWIDTH = Dimensions.get('window').width;
const SCREENHEIGHT = Dimensions.get('window').height;

class FlatSwiper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: SCREENWIDTH,
      height: SCREENHEIGHT,
      index: 0,
    };

    this.listRef = null;

    this.onLayout = this.onLayout.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.onRefReady = this.onRefReady.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.scrollToIndex = this.scrollToIndex.bind(this);
  }

  onLayout({
    nativeEvent: {
      layout: {width, height},
    },
  }) {
    this.setState({
      width,
      height,
    });
  }

  onTouchStart() {
    console.log('onTouchStart');
    this.props.onTouchStart();
  }

  onTouchEnd() {
    console.log('onTouchEnd');
    this.props.onTouchEnd();
  }

  onScrollEnd({
    nativeEvent: {
      contentOffset: {x},
    },
  }) {
    console.log('onScrollEnd');
    const newIndex = this.state.width > 0 ? Math.ceil(x / this.state.width) : 0;

    if (newIndex !== this.state.index) {
      this.setState(
        {
          index: newIndex,
        },
        () => {
          this.props.onIndexChange(newIndex);
        },
      );
    }
  }

  onRefReady(reference) {
    reference && (this.listRef = reference);
  }

  getItemLayout(data, index) {
    return {
      length: this.state.width,
      offset: this.state.width * index,
      index,
    };
  }

  scrollToIndex(index) {
    console.log('scrollToIndex');
    this.listRef && this.listRef.scrollToIndex({index});

    /**
     * Android hack to manually trigger onScrollEnd
     * It doesn't trigger when manually scrolling
     * <3 Android
     */

    Platform.OS == 'android' &&
      this.onScrollEnd({
        nativeEvent: {
          contentOffset: {
            x: index * this.state.width,
          },
        },
      });
  }

  renderItem({item, index}) {
    const {
      state: {width, height},
    } = this;
    const itemWrapperStyle = {
      width,
      height,
    };

    return (
      <View style={itemWrapperStyle}>{this.props.renderItem(item, index)}</View>
    );
  }

  renderRow(item) {
    return (
      <MachineListG
        sites={this.props.sites}
        navigation={this.props.navigation}
        item={item}
      />
    );
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        onLayout={this.onLayout}
        data={this.props.data}
        extraData={this.props.extraData}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={() => console.log('onScrollBeginDrag')}
        onScrollEndDrag={() => console.log('onScrollEndDrag')}
        onMomentumScrollBegin={() => console.log('onMomentumScrollBegin')}
        onScrollShouldSetResponder={() =>
          console.log('onScrollShouldSetResponder')
        }
        onStartShouldSetResponder={() =>
          console.log('onStartShouldSetResponder')
        }
        onStartShouldSetResponderCapture={() =>
          console.log('onStartShouldSetResponderCapture')
        }
        onResponderGrant={() => console.log('onResponderGrant')}
        onResponderReject={() => console.log('onResponderReject')}
        onResponderRelease={() => console.log('onResponderRelease')}
        onResponderTerminate={() => console.log('onResponderTerminate')}
        onResponderTerminationRequest={() =>
          console.log('onResponderTerminationRequest')
        }
        onScroll={() => console.log('onScroll')}
        keyExtractor={this.props.itemKeyExtractor}
        getItemLayout={this.getItemLayout}
        ref={this.onRefReady}
        renderItem={({item}) => this.renderRow(item)}
      />
    );
  }
}

FlatSwiper.propTypes = {
  data: PropTypes.array.isRequired,
  extraData: PropTypes.any,
  onTouchStart: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onIndexChange: PropTypes.func,
  itemKeyExtractor: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
};

FlatSwiper.defaultProps = {
  extraData: null,
};

export default FlatSwiper;
