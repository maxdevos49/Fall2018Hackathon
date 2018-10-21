const PHOTOS_PER_PAGE = 20;

class PhotoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: props.photos,
      page: 1
    }
  }

  componentDidMount() {
    var socket = io();
    socket.on('new', (photo) => {
      let photos = this.state.photos;
      photos.push(photo);
      this.setState({
        photos: photos,
        page: this.state.page
      });
    });
  }

  setPage(pageNum) {
    this.setState({
      photos: this.state.photos,
      page: pageNum
    })
  }

  render() {
    const items = this.state.photos.slice(PHOTOS_PER_PAGE * (this.state.page - 1), PHOTOS_PER_PAGE * this.state.page).map((photo) => <PhotoCard photo={photo} />);

    let paginationItems = [];

    for (let i = 0; i < this.state.photos.length / PHOTOS_PER_PAGE; i++) {
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
        <li class={`page-item${this.state.page >= this.state.photos.length / PHOTOS_PER_PAGE ? ' disabled' : ''}`}>
          <a class="page-link" onClick={() => this.setPage(this.state.page + 1)} href="#">Next</a>
        </li>
      </ul>);

    return (
      <div class="py-5">
        <div class="container">
          {pagination}
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

  ReactDOM.render(<PhotoList photos={photos} />,document.getElementById('root'));
}
