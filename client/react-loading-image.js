class ImageLoader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            src: null,
            width: null,
            height: null,
            errMsg: null
        };
    }

    componentWillReceiveProps(nextProps) {
        // reload only when image src is changed.
        if (this.props.src !== nextProps.src)
            this.reload(nextProps);
    }

    componentDidMount() {
        this.reload(this.props);
    }

    reload(props) {
        // initialize
        this.setState({
            isLoading: true,
            isError: false,
            src: null,
            errMsg: null
        });

        const image = new Image();

        image.src = props.src;
        image.onload = () => {
            this.setState({
                src: image.src,
                width: image.width,
                height: image.height,
                isLoading: false,
                isError: false,
                errMsg: null
            });
            if (props.onLoad) {
                props.onLoad(image);
            }
        };
        image.onerror = (err) => {
            this.setState({
                src: null,
                width: null,
                height: null,
                isLoading: false,
                isError: true,
                errMsg: err
            });
            if (props.onError) {
                props.onError(err);
            }
        }
    }

    render() {
        const { loading, error, image, style, className } = this.props;
        const { src, width, height, isLoading, isError, errMsg } = this.state;

        if (loading && isLoading) {
            return this.props.loading;
        } else if (error && isError && errMsg) {
            return this.props.loading;
        } else if (src && image) {
            return this.props.loading;
        } else if (src) {
            return <img
                src={src}
                style={style}
                className={className}
                height='150 px' />
        }

        return null;
    }
}
