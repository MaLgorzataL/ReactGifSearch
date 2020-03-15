class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchingText: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
}

handleChange(event) {
    this.setState({searchingText: event.target.value});

    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
  }

  render() {
    var styles = {
      fontSize: '1.5em',
      width: '90%',
      maxWidth: '350px'
    };

    return (
      <input
        type="text"
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        placeholder="Tutaj wpisz wyszukiwaną frazę"
        style={styles}
        value={this.state.searchText}
      />
    )
  }
};