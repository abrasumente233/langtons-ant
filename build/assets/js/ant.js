'use strict';

(function () {
    'use strict';

    var height = 50,
        width = 70,
        center = { 'x': Math.floor(width / 2), 'y': Math.floor(height / 2) },
        delay = 100,
        directions = ['top', 'right', 'bottom', 'left'];

    var SquareLattice = React.createClass({ displayName: "SquareLattice",
        getInitialState: function getInitialState() {
            return {
                antX: center.x,
                antY: center.y,
                antDirection: 3 // Default direction is left
            };
        },
        componentDidMount: function componentDidMount() {
            var move = (function () {

                var ant = document.getElementsByClassName('ant')[0],
                    className = ant.getAttribute('class'),
                    right = className.indexOf('white') > -1;

                // 不用理解这里的意思，知道白右转黑左转就行了！！！
                var direction = right ? (this.state.antDirection + 1) % 4 : this.state.antDirection - 1 === -1 ? 3 : this.state.antDirection - 1,
                    x = direction % 2 !== 0 ? direction === 1 ? this.state.antX + 1 : this.state.antX - 1 : this.state.antX,
                    y = direction % 2 === 0 ? direction === 0 ? this.state.antY + 1 : this.state.antY - 1 : this.state.antY;

                this.setState({
                    antX: x,
                    antY: y,
                    antDirection: direction
                });

                setTimeout(move, delay);
            }).bind(this);
            setTimeout(move, delay);
        },
        render: function render() {
            var rows = [];
            for (var y = 0; y < height; y++) {
                var cells = [];
                for (var x = 0; x < width; x++) {
                    cells[x] = React.createElement(Cell, { ant: x === this.state.antX && y === this.state.antY });
                }
                rows[y] = React.createElement("div", { className: "row" }, cells);
            }

            return React.createElement("div", null, rows);
        }
    });

    var Cell = React.createClass({ displayName: "Cell",
        propTypes: {
            ant: React.PropTypes.bool.isRequired
        },
        getInitialState: function getInitialState() {
            var ant = this.props.x == center.x && this.props.y == center.y,
                status = 'white';
            return { status: status, ant: ant };
        },
        render: function render() {
            var cx = React.addons.classSet;
            var classes = cx('cell', this.state.status, this.props.ant ? 'ant' : '');
            if (this.props.ant) {
                console.log('ok');
            }
            return React.createElement("div", { className: classes });
        }
    });

    React.render(React.createElement(SquareLattice, null), document.getElementById('content'));
})();