class PhotoList extends React.Component {
  render() {
    const items = this.props.photos.map((photo) => <PhotoCard photo={photo} />);
    
    return (
      <div class="py-5">
          <div class="container">
              <div class="row">
                {items}
              </div>
          </div>
      </div>
    );
  }
}

class PhotoCard extends React.Component {
  render() {
    const tags = this.props.photo.tag.map((tag) => (
        <div class="btn-group">
            <div class="alert alert-secondary tags">{tag}</div>
        </div>
      ));
    
    return (
      <div class="col-md-3" onClick={() =>
        document.location.href = `/picture/singleView.html?id=${this.props.photo._id}`
      }>
          <div class="card mb-2 shadow-sm" style={{cursor:'pointer'}}>
              <img class="card-img-top" src={this.props.photo.fileName} data-holder-rendered="true" />
              <div class="card-body">
              <h5 class="card-title">{this.props.photo.origFileName}</h5>
              <small class="text-muted">Album: {this.props.photo.album}</small><br/>
              <small class="text-muted">Tags:</small>
                  {tags}
              </div>
          </div>
      </div>
    );
  }
}

const Http = new XMLHttpRequest();
const url='/api/photos';
Http.open("GET", url);
Http.send();
let photos = [];
Http.onload=(e)=>{
  photos = JSON.parse(Http.responseText);

  ReactDOM.render(<PhotoList photos={photos} />,document.getElementById('root'));

  var socket = io();
  socket.on('new', function (photo) {
    photos.push(photo);
    ReactDOM.render(<PhotoList photos={photos} />,document.getElementById('root'));
  });
}
