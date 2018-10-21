const PHOTOS_PER_PAGE = 20;
const ALL_TEXT = 'All Albums';

class FilterPhotos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: this.props.photos,
      selected: ALL_TEXT
    }
  }

  componentDidMount() {
    var socket = io();
    socket.on('new', (photo) => {
      let photos = this.state.photos;
      photos.push(photo);
      this.setState({
        photos: photos,
        selected: this.state.selected
      });
    });
  }

  render() {
    let albums = [ALL_TEXT];
    let photos = [];


    for (let photoNum in this.state.photos) {
      let photo = this.state.photos[photoNum];
      if (!albums.includes(photo.album)){
        albums.push(photo.album);
      }

      if (photo.album === this.state.selected || ALL_TEXT === this.state.selected) {
        photos.push(photo);
      }
    }

    let albumList = [];
    for (let albumNum in albums) {
      let album = albums[albumNum];
      if (album === this.state.selected) {
        albumList.push(<option selected>{album}</option>);
      } else {
        albumList.push(<option>{album}</option>);
      }
    }
    
    console.log(photos);

    return (
      <div>
        <div class="row">
          <div class="col">
          <div class="col-4">
            <b style={{color: 'white'}}>Album</b>
            <select class="form-control" id="sel1" onChange={(event) => this.setState({
              selected: event.target.value
            })} >
              {albumList}
            </select>
          </div>
          </div>
        </div>
        <PhotoList photos={photos} />
      </div>
      );
  }
}

class PhotoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      slides: false
    }
  }

  setPage(pageNum) {
    this.setState({
      page: pageNum,
      slides: this.state.slides
    })
  }

  render() {
    if (this.state.page > (this.props.photos.length / PHOTOS_PER_PAGE) + 1) {
      this.setState({
        page: 1,
        slides: this.state.slides
      });
    }

    const items = this.props.photos.slice(PHOTOS_PER_PAGE * (this.state.page - 1), PHOTOS_PER_PAGE * this.state.page).map((photo) => <PhotoCard photo={photo} />);

    let paginationItems = [];

    for (let i = 0; i < this.props.photos.length / PHOTOS_PER_PAGE; i++) {
      let pageNum = i + 1;
      paginationItems.push(
        <li class={`page-item${this.state.page == pageNum ? ' active' : ''}`}>
          <a class="page-link" onClick={() => this.setPage(pageNum)} href="#">
            {pageNum}
            {
              this.state.page == pageNum ?
                <span class="sr-only">(current)</span>
              :
                ''
            }
          </a>
        </li>
      );
    }

    let pagination = (
      <ul class="pagination">
        <li class={`page-item${this.state.page == 1 ? ' disabled' : ''}`}>
          <a class="page-link" onClick={() => this.setPage(this.state.page - 1)} href="#" tabindex="-1">Previous</a>
        </li>
        {paginationItems}
        <li class={`page-item${this.state.page >= this.props.photos.length / PHOTOS_PER_PAGE ? ' disabled' : ''}`}>
          <a class="page-link" onClick={() => this.setPage(this.state.page + 1)} href="#">Next</a>
        </li>
      </ul>);

    let slideshowComp = this.state.slides ?
        <Slideshow 
          exit={() => {this.setState({
            page: this.state.page,
            slides: false
          })}}
          photos={this.props.photos}
          initSlide={PHOTOS_PER_PAGE * (this.state.page - 1)}/>
      : '';

    return (
      <div class="py-5">
        {slideshowComp}
        <div class="container">
          <div class="row">
            <div class="col">
              {pagination}
            </div>
            <div class="col">
              <button type="button" class="btn btn-primary float-right" onClick={() => {
                this.setState({
                  page: this.state.page,
                  slides: true
                });
                openFullscreen();
              }}>Display Slideshow</button>
            </div>
          </div>
          <div class="row">
            {items}
          </div>
          {pagination}
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
        document.location.href = `/pictures/singleView.html?id=${this.props.photo._id}`
      }>
          <div class="card mb-2 shadow-sm" style={{cursor:'pointer'}}>
              <ImageLoader
                class="card-img-top"
                style={{objectFit: 'contain'}}
                loading={<div height='150 px'></div>}
                src={this.props.photo.fileName}/>
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
Http.onload=(e)=>{
  let photos = JSON.parse(Http.responseText);

  ReactDOM.render(<FilterPhotos photos={photos} />,document.getElementById('root'));
}

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
