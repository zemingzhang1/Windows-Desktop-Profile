function generateSmallBar(id, img, name) {
  let parentDiv = document.getElementsByClassName('small_icons_bars_container')[0];
  let newElement = document.createElement('div');
  newElement.setAttribute('class', 'small_icons_bars');
  newElement.setAttribute('id', id);

  const icon = document.createElement('img');
  icon.className = 'icon_img';
  icon.src = img;

  let text = document.createElement('div');
  text.className = 'ellipsis-text';
  text.textContent = name;

  newElement.appendChild(icon);
  newElement.appendChild(text);
  parentDiv.appendChild(newElement);
  return newElement;
}

function unMin(smBar) {
  smBar.onclick = () => {
    const curId = smBar.id.replace(/ smallBar ID/g, '');
    const parentDiv = document.getElementById(curId);
    if (!parentDiv) {
      return;
    }

    if (parentDiv.style.display === 'none') {
      parentDiv.style.display = 'block';
      parentDiv.style.zIndex = String(++terminalWindowState.zIndex);
    }
    else {
      parentDiv.style.display = 'none';
    }
  };
}

function deleteSmallBar(id) {
  let parentDiv = document.getElementsByClassName('small_icons_bars_container')[0];
  const childDiv = document.getElementById(id);
  if (childDiv) {
    parentDiv.removeChild(childDiv);
  }
}

const terminalWindowState = {
  id: 'Start Terminal',
  icon: 'icons/msie-ic.png',
  running: false,
  isFullScreen: false,
  zIndex: 2000,
  shape: { left: 30, top: 70, width: 720, height: 420 },
  tabs: [],
  activeTabId: null,
  nextTabId: 1
};


function getTerminalViewportBounds() {
  const taskbarHeight = 36;
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight - taskbarHeight;
  return { maxWidth, maxHeight, taskbarHeight };
}

function normalizeTerminalShape() {
  const bounds = getTerminalViewportBounds();
  const minWidth = Math.min(420, bounds.maxWidth - 16);
  const width = Math.max(minWidth, Math.min(terminalWindowState.shape.width, bounds.maxWidth));
  const height = Math.max(220, Math.min(terminalWindowState.shape.height, bounds.maxHeight));
  const left = Math.max(0, Math.min(terminalWindowState.shape.left, bounds.maxWidth - width));
  const top = Math.max(0, Math.min(terminalWindowState.shape.top, bounds.maxHeight - height));

  terminalWindowState.shape.width = Math.round(width);
  terminalWindowState.shape.height = Math.round(height);
  terminalWindowState.shape.left = Math.round(left);
  terminalWindowState.shape.top = Math.round(top);
}

const terminalCommands = {
  help: [
    'Available commands:',
    'help - show this help menu',
    'about - describe this desktop',
    'apps - list desktop apps',
    'time - show local time',
    'tabs - list terminal tabs',
    'clear - clear active tab output'
  ],
  about: ['Welcome to my multi-tab Windows terminal.'],
  apps: () => ['Apps: ' + Object.keys(cells).join(', ')],
  time: () => [new Date().toLocaleString()],
  tabs: () => terminalWindowState.tabs.map((tab, index) => `${index + 1}. ${tab.title}`)
};

function getActiveTab() {
  return terminalWindowState.tabs.find((tab) => tab.id === terminalWindowState.activeTabId);
}

function renderTerminalOutput(outputNode) {
  outputNode.innerHTML = '';
  const activeTab = getActiveTab();
  if (!activeTab) {
    return;
  }

  activeTab.lines.forEach((text) => {
    const line = document.createElement('div');
    line.className = 'terminal_line';
    line.textContent = text;
    outputNode.appendChild(line);
  });
}

function renderTerminalTabs(tabsNode, outputNode, inputNode) {
  tabsNode.innerHTML = '';

  terminalWindowState.tabs.forEach((tab) => {
    const tabButton = document.createElement('button');
    tabButton.type = 'button';
    tabButton.className = 'terminal_tab' + (tab.id === terminalWindowState.activeTabId ? ' active' : '');
    tabButton.textContent = tab.title;

    tabButton.onclick = () => {
      terminalWindowState.activeTabId = tab.id;
      renderTerminalTabs(tabsNode, outputNode, inputNode);
      renderTerminalOutput(outputNode);
      inputNode.focus();
    };

    tabsNode.appendChild(tabButton);
  });

  const addTabButton = document.createElement('button');
  addTabButton.type = 'button';
  addTabButton.className = 'terminal_tab add_tab';
  addTabButton.textContent = '+';
  addTabButton.onclick = () => {
    const newTab = {
      id: terminalWindowState.nextTabId++,
      title: `Tab ${terminalWindowState.tabs.length + 1}`,
      lines: ['Microsoft(R) Windows DOS', 'Type "help" to get started.']
    };
    terminalWindowState.tabs.push(newTab);
    terminalWindowState.activeTabId = newTab.id;
    renderTerminalTabs(tabsNode, outputNode, inputNode);
    renderTerminalOutput(outputNode);
    inputNode.focus();
  };

  tabsNode.appendChild(addTabButton);
}

function runTerminalCommand(rawInput, outputNode) {
  const activeTab = getActiveTab();
  if (!activeTab) {
    return;
  }

  const input = rawInput.trim().toLowerCase();
  activeTab.lines.push(`C:\\> ${rawInput}`);

  if (!input) {
    renderTerminalOutput(outputNode);
    return;
  }

  if (input === 'clear') {
    activeTab.lines = [];
    renderTerminalOutput(outputNode);
    return;
  }

  const command = terminalCommands[input];
  if (!command) {
    activeTab.lines.push(`Unknown command: ${input}`);
    activeTab.lines.push('Type "help" to view available commands.');
    renderTerminalOutput(outputNode);
    return;
  }

  const result = typeof command === 'function' ? command() : command;
  result.forEach((line) => activeTab.lines.push(line));
  renderTerminalOutput(outputNode);
}

function makeTerminalDraggable(wrapper, header) {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let originLeft = 0;
  let originTop = 0;

  header.addEventListener('mousedown', (event) => {
    if (terminalWindowState.isFullScreen) {
      return;
    }
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    originLeft = parseInt(wrapper.style.left, 10);
    originTop = parseInt(wrapper.style.top, 10);
    event.preventDefault();
  });

  window.addEventListener('mousemove', (event) => {
    if (!dragging) {
      return;
    }

    const newLeft = Math.max(0, originLeft + event.clientX - startX);
    const newTop = Math.max(0, originTop + event.clientY - startY);
    wrapper.style.left = `${newLeft}px`;
    wrapper.style.top = `${newTop}px`;
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
  });
}

function createTerminalWindow() {
  normalizeTerminalShape();
  const wrapper = document.createElement('div');
  wrapper.id = terminalWindowState.id;
  wrapper.className = 'terminal_window';
  wrapper.style.left = `${terminalWindowState.shape.left}px`;
  wrapper.style.top = `${terminalWindowState.shape.top}px`;
  wrapper.style.width = `${terminalWindowState.shape.width}px`;
  wrapper.style.height = `${terminalWindowState.shape.height}px`;
  wrapper.style.zIndex = String(++terminalWindowState.zIndex);

  const header = document.createElement('div');
  header.className = 'terminal_window_header';

  const title = document.createElement('span');
  title.textContent = 'Terminal';

  const controls = document.createElement('div');
  controls.className = 'terminal_window_controls';

  const closeButton = document.createElement('button');
  closeButton.className = 'windows-button';
  closeButton.innerHTML = '<img src="images/close-icon.png" alt="Close" />';

  const fullScreenButton = document.createElement('button');
  fullScreenButton.className = 'windows-button';
  fullScreenButton.innerHTML = '<img src="images/full.png" alt="Full screen" />';

  const minButton = document.createElement('button');
  minButton.className = 'windows-button';
  minButton.innerHTML = '<img src="images/min.png" alt="Minimize" />';

  controls.appendChild(closeButton);
  controls.appendChild(fullScreenButton);
  controls.appendChild(minButton);

  header.appendChild(title);
  header.appendChild(controls);

  const tabBar = document.createElement('div');
  tabBar.className = 'terminal_tabs';

  const body = document.createElement('div');
  body.className = 'terminal_body';

  const output = document.createElement('div');
  output.className = 'terminal_output';

  const form = document.createElement('form');
  form.className = 'terminal_form';
  form.autocomplete = 'off';

  const prompt = document.createElement('span');
  prompt.textContent = 'C:\\>';

  const input = document.createElement('input');
  input.className = 'terminal_input';
  input.type = 'text';

  form.appendChild(prompt);
  form.appendChild(input);

  body.appendChild(output);
  body.appendChild(form);

  wrapper.appendChild(header);
  wrapper.appendChild(tabBar);
  wrapper.appendChild(body);

  document.body.appendChild(wrapper);
  makeTerminalDraggable(wrapper, header);

  wrapper.addEventListener('mousedown', () => {
    wrapper.style.zIndex = String(++terminalWindowState.zIndex);
  });

  if (terminalWindowState.tabs.length === 0) {
    const firstTab = {
      id: terminalWindowState.nextTabId++,
      title: 'Tab 1',
      lines: ['Microsoft(R) Windows DOS', 'Type "help" to get started.']
    };
    terminalWindowState.tabs.push(firstTab);
    terminalWindowState.activeTabId = firstTab.id;
  }

  renderTerminalTabs(tabBar, output, input);
  renderTerminalOutput(output);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    runTerminalCommand(input.value, output);
    input.value = '';
    output.scrollTop = output.scrollHeight;
  });

  minButton.onclick = () => {
    wrapper.style.display = 'none';
  };

  fullScreenButton.onclick = () => {
    const buttonImage = fullScreenButton.querySelector('img');

    if (!terminalWindowState.isFullScreen) {
      terminalWindowState.shape.left = parseInt(wrapper.style.left, 10);
      terminalWindowState.shape.top = parseInt(wrapper.style.top, 10);
      terminalWindowState.shape.width = wrapper.offsetWidth;
      terminalWindowState.shape.height = wrapper.offsetHeight;

      wrapper.classList.add('fullscreen');
      wrapper.style.left = '0px';
      wrapper.style.top = '0px';
      wrapper.style.right = '0px';
      wrapper.style.bottom = '36px';
      wrapper.style.width = 'auto';
      wrapper.style.height = 'auto';
      terminalWindowState.isFullScreen = true;
      buttonImage.src = 'images/shrink.png';
    }
    else {
      wrapper.classList.remove('fullscreen');
      normalizeTerminalShape();
      wrapper.style.right = '';
      wrapper.style.bottom = '';
      wrapper.style.left = `${terminalWindowState.shape.left}px`;
      wrapper.style.top = `${terminalWindowState.shape.top}px`;
      wrapper.style.width = `${terminalWindowState.shape.width}px`;
      wrapper.style.height = `${terminalWindowState.shape.height}px`;
      terminalWindowState.isFullScreen = false;
      buttonImage.src = 'images/full.png';
    }
  };

  closeButton.onclick = () => {
    terminalWindowState.running = false;
    terminalWindowState.isFullScreen = false;
    wrapper.parentNode.removeChild(wrapper);
    deleteSmallBar(terminalWindowState.id + ' smallBar ID');
  };

  const smBar = generateSmallBar(terminalWindowState.id + ' smallBar ID', terminalWindowState.icon, 'Terminal');
  unMin(smBar);

  window.addEventListener('resize', () => {
    if (terminalWindowState.isFullScreen) {
      wrapper.style.right = '0px';
      wrapper.style.bottom = '36px';
      wrapper.style.width = 'auto';
      wrapper.style.height = 'auto';
      return;
    }

    terminalWindowState.shape.left = parseInt(wrapper.style.left, 10);
    terminalWindowState.shape.top = parseInt(wrapper.style.top, 10);
    terminalWindowState.shape.width = wrapper.offsetWidth;
    terminalWindowState.shape.height = wrapper.offsetHeight;
    normalizeTerminalShape();
    wrapper.style.left = `${terminalWindowState.shape.left}px`;
    wrapper.style.top = `${terminalWindowState.shape.top}px`;
    wrapper.style.width = `${terminalWindowState.shape.width}px`;
    wrapper.style.height = `${terminalWindowState.shape.height}px`;
  });

  input.focus();
}

function openTerminalFromStart() {
  const startMenu = document.getElementById('startMenuID');
  startMenu.classList.remove('show');
  startMenu.setAttribute('aria-hidden', 'true');

  if (!terminalWindowState.running) {
    terminalWindowState.running = true;
    createTerminalWindow();
    return;
  }

  const windowNode = document.getElementById(terminalWindowState.id);
  if (windowNode) {
    windowNode.style.display = 'block';
    windowNode.style.zIndex = String(++terminalWindowState.zIndex);
  }
}

function initStartMenu() {
  const startButton = document.getElementById('homeID');
  const startMenu = document.getElementById('startMenuID');
  const terminalAppButton = document.getElementById('startTerminalAppID');

  startButton.addEventListener('click', (event) => {
    event.stopPropagation();
    startMenu.classList.toggle('show');
    startMenu.setAttribute('aria-hidden', (!startMenu.classList.contains('show')).toString());
  });

  terminalAppButton.addEventListener('click', (event) => {
    event.stopPropagation();
    openTerminalFromStart();
  });

  startMenu.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  document.addEventListener('click', () => {
    startMenu.classList.remove('show');
    startMenu.setAttribute('aria-hidden', 'true');
  });
}
