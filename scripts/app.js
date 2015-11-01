var loadList = function() {
  if (localStorage['listItems']) return JSON.parse(localStorage['listItems']);

  return [
    { text: 'Buy coffee',  completed: true  },
    { text: 'Buy milk',    completed: false },
    { text: 'Disco dance', completed: false }
  ];
}

var updateList = function(items, save) {
  var listElement = document.querySelector('#task-list');

  listElement.innerHTML = '';

  items.forEach(function(item) {
    listElement.innerHTML += renderItem(item);
  });

  if (save) localStorage['listItems'] = JSON.stringify(items);

  updateCounters();
}

var renderItem = function(item) {
  var template = document.querySelector('#item-template').innerHTML;
  var classAttr = ['list-group-item'];
  var checkedAttr = '';

  if (item['completed']) {
    classAttr.push('completed');
    checkedAttr = 'checked';
  }

  return template
    .replace('_TEXT_', item['text'])
    .replace('_CLASS_', classAttr.join(' '))
    .replace('_CHECKED_', checkedAttr);
}

var createNew = function(event) {
  var newItemElement = document.querySelector('#new-item');
  var newItemValue = newItemElement.value.trim();

  if (!newItemValue) return;

  listItems.push({ text: newItemValue, completed: false });
  newItemElement.value = '';

  updateList(listItems, true);
}

var removeItem = function(event) {
  var text = event.target.parentNode.querySelector('.item-text').innerHTML;

  listItems = listItems.filter(function(item) {
    if (item['text'] != text) return true;
  });

  updateList(listItems, true);
}

var toggleStatus = function(event) {
  var text = event.target.parentNode.querySelector('.item-text').innerHTML;

  listItems = listItems.map(function(item) {
    if (item['text'] == text) item['completed'] = !item['completed'];
    return item;
  });

  updateList(listItems, true);
}

var filterItems = function(status) {
  var itemsToShow = [];

  if (status == 'completed') {
    itemsToShow = listItems.filter(function(item) {
      return item['completed'];
    });
  } else if (status == 'active') {
    itemsToShow = listItems.filter(function(item) {
      return !item['completed'];
    });
  } else {
    itemsToShow = listItems;
  }

  updateList(itemsToShow);
}

var clearCompleted = function() {
  listItems = listItems.filter(function(item) {
    return !item['completed'];
  });

  updateList(listItems, true);
}

var updateCounters = function() {
  var completedCount = 0;

  listItems.forEach(function(item) {
    if (item['completed']) completedCount++;
  });

  document.querySelector('.filter-all').dataset.count = listItems.length;
  document.querySelector('.filter-active').dataset.count = listItems.length - completedCount;
  document.querySelector('.filter-completed').dataset.count = completedCount;
}

var listItems = loadList();
updateList(listItems);
