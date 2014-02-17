var browser = require('./jsdom/browser/index')
  , dom = require('./jsdom/level3/index').dom
  , level = dom.level3.html
  , style = require('./jsdom/level2/style')
  , augWin = browser.windowAugmentation(level, {})
  , selectors = require('./jsdom/selectors/index') 
  , d3

selectors.applyQuerySelectorPrototype(level)

window = augWin;
document = augWin.document

d3 = require('./js/d3')

//EXAMPLE 1
d3
  .select("body")
  .append("p")
  .text("Hello!!!")

console.log(document.innerHTML)

//EXAMPLE 2
var w = 300
  , h = 300
  , args = process.argv.slice(2)
 
init(args && args.length ? args[0].split(",") : [1,2,3,4,5,6,7])

require('fs').writeFile("index.html", document.innerHTML)
console.log()
console.log("have a look on index.html file")

function bars(data)
{
    max = d3.max(data)
 
    x = d3.scale.linear()
        .domain([0, max])
        .range([0, w])
 
    y = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeBands([0, h], .2)
 
    var vis = d3.select("#barchart")
    
    var bars = vis.selectAll("rect.bar")
        .data(data)
 
    bars
        .attr("fill", "#0a0")
        .attr("stroke", "#050")
 
    bars.enter()
        .append("svg:rect")
        .attr("class", "bar")
        .attr("fill", "#800")
        .attr("stroke", "#800")
 
    bars
        .attr("stroke-width", 4)
        .attr("width", x)
        .attr("height", y.rangeBand())
        .attr("transform", function(d,i) {
            return "translate(" + [0, y(i)] + ")"
        })
}

function init(values) {
    var svg = d3.select("body").append("svg")
        .attr("width", w+100)
        .attr("height", h+100)

    svg.append("svg:rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("stroke", "#000")
        .attr("fill", "none")
 
    svg.append("svg:g")
        .attr("id", "barchart")
        .attr("transform", "translate(50,50)")
    
    bars(values)
}
