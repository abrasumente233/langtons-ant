'use strict';

(function () {
    'use strict';

    var height = 50,
        width = 70,
        center = { 'x': Math.floor(width / 2), 'y': Math.floor(height / 2) };
    console.log(center);

    var SquareLattice = React.createClass({ displayName: "SquareLattice",
        render: function render() {
            var rows = [];
            for (var i = 0; i < height; i++) {
                var cells = [];
                for (var j = 0; j < width; j++) {
                    cells[j] = React.createElement(Cell, { x: j, y: i });
                }
                rows[i] = React.createElement("div", { className: "row" }, cells);
            }

            console.log(rows);

            return React.createElement("div", null, rows);
        }
    });

    var Cell = React.createClass({ displayName: "Cell",
        getInitialState: function getInitialState() {
            if (this.props.x == 35) {
                console.log(this.props.x, this.props.y);
            }
            status = this.props.x == center.x && this.props.y == center.y ? 'ant' : 'white';
            return { status: status };
        },
        render: function render() {
            var cx = React.addons.classSet;
            var classes = cx('cell', this.state.status);
            if (this.state.status === 'ant') console.log('it exists');
            return React.createElement("div", { className: classes });
        }
    });

    React.render(React.createElement(SquareLattice, null), document.getElementById('content'));
})();