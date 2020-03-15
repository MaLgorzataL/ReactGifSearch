let GIPHY_API_URL = 'https://api.giphy.com';
let GIPHY_PUB_KEY = 'a33NM13Xks0t90lJk3Gbc3wfdwIrdbsg';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      searchingText: '',
      gif: {}
     }; 

     this.handleSearch = this.handleSearch.bind(this);
     this.getGif = this.getGif.bind(this);
    }

    getGif(searchingText, callback) {  // 1.
      let url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
      let xhr = new XMLHttpRequest();  // 3.
      xhr.open('GET', url);
      xhr.onload = function() {
          if (xhr.status === 200) {
             let data = JSON.parse(xhr.responseText).data; // 4.
              let gif = {  // 5.
                  url: data.fixed_width_downsampled_url,
                  sourceUrl: data.url,
              };
              callback(gif);  // 6.
          }
      };
      xhr.send();
  }

  handleSearch(searchingText) {  // 1.
    this.setState({
      loading: true  // 2.
    });
    this.getGif(searchingText, function(gif) {  // 3.
      this.setState({  // 4
        loading: false,  // a
        gif: gif,  // b
        searchingText: searchingText  // c
      });
    }.bind(this));
  }

  render() {

    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };

    return (
      <div style={styles}>
        <h1>Wyszukiwarka GIFow!</h1>
        <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
        <Search onSearch={this.handleSearch}/>
        <Gif 
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}/>
      </div>
    );
  }
};

