class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React Calculator",
      output: 0,
      buffer: [],
      isDecimal: false,
      formula: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.modBuffer = this.modBuffer.bind(this);
    this.getFormulaForOperator = this.getFormulaForOperator.bind(this);
    this.updateStateForOperator = this.updateStateForOperator.bind(this);
  }

  modBuffer(buffer, nextItem, isDecimalInBuffer) {
    let enteredNum = Number(
      [...this.state.buffer, event.target.innerHTML].join("")
    );
    let formatttedNum = enteredNum.toString();
    if (this.state.isDecimal) {
      if (formatttedNum.search(/\./) == -1) {
        formatttedNum = formatttedNum + ".0";
      }
    }
  }

  updateStateForOperator(operator) {
    if (this.state.formula[this.state.formula.length - 1] == "=") {
      this.setState({
        output: 0,
        buffer: [],
        isDecimal: false,
        formula: [this.state.output, operator]
      });
    } else {
      this.setState({
        output: 0,
        buffer: [],
        isDecimal: false,
        formula: this.getFormulaForOperator(
          this.state.formula,
          this.state.buffer,
          operator
        )
      });
    }
  }

  getFormulaForOperator(orgArray, buffer, operator) {
    let lastItem = orgArray[orgArray.length - 1];
    let lastItemIsMinus = ["-"].indexOf(lastItem) == -1 ? true : false;

    let secondToLastItem = orgArray[orgArray.length - 2];
    let secondToLastItemIsOperator =
      ["+", "*", "/", "-"].indexOf(secondToLastItem) !== -1 ? true : false;

    let newOperatorIsMinus = "-" === operator ? true : false;

    // NOTE here is where we can add step 16
    let lastOperatorIsEquals = "=" === lastItem ? true : false;

    //console.log(lastOperatorIsEquals);
    //console.log(newOperatorIsMinus);
    //console.log(secondToLastItem + " : " + secondToLastItemIsOperator);

    let bufferIsFull = buffer.length !== 0 ? true : false;

    let newArray = [];

    if (bufferIsFull) {
      newArray = [...orgArray, [...buffer].join("")];
    } else {
      if (!newOperatorIsMinus) {
        orgArray.pop();

        if (secondToLastItemIsOperator) {
          orgArray.pop();
        }
      }
      newArray = orgArray;
    }
    newArray.push(operator);

    return newArray;
  }

  handleChange(event) {
    const key = event.target.id;

    switch (key) {
      case "decimal":
        if (!this.state.isDecimal) {
          this.setState({
            buffer: [...this.state.buffer, "."],
            output: [...this.state.buffer, ".0"].join(""),
            isDecimal: true
          });
        }
        break;
      case "clear":
        this.setState({
          output: 0,
          buffer: [],
          isDecimal: false,
          formula: []
        });
        break;
      case "subtract":
        this.updateStateForOperator("-");
        break;
      case "multiply":
        this.updateStateForOperator("*");
        break;
      case "divide":
        this.updateStateForOperator("/");
        break;
      case "add":
        this.updateStateForOperator("+");
        break;
      case "equals":
        let tempFormula = [
          ...this.state.formula,
          [...this.state.buffer].join("")
        ];
        let calcResult = eval(tempFormula.join(""));
        let formatttedResult = calcResult.toString();
        if (this.state.isDecimal & (tempFormula.length == 1)) {
          if (formatttedResult.search(/\./) == -1) {
            formatttedResult = formatttedResult + ".0";
          }
        }
        this.setState({
          output: formatttedResult,
          buffer: "",
          isDecimal: false,
          formula: [tempFormula, "="]
        });
        break;
      case "decimal":
      case "zero":
      case "one":
      case "two":
      case "three":
      case "four":
      case "five":
      case "six":
      case "seven":
      case "eight":
      case "nine":
        let enteredNum = Number(
          [...this.state.buffer, event.target.innerHTML].join("")
        );
        let formatttedNum = enteredNum.toString();
        if (this.state.isDecimal) {
          if (formatttedNum.search(/\./) == -1) {
            formatttedNum = formatttedNum + ".0";
          }
        }
        this.setState({
          buffer: [...this.state.buffer, event.target.innerHTML],
          output: formatttedNum
        });
        break;
      default:
        this.setState({
          output: key
        });
        break;
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        formula: {this.state.formula} {this.state.buffer}
        <div className="flex-container">
          <div id="row">
            <div id="display">{this.state.output}</div>
          </div>
          <div id="row">
            <button onClick={this.handleChange} id="seven">
              7
            </button>
            <button onClick={this.handleChange} id="eight">
              8
            </button>
            <button onClick={this.handleChange} id="nine">
              9
            </button>
            <button onClick={this.handleChange} id="add">
              +
            </button>
          </div>
          <div id="row">
            <button onClick={this.handleChange} id="four">
              4
            </button>
            <button onClick={this.handleChange} id="five">
              5
            </button>
            <button onClick={this.handleChange} id="six">
              6
            </button>
            <button onClick={this.handleChange} id="subtract">
              -
            </button>
          </div>
          <div id="row">
            <button onClick={this.handleChange} id="one">
              1
            </button>
            <button onClick={this.handleChange} id="two">
              2
            </button>
            <button onClick={this.handleChange} id="three">
              3
            </button>
            <button onClick={this.handleChange} id="multiply">
              *
            </button>
          </div>
          <div id="row">
            <button onClick={this.handleChange} id="zero">
              0
            </button>
            <button onClick={this.handleChange} id="equals">
              =
            </button>
            <button onClick={this.handleChange} id="decimal">
              .
            </button>
            <button onClick={this.handleChange} id="divide">
              /
            </button>
          </div>
          <div id="row">
            <button onClick={this.handleChange} id="clear">
              C
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
