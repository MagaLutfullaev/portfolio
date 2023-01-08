import { Component, useEffect, useRef, useState } from 'react';
import Header from '../Project-Header/Project-Header';
import Left from './components/Left';
import './Ticube.sass';

class Ticube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            main: false,
            msecond: 0,
            second: 0,
            minute: 0,
            hour: 0,
            press: false,
            scores: JSON.parse(localStorage.getItem('scores')) || [],
            popup: false,
            leftPopup: '',
        };

        this.process = false;
        this.ms = 0;
        this.time = '00:00';
        this.interval = null;
        this.status = true;
    }

    startInterval = () => {
        const { msecond, second, minute, hour } = this.state;
        if (minute === 60) {
            this.setState({
                minute: 0,
                hour: hour + 1,
            });
        } else if (second === 60) {
            this.setState({
                second: 0,
                minute: minute + 1,
            });
        } else if (msecond === 100) {
            this.ms = 0;
            this.setState({
                msecond: 0,
                second: second + 1,
            });
        } else {
            if (msecond === 99) {
                // this.ms++;
                // return;
            }
            // this.ms++;
            this.setState({
                msecond: msecond + 1,
            });
        }
    };

    reset = () => {
        this.setState({
            msecond: 0,
            second: 0,
            minute: 0,
            hour: 0,
        });
    };

    keyDown = () => {
        this.setState((state) => {
            return {
                main: !state.main,
                press: false,
            };
        });
        if (!this.process) {
            this.status = false;
            this.reset();
            this.process = true;
            this.interval = setInterval(this.startInterval, 10);
        } else {
            this.process = false;
            clearInterval(this.interval);
        }
    };

    componentDidMount = () => {
      console.log(window.innerWidth);
        if (window.innerWidth > 700) {
            document.addEventListener('keydown', (e) => {
                if (e.code === 'Space' && !this.process) {
                    this.setState({ press: true });
                }
            });
            document.addEventListener('keyup', (e) => {
              if (e.code === 'Space') {
                this.keyDown();
              }
            });
        } else {
          document.addEventListener('mousedown', (e) => {
              if (e.code === 'Space' && !this.process) {
                  this.setState({ press: true });
              }
          });
          document.addEventListener('mouseup', (e) => {
              if (e.code === 'Space') {
                  this.keyDown();
              }
          });
        }
    };
    componentDidUpdate = () => {
        this.time = `${
            (this.state.hour
                ? this.state.hour.toString().padStart(2, '0') +
                  ':' +
                  (!this.state.minute ? this.state.minute.toString().padStart(2, '0') + ':' : '')
                : '') +
            (this.state.minute ? this.state.minute.toString().padStart(2, '0') + ':' : '') +
            (this.state.second.toString().padStart(2, '0') + ':') +
            this.state.msecond.toString().padStart(2, '0')
        }`;
        if (!this.process && !this.status) {
            this.status = true;
            const newScores = [...this.state.scores, this.time];
            this.setState({
                scores: newScores,
            });
            localStorage.setItem('scores', JSON.stringify(newScores));
        }
    };
    deleteItem = (index) => {
        const newScores = this.state.scores.filter((item, i) => i !== index);
        this.setState({
            scores: newScores,
        });
        localStorage.setItem('scores', JSON.stringify(newScores));
    };
    popupRender = () => {
        if (this.state.popup) {
            this.setState({ leftPopup: '' });
            setTimeout(() => {
                this.setState({ popup: false });
            }, 200);
        } else {
            this.setState({ popup: true });
            setTimeout(() => {
                this.setState({ leftPopup: 'active' });
            }, 200);
        }
    };

    render() {
        return (
            <div className="ticube">
                <Header />
                <div className="container">
                    <div className="content">
                        <button className="btnPopup" onClick={this.popupRender}>
                            {'list <'}
                        </button>
                        <Left scores={this.state.scores} deleteItem={this.deleteItem} />
                        <div className={this.state.main ? 'main active' : 'main'}>
                            <h1 className={this.state.press ? 'active' : ''}>{this.time}</h1>
                        </div>
                    </div>
                    <div className={`phone ${this.state.popup ? 'active' : ''}`}>
                        <Left
                            className={this.state.leftPopup}
                            scores={this.state.scores}
                            deleteItem={this.deleteItem}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

/* function Ticube() {
  const interval = useRef(null);
  const [main, setMain] = useState(false);
  const [msecond, setMsecond] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState();

  let 
    process = false,
    ms = 0,
    s = 0,
    m = 0,
    h = 0;

  const startInterval = () => {
    if (m === 60) {
      m = 0;
      setMinute(0);
      h++;
      setHour(h);
    } else if (s === 60) {
      s = 0;
      setSecond(0);
      m++;
      setMinute(m);
    } else if (ms === 100) {
      ms = 0;
      setMsecond(0);
      s++;
      setSecond(s);
    } else {
      if (ms === 99) {
        ms++;
        return;
      }
      ms++;
      setMsecond(ms);
    }
  };
  const reset = () => {
    setMsecond(0);
    setSecond(0);
    setMinute(0);
    setHour(0);
    ms = 0;
    s = 0;
    m = 0;
    h = 0;
  };

  const keyDown = (e) => {
    if (e.code === "Space") {
      setMain((main) => !main);
      if (!process) {
        reset();
        process = true;
        interval.current = setInterval(startInterval, 10);
      } else {
        console.log(time);
        process = false;
        // time = [
        //   hour
        //     ? hour.toString().padStart(2, "0") +
        //       ":" +
        //       minute.toString().padStart(2, "0") +
        //       ":"
        //     : "",
        //   minute ? minute.toString().padStart(2, "0") + ":" : "",
        //   second.toString().padStart(2, "0") + ":",
        //   msecond.toString().padStart(2, "0"),
        // ];
      

        // localStorage.setItem("scores", time);
        clearInterval(interval.current);
      }
    }
  };
  let time = `${hour ? hour.toString().padStart(2, "0") + (!minute ? minute.toString().padStart(2, "0") : '') : ''}${minute ? minute.toString().padStart(2, "0") + ":" : ""}${second.toString().padStart(2, "0") + ":"}${msecond.toString().padStart(2, "0")}`

  // if (process) {
    console.log(time);
  // } 
  // let time = [
  //   hour
  //     ? hour.toString().padStart(2, "0") +
  //       ":" +
  //       minute.toString().padStart(2, "0") +
  //       ":"
  //     : "",
  //   minute ? minute.toString().padStart(2, "0") + ":" : "",
  //   second.toString().padStart(2, "0") + ":",
  //   msecond.toString().padStart(2, "0"),
  // ];

  useEffect(() => {
    document.addEventListener("keydown", keyDown);
  }, []);
  return (
    <div className="ticube">
      <Header />
      <div className="container">
        <div className="content">
          <Left />
          <div className={main ? "main active" : "main"}>
            <h1>{time}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

*/
export default Ticube;
