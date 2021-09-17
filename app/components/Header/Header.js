import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import Fab from '@material-ui/core/Fab';
import Ionicon from 'react-ionicons';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ReactMic } from 'react-mic';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Button from '@material-ui/core/Button';
import styles from './header-jss';
import SearchUi from '../Search/SearchUi';
import UserMenu from './UserMenu';

const elem = document.documentElement;
class Header extends React.Component {
  state = {
    open: false,
    fullScreen: false,
    turnDarker: false,
    showTitle: false,
    openMicro: false,
    record: false,
    isDone: false,
    showText: false,
  };

  // Initial header style
  flagDarker = false;

  flagTitle = false;

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  checkTimeOut = () => {
    setTimeout(
      () => this.setState({ isDone: true, record: false, showText: true }),
      3000
    );
    // this.stopRecording();
  };

  handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = scroll > 30;
    const newFlagTitle = scroll > 40;
    if (this.flagDarker !== newFlagDarker) {
      this.setState({ turnDarker: newFlagDarker });
      this.flagDarker = newFlagDarker;
    }
    if (this.flagTitle !== newFlagTitle) {
      this.setState({ showTitle: newFlagTitle });
      this.flagTitle = newFlagTitle;
    }
  };

  openFullScreen = () => {
    this.setState({ fullScreen: true });
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  closeFullScreen = () => {
    this.setState({ fullScreen: false });
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  turnMode = (mode) => {
    const { changeMode } = this.props;
    if (mode === 'light') {
      changeMode('dark');
    } else {
      changeMode('light');
    }
  };

  handleClickOpen = () => {
    this.setState({ openMicro: true });
  };

  startRecording = () => {
    this.setState({ record: true });
    this.checkTimeOut();
  };

  stopRecording = () => {
    this.setState({ record: false });
  };

  setNotDone = () => {
    this.setState({ isDone: false });
  };

  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }

  onRedirect = () => {
    window.location.href = 'http://localhost:3001/app/ui/card-papper';
  };

  render() {
    const {
      classes,
      toggleDrawerOpen,
      margin,
      position,
      gradient,
      mode,
      title,
      openGuide,
      history,
    } = this.props;
    const {
      fullScreen, open, turnDarker, showTitle, openMicro
    } = this.state;

    const setMargin = (sidebarPosition) => {
      if (sidebarPosition === 'right-sidebar') {
        return classes.right;
      }
      return classes.left;
    };

    return (
      <AppBar
        className={classNames(
          classes.appBar,
          classes.floatingBar,
          margin && classes.appBarShift,
          setMargin(position),
          turnDarker && classes.darker,
          gradient ? classes.gradientBg : classes.solidBg
        )}
      >
        <Toolbar disableGutters={!open}>
          <Fab
            size="small"
            className={classes.menuButton}
            aria-label="Menu"
            onClick={toggleDrawerOpen}
          >
            <MenuIcon />
          </Fab>
          <Hidden smDown>
            <div className={classes.headerProperties}>
              <div
                className={classNames(
                  classes.headerAction,
                  showTitle && classes.fadeOut
                )}
              >
                {fullScreen ? (
                  <Tooltip title="Exit Full Screen" placement="bottom">
                    <IconButton
                      className={classes.button}
                      onClick={this.closeFullScreen}
                    >
                      <Ionicon icon="ios-qr-scanner" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Full Screen" placement="bottom">
                    <IconButton
                      className={classes.button}
                      onClick={this.openFullScreen}
                    >
                      <Ionicon icon="ios-qr-scanner" />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Turn Dark/Light" placement="bottom">
                  <IconButton
                    className={classes.button}
                    onClick={() => this.turnMode(mode)}
                  >
                    <Ionicon icon="ios-bulb-outline" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Show Guide" placement="bottom">
                  <IconButton className={classes.button} onClick={openGuide}>
                    <Ionicon icon="ios-help-circle-outline" />
                  </IconButton>
                </Tooltip>
              </div>
              <Typography
                component="h2"
                className={classNames(
                  classes.headerTitle,
                  showTitle && classes.show
                )}
              >
                {title}
              </Typography>
            </div>
          </Hidden>
          <div className={classes.searchWrapper}>
            <div className={classNames(classes.wrapper, classes.light)}>
              <div className={classes.search}>
                <SearchIcon />
              </div>
              <SearchUi history={history} />
            </div>
          </div>
          <div>
            <IconButton color="inherit" onClick={this.handleClickOpen}>
              <MicIcon className={classes.icon} />
            </IconButton>
          </div>
          {/* <ReactMic
            className="sound-wave"
            strokeColor="#000000"
            backgroundColor="#4FD1C5"
            mimeType="audio/wav"
          /> */}
          <Dialog
            open={openMicro}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div align="center">
              <DialogTitle id="alert-dialog-title">
                {
                  'The system will recognize your voice and navigate you to the desired page'
                }
              </DialogTitle>
              {this.state.record && (
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Please say the name of the page you want to go to!
                  </DialogContentText>
                </DialogContent>
              )}
              {this.state.showText && (
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You want to navigate to page Quiz right?
                  </DialogContentText>
                </DialogContent>
              )}
            </div>

            <div>
              {!this.state.isDone && (
                <ReactMic
                  record={this.state.record}
                  className="sound-wave"
                  onStop={this.onStop}
                  onData={this.onData}
                  strokeColor="#ffffff"
                  backgroundColor="#4FD1C5"
                />
              )}

              {/* <button onClick={this.startRecording} type="button">
                Start
              </button> */}
              {!this.state.isDone && !this.state.record && (
                <div align="center">
                  <Button
                    style={{ margin: '10px' }}
                    variant="contained"
                    color="secondary"
                    onClick={this.startRecording}
                  >
                    Start
                  </Button>
                </div>
              )}

              {this.state.isDone && (
                <div align="center">
                  <Button
                    style={{ margin: '10px' }}
                    variant="contained"
                    color="secondary"
                    onClick={this.onRedirect}
                  >
                    OK
                  </Button>
                  <Button
                    style={{ margin: '10px' }}
                    variant="contained"
                    color="secondary"
                    onClick={this.setNotDone}
                  >
                    Back
                  </Button>
                </div>
              )}
            </div>
          </Dialog>
          <Hidden xsDown>
            <span className={classes.separatorV} />
          </Hidden>
          <UserMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  margin: PropTypes.bool.isRequired,
  gradient: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  openGuide: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
