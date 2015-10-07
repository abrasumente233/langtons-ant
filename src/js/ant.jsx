(function() {
    'use strict';

    const height     = 50,
          width      = 70,
          center     = {'x': Math.floor(width/2), 'y': Math.floor(height/2)},
          delay      = 100,
          directions = ['top', 'right', 'bottom', 'left'];

    let SquareLattice = React.createClass({
        getInitialState: function() {
            return {
                antX: center.x,
                antY: center.y,
                antDirection: 3 // Default direction is left
            };
        },
        componentDidMount: function() {
            let move = function() {

                let ant = document.getElementsByClassName('ant')[0],
                    className = ant.getAttribute('class'),
                    right = className.indexOf('white') > -1;

                // 不用理解这里的意思，知道白右转黑左转就行了！！！
                let direction = right ? (this.state.antDirection + 1) % 4
                        : ((this.state.antDirection - 1 === -1) ? 3 : this.state.antDirection - 1),
                    x = direction % 2 !== 0 ? (direction === 1 ? this.state.antX + 1 : this.state.antX - 1)
                        : this.state.antX,
                    y = direction % 2 === 0 ? (direction === 0 ? this.state.antY + 1 : this.state.antY - 1)
                        : this.state.antY;

                this.setState({
                    antX: x,
                    antY: y,
                    antDirection: direction
                });

                setTimeout(move, delay);
            }.bind(this);
            setTimeout(move, delay);
        },
        render: function() {
            let rows = [];
            for (let y = 0; y < height; y++) {
               let cells = [];
               for (let x = 0; x < width; x++) {
                   cells[x] = <Cell ant={x === this.state.antX && y === this.state.antY} />;
               }
               rows[y] = <div className="row">{cells}</div>;
            }

            return <div>{rows}</div>;
       }
    });

    let Cell = React.createClass({
        propTypes: {
          ant:  React.PropTypes.bool.isRequired
        },
        getInitialState: function() {
            let ant = this.props.x == center.x && this.props.y == center.y,
                status = 'white';
            return {status: status, ant: ant};
        },
        render: function () {
            let cx = React.addons.classSet;
            let classes = cx('cell', this.state.status, this.props.ant ? 'ant' : '');
            if (this.props.ant) {
                console.log('ok');
            }
            return <div className={classes}></div>;
        }
    });

    React.render(<SquareLattice />, document.getElementById('content'));
})();