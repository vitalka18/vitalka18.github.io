  var $f1 = $('#f1');
  var $f2 = $('#f2');
  var interval1 = $('#i1').val().split(',');
  var interval2 = $('#i2').val().split(',');
  function f1(x, y) {
    var node2 = math.parse($f1.val());
    var code2 = node2.compile();
    var scope = {
        x: x,
        y: y
    };

    return code2.eval(scope);
  }

  function f2(x, y) {
    var node2 = math.parse($f2.val());
    var code2 = node2.compile();
    var scope = {
        x: x,
        y: y
    };

    return code2.eval(scope);
  }

  function calculate() {
    reset();
    interval1 = $('#i1').val().split(',');
    interval2 = $('#i2').val().split(',');
    const $first = document.getElementById('first');
    const $second = document.getElementById('second');
    const res = document.getElementById('res');


    const table1 = genTable(f1, interval1);
    const table2 = genTable(f2, interval2);
    $first.appendChild(printTable(f1, interval1));
    $second.appendChild(printTable(f2, interval2));

    const max1 = getMaxMax(table1);
    const max2 = getMaxMax(table2);


    console.log('-------------------------------------------------------------');

    const min1 = getMinMax(table1);
    const min2 = getMinMax(table2);
    const s = (interval1[1] - interval1[0]) * (interval2[1] - interval2[0]);

    res.appendChild(createWithText('h3', 'Випадок 1', 'bg-warning'));
    res.appendChild(createWithHtml('h6', '<span>maxmin f<sub>1</sub></span> = ' + $f1.val() + '=' + min1));
    res.appendChild(createWithHtml('h6', '<span>maxmin f<sub>2</sub></span> = ' + $f2.val() + '=' + min2));

    res.appendChild(createWithText('h3', 'Випадок 2', 'bg-success'));
    res.appendChild(createWithHtml('h6', '<span>maxmax f<sub>1</sub></span> = ' + $f1.val() + '=' + max1));
    res.appendChild(createWithHtml('h6', '<span>maxmax f<sub>2</sub></span> = ' + $f2.val() + '=' + max2));

    res.appendChild(createWithText('h3', 'Випадок 3', 'bg-info'));
    console.log(s,Algebrite.defint($f1.val(), 'y', interval1[0], interval1[1], 'x', interval1[0], interval1[1]));
    res.appendChild(createWithHtml('h6', 'f<sub>1</sub> = ' + $f1.val() + '=' + eval(Algebrite.defint($f1.val(), 'y', interval2[0], interval2[1], 'x', interval1[0], interval1[1]).toString())/s));
    res.appendChild(createWithHtml('h6', 'f<sub>2</sub> = ' + $f2.val() + '=' + eval(Algebrite.defint($f2.val(), 'y', interval2[0], interval2[1], 'x', interval1[0], interval1[1]).toString())/s));
  }

  function getMaxMax(table) {
    return Math.max.apply(null, table.map(i => Math.max.apply(null, i)));
  }

  function getMinMax(table) {
    return Math.max.apply(null, table.map(i => Math.min.apply(null, i)));
  }

  function createWithText(tag, text, className = '') {
    var el = document.createElement(tag);
    el.setAttribute('class', className);
    el.innerText = text;
    return el;
  }

  function createWithHtml(tag, text, className = '') {
    var el = document.createElement(tag);
    el.setAttribute('class', className);
    el.innerHTML = text;
    return el;
  }

  function printTable(funcName, interval) {
    const table = document.createElement('table');
    table.setAttribute('class', 'table table-bordered');
    const thead = document.createElement('thead');
    thead.setAttribute('class', 'thead-light');
    const tbody = document.createElement('tbody');
    const row = document.createElement('tr');
    const secondRow = document.createElement('tr');
    const resultRow = document.createElement('tr');
    var gentable = genTable(funcName, interval);
    const max = getMaxMax(gentable);
    const min = getMinMax(gentable);
    console.log(max,min)

    row.appendChild(createWithText('th', 'x1'));
    secondRow.appendChild(createWithText('th', 'x2'));
    resultRow.appendChild(createWithText('th', 'f(x1, x2)'));

    for (let i = interval[0]; i <= interval[1]; i++) {
      const td3 = createWithText('th', i);
      td3.setAttribute('colspan', interval[1]*1 + 1 - interval[0]*1);
      row.appendChild(td3);
      for (let j = interval[0]; j <= interval[1]; j++) {
        const td = createWithText('th', j);
        const el = funcName(i, j).toFixed(2);
        const td2 = createWithText('td', el);
        if (max == el) {
          td2.setAttribute('class', 'bg-success');
        } else if (min == el) {
          td2.setAttribute('class', 'bg-warning');
        }
        secondRow.appendChild(td);
        resultRow.appendChild(td2);
      }
    }
    thead.appendChild(row);
    thead.appendChild(secondRow);
    tbody.appendChild(resultRow);
    table.appendChild(thead);
    table.appendChild(tbody);
    const div = createWithHtml('div', '', 'table-responsive');
    div.appendChild(table);
    return div;
  }

  function genTable(funcName, interval) {
    const table = [];
    for (let i = interval[0]; i <= interval[1]; i++) {
      const row = [];
      for (let j = interval[0]; j <= interval[1]; j++) {
        row.push(funcName(i, j).toFixed(2));
      }
      table.push(row);
    }
    return table;
  }
calculate();
  function reset() {
    $('#first table').remove();
    $('#second table').remove();
    $('#res').html('');
  }

  $('#reset').on('click', reset);
  $('#calc').on('click', calculate);
