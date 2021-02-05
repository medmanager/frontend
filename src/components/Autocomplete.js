import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewPropTypes as RNViewPropTypes,
} from 'react-native';
import { Colors } from '../utils';
import Error from './Error';
import Label from './Label';

// Keep this line for downwards compatibility with RN.
const ViewPropTypes = RNViewPropTypes || View.propTypes;

class Autocomplete extends Component {
  static propTypes = {
    ...TextInput.propTypes,
    /**
     * These styles will be applied to the container which
     * surrounds the autocomplete component.
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Assign an array of data objects which should be
     * rendered in respect to the entered text.
     */
    data: PropTypes.array,
    /**
     * Set to `true` to hide the suggestion list.
     */
    hideResults: PropTypes.bool,
    /*
     * These styles will be applied to the container which surrounds
     * the textInput component.
     */
    inputContainerStyle: ViewPropTypes.style,
    /*
     * Set `keyboardShouldPersistTaps` to true if RN version is <= 0.39.
     */
    keyboardShouldPersistTaps: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    /*
     * These styles will be applied to the container which surrounds
     * the result list.
     */
    listContainerStyle: ViewPropTypes.style,
    /**
     * These style will be applied to the result list.
     */
    listStyle: ViewPropTypes.style,
    /**
     * `onShowResults` will be called when list is going to
     * show/hide results.
     */
    onShowResults: PropTypes.func,
    /**
     * method for intercepting swipe on ListView. Used for ScrollView support on Android
     */
    onStartShouldSetResponderCapture: PropTypes.func,
    /**
     * `renderItem` will be called to render the data objects
     * which will be displayed in the result view below the
     * text input.
     */
    renderItem: PropTypes.func,
    keyExtractor: PropTypes.func,
    /**
     * `renderSeparator` will be called to render the list separators
     * which will be displayed between the list elements in the result view
     * below the text input.
     */
    renderSeparator: PropTypes.func,
    /**
     * renders custom TextInput. All props passed to this function.
     */
    renderTextInput: PropTypes.func,
    listContainerProps: PropTypes.object,
  };

  static defaultProps = {
    data: [],
    keyboardShouldPersistTaps: 'always',
    onStartShouldSetResponderCapture: () => false,
    renderItem: ({ item }) => <Text>{item}</Text>,
    renderSeparator: null,
    renderTextInput: (props) => (
      <TextInput clearButtonMode="always" {...props} />
    ),
    listContainerProps: {},
  };

  constructor(props) {
    super(props);
    this.resultList = null;
    this.textInput = null;

    this.onRefTextInput = this.onRefTextInput.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
  }

  onEndEditing(e) {
    this.props.onEndEditing && this.props.onEndEditing(e);
  }

  onRefTextInput(textInput) {
    this.textInput = textInput;
  }

  /**
   * Proxy `blur()` to autocomplete's text input.
   */
  blur() {
    const { textInput } = this;
    textInput && textInput.blur();
  }

  /**
   * Proxy `focus()` to autocomplete's text input.
   */
  focus() {
    const { textInput } = this;
    textInput && textInput.focus();
  }

  /**
   * Proxy `isFocused()` to autocomplete's text input.
   */
  isFocused() {
    const { textInput } = this;
    return textInput && textInput.isFocused();
  }

  renderResultList() {
    const {
      data,
      listStyle,
      renderItem,
      keyExtractor,
      listContainerProps,
    } = this.props;

    return (
      <View style={[styles.list, listStyle]} {...listContainerProps}>
        {data.map((item) => (
          <Fragment key={keyExtractor(item)}>{renderItem(item)}</Fragment>
        ))}
      </View>
    );
  }

  renderTextInput() {
    const { renderTextInput, style } = this.props;
    const props = {
      style: [styles.input, style],
      ref: this.onRefTextInput,
      onEndEditing: this.onEndEditing,
      ...this.props,
    };

    return renderTextInput(props);
  }

  render() {
    const {
      data,
      label,
      touched,
      error,
      containerStyle,
      hideResults,
      inputContainerStyle,
      listContainerStyle,
      onShowResults,
      onStartShouldSetResponderCapture,
    } = this.props;
    const showResults = data.length > 0;

    // Notify listener if the suggestion will be shown.
    onShowResults && onShowResults(showResults);

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          <Label>{label}</Label>
          {this.renderTextInput()}
        </View>
        {!hideResults && (
          <View
            style={[styles.listContainer, listContainerStyle]}
            onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}>
            {showResults && this.renderResultList()}
          </View>
        )}
        {touched && error && <Error>{error}</Error>}
      </View>
    );
  }
}

const border = {
  borderColor: Colors.gray[300],
  borderRadius: 8,
  borderWidth: 0.5,
};

const inputStyles = {
  backgroundColor: 'white',
  height: 40,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 10,
  paddingBottom: 10,
  minHeight: 40,
  fontSize: 16,
};

const androidStyles = {
  container: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 0,
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    margin: 10,
    marginTop: 0,
  },
};

const iosStyles = {
  container: {
    zIndex: 1,
    marginBottom: 24,
  },
  list: {
    ...border,
    marginTop: 4,
    backgroundColor: 'white',
    borderTopWidth: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3,
    ...border,
    ...inputStyles,
  },
  listContainer: {
    zIndex: 10,
  },
  ...Platform.select({
    android: { ...androidStyles },
    ios: { ...iosStyles },
  }),
});

export default Autocomplete;
