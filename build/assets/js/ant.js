var LetItRun = React.createClass({displayName: "LetItRun",
   render: function() {
     return React.createElement("p", null, "It works!");
   }
});

React.render(React.createElement(LetItRun, null), document.getElementById('content'));