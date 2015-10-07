(function() {
    'use strict';

    const height     = 50,
          width      = 70,
          center     = {'x': Math.floor(width/2), 'y': Math.floor(height/2)},
          delay      = 500,
          directions = ['top', 'right', 'bottom', 'left'];

    let SquareLattice = React.createClass({
        getInitialState: function() {

            // initial work of this.state.color
            let color = [];
            for (let x = 0; x < width; x++) {
                color[x] = [];
                for (let y = 0; y < width; y++) {
                    color[x][y] = false; // False means white, true means black
                }
            }

            return {
                antX: center.x,
                antY: center.y,
                antDirection: 3, // Default direction is left,
                color: color
            };
        },
        componentDidMount: function() {
            this.moved = this.props.signal;
            let move = function() {

                let ant = document.getElementsByClassName('ant')[0],
                    className = ant.getAttribute('class'),
                    right = className.indexOf('white') > -1;



                // 不用理解这里的意思，知道白右转黑左转就行了！！！
                let direction = right ? (this.state.antDirection + 1) % 4
                        : ((this.state.antDirection - 1 === -1) ? 3 : this.state.antDirection - 1),
                    x = direction % 2 !== 0 ? (direction === 1 ? this.state.antX + 1 : this.state.antX - 1)
                        : this.state.antX,
                    y = direction % 2 === 0 ? (direction === 0 ? this.state.antY - 1 : this.state.antY + 1)
                        : this.state.antY;

                console.log(direction, x, y);

                this.state.color[this.state.antX][this.state.antY] = !this.state.color[this.state.antX][this.state.antY]

                this.setState({
                    antX: x,
                    antY: y,
                    antDirection: direction
                });

                this.moved.dispatch(direction, x, y);

                setTimeout(move, delay);
            }.bind(this);
            setTimeout(move, delay);
        },
        render: function() {
            let rows = [];
            for (let y = 0; y < height; y++) {
               let cells = [];
               for (let x = 0; x < width; x++) {
                   cells[x] = <Cell ant={x === this.state.antX && y === this.state.antY} color={this.state.color[x][y] ? 'black' : 'white'} />;
               }
               rows[y] = <div className="row">{cells}</div>;
            }

            return <div>{rows}</div>;
       }
    });

    let Cell = React.createClass({
        propTypes: {
            ant:  React.PropTypes.bool.isRequired,
            color: React.PropTypes.string.isRequired
        },
        getInitialState: function() {
            let ant = this.props.x == center.x && this.props.y == center.y,
                status = 'white';
            return {status: status, ant: ant};
        },
        render: function () {
            let cx = React.addons.classSet;
            let classes = cx('cell', this.props.color, this.props.ant ? 'ant' : '');
            if (this.props.ant) {
                console.log('ok');
            }
            return <div className={classes}></div>;
        }
    });

    let Langton = React.createClass({
        render: function() {
            let movedSignal = signals.Signal();
            return <div><SquareLattice signal={movedSignal} /><Scoreboard signal={movedSignal} /></div>;
        }
    });

    let Scoreboard = React.createClass({
        getInitialState: function() {
          return {
              movement: 0,
              direction: -1,
              x: -1,
              y: -1
          };
        },
        onMove: function(direction, x, y) {
            this.setState({
                movement: this.state.movement + 1,
                direction: direction,
                x: x,
                y: y
            });
        },
        componentDidMount: function() {
            this.props.signal.add(this.onMove);
        },
        render: function() {
           return (
               <div id="scoreboard">
                   <p>Movement: {movement} time(s)</p>
               </div>
           );
        }
    });

    React.render(<Langton />, document.getElementById('content'));
})();