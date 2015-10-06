(function() {
    'use strict';

    var height = 50,
        width = 70,
        center = {'x': Math.floor(width/2), 'y': Math.floor(height/2)};
    console.log(center);

    var SquareLattice = React.createClass({
       render: function() {
           var rows = [];
           for (var i = 0; i < height; i++) {
               let cells = [];
               for (var j = 0; j < width; j++) {
                   cells[j] = <Cell x={j} y={i} />;
               }
               rows[i] = <div className="row">{cells}</div>;
           }

           console.log(rows);

           return <div>{rows}</div>;
       }
    });

    var Cell = React.createClass({
        getInitialState: function() {
            if (this.props.x == 35) {
                console.log(this.props.x, this.props.y);
            }
            status = this.props.x == center.x &&
                this.props.y == center.y ? 'ant' : 'white';
            return {status: status};
        },
        render: function () {
            var cx = React.addons.classSet;
            var classes = cx('cell', this.state.status);
            if (this.state.status === 'ant')
                console.log('it exists');
            return <div className={classes}></div>;
        }
    });

    React.render(<SquareLattice />, document.getElementById('content'));
})();