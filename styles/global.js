const { StyleSheet } = require('react-native');

module.exports = StyleSheet.create({
  // buttons
  default_button: {
    backgroundColor: '#3b82f6',
    height: 50,
  },
  outline_button: {
    borderWidth: 1,
    borderColor: '#3b82f6',
    backgroundColor: '#fff',
    height: 50,
  },

  // inputs
  default_input: {
    height: 50,
  },

  // containers
  default_container: {
    width: '80%',
    padding: 10,
  },

  // wrappers
  default_wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
