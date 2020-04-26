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

    getGif(searchingText) { // 1.
      return new Promise(
        function(resolve, reject) {
          let url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
          let xhr = new XMLHttpRequest();  // 3.
          xhr.onload = function() {
            if (xhr.status === 200) {
              let data = JSON.parse(xhr.responseText).data; // 4.
              let gif = {  // 5.
                url: data.fixed_width_downsampled_url,
                sourceUrl: data.url
              };
             resolve(gif); // Sukces
            } else {
              reject(new Error(this.statusText)); // Dostaliśmy odpowiedź, ale jest to np 404
            }
          };
          xhr.onerror = function() {
            reject(new Error(
            `XMLHttpRequest Error: ${this.statusText}`));
          };
          xhr.open('GET', url);
          xhr.send();
        }
      );
  }

  handleSearch(searchingText) {  // 1.
    this.setState({
      loading: true,  // 2.
      searchingText: searchingText  
    });
    this.getGif(searchingText)  // 3.
      .then(response => this.setState({
        loading: false,  // 2.
        gif: response
      }))
      .catch(error => console.error('Something went wrong ', error));
  };

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

