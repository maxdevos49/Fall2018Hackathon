const SPEED = 4000;

class Slideshow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoAdvance: true,
            slideNum: this.props.initSlide ? this.props.initSlide : 0
        };
    }

    autoAdvance() {
        if (this.state.autoAdvance) {
            this.next();
        }
        setTimeout(() => this.autoAdvance(), SPEED);
    }

    next() {
        this.setState({
            autoAdvance: this.state.autoAdvance,
            slideNum: (this.state.slideNum + 1) % this.props.photos.length
        });
    }

    previous() {
        this.setState({
            autoAdvance: this.state.autoAdvance,
            slideNum: ((this.state.slideNum + this.props.photos.length) - 1) % this.props.photos.length
        });
    }

    componentDidMount() {
        setTimeout(() => this.autoAdvance(), SPEED);
        window.onkeyup = (e) => {
            var key = e.keyCode ? e.keyCode : e.which;

            if (key == 39) {
                // left
                this.next();
            } else if (key == 37) {
                // right
                this.previous();
            } else if (key == 32) {
                // space
                this.setState({
                    autoAdvance: !this.state.autoAdvance,
                    slideNum: this.state.slideNum
                });
            } else if (key == 27) {
                // esc
                this.props.exit();
                closeFullscreen();
            }
            console.log(key);
        }
    }


    render() {
        let slide = this.state.slideNum;
        if (slide >= this.props.photos.length || slide < 0) {
            slide = 0;
            this.setState({
                autoAdvance: !this.state.autoAdvance,
                slideNum: 0
            });
        }
        console.log(`slide num ${slide} length ${this.props.photos.length}`);
        return (
        <div class ="overlay">
            <div class="frame" style={{cursor:'none'}}>
                <img src={this.props.photos[slide].fileName} />
            </div>
            <div class="pause" hidden={this.state.autoAdvance}>
                <img src="https://png.icons8.com/ios/50/ffffff/pause-squared-filled.png" />
            </div>
        </div>)
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }
