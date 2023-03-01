function img_create(src, alt, title, id) {
  var img = document.createElement('img');
  img.src = src;
  img.id = id;
  if (alt != null) img.alt = alt;
  if (title != null) img.title = title;
  return img;
}

function div_create(col, row, info, img) {
  var div = document.createElement("div");
  div.style.cursor = "move";
  div.appendChild(img_create(img, col, row, info));
  div.innerHTML += info.toString().replace(/ Icon/g, "");
  div.id = info.toString();
  return div;
}

function makeDraggable(item) {
  var draggable = new PlainDraggable(item);
  draggable.snap = { step: 25 };
  draggable.containment = { left: 0, top: 0, width: '180%', height: '180%' };
  return draggable;
}

let cells = { 'Resume/CV': { 'img': 'images/message_file.png', 'running': false, 'src': 'https://zays-gitlab.github.io/resume/', 'icon': 'icons/message_file-ic.png', 'shape':{'left':0,'top':0,'width':0,'height':0}}, 'First Webpage': { 'img': 'images/url.png', 'running': false, 'src': 'https://simple-data-a-simple-web-project-full-version.zaysgitlab.repl.co/', 'icon': 'icons/url-ic.png', 'shape':{'left':0,'top':0,'width':0,'height':0}}, 'Statistical ML Final': { 'img': 'images/document.png', 'running': false, 'src': 'https://me.zemingzhang.com/EAS508-Statistical-Learning/FINAL.html', 'icon': 'icons/document-ic.png','shape':{'left':0,'top':0,'width':0,'height':0}}, 'Python Final PJ': { 'img': 'images/document.png', 'running': false, 'src': 'https://me.zemingzhang.com/Team-14-EAS-503-Project/Credit%20Defaulter%20Analysis%20and%20Prediction.html', 'icon': 'icons/document-ic.png','shape':{'left':0,'top':0,'width':0,'height':0}}, 'Stat ML Final PJ': { 'img': 'images/document.png', 'running': false, 'src': 'https://me.zemingzhang.com/SIIM-ISIC-Melanoma-Classification/Melanoma', 'icon': 'icons/document-ic.png','shape':{'left':0,'top':0,'width':0,'height':0}}, 'Linkedin Picture': { 'img': 'images/image_file.png', 'running': false, 'src': 'data/images/me.jpg', 'icon': 'icons/kodak_imaging_file-ic.png','shape':{'left':0,'top':0,'width':0,'height':0}}, 'Internet Explorer': { 'img': 'images/internet.png', 'running': false, 'src': 'https://www.openasapp.com/embedding-an-iframe-step-by-step/', 'icon': 'icons/msie-ic.png','shape':{'left':0,'top':0,'width':0,'height':0}},'Minesweeper': { 'img': 'https://98.js.org/images/icons/minesweeper-32x32.png', 'running': false, 'src': 'https://98.js.org/programs/minesweeper/index.html', 'icon': 'https://98.js.org/images/icons/minesweeper-16x16.png','shape':{'left':0,'top':0,'width':0,'height':0}},'Pinball': {'img': 'https://98.js.org/images/icons/pinball-32x32.png', 'running': false, 'src': 'https://98.js.org/programs/pinball/space-cadet.html', 'icon': 'https://98.js.org/images/icons/pinball-16x16.png','shape':{'left':0,'top':0,'width':0,'height':0}},'Solitaire': {'img': 'https://98.js.org/images/icons/solitaire-32x32.png', 'running': false, 'src': 'https://98.js.org/programs/js-solitaire/index.html', 'icon': 'https://98.js.org/images/icons/solitaire-16x16.png','shape':{'left':0,'top':0,'width':0,'height':0}},'Wolf3d': {'img': 'https://rahul.io/images/win98_icons/WOLF3D.ico', 'running': false, 'src': 'https://rahul.io/installed-programs/wolf3d/index.html', 'icon': 'https://98.js.org/images/icons/solitaire-16x16.png','shape':{'left':0,'top':0,'width':0,'height':0}}};





function load_cells() {
  showSign("This is my personal webpage, double click on apps and files to open, drag to move and resize.");
  cols = 1;
  rows = 1;
  disp = document.getElementById("display");

  for (const [key, value] of Object.entries(cells)) {
    info = key;
    img = value['img'];
    disp.appendChild(div_create(cols, rows, info + " Icon", img));
    rows += 1;
  }

  for (const [key, value] of Object.entries(cells)) {
    info = key;
    b = document.getElementById(info + " Icon");
    addClickEvent(b);
    makeDraggable(b);
  }
  // Call the updateDateTime function initially to set the current date and time
  updateDateTime();
}

function deleteSign() {
  var overlay = document.querySelector(".overlay");
  overlay.parentNode.removeChild(overlay);
}

function showSign(msg) {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "[X]";
  closeBtn.onclick = function() {
    deleteSign();
  };

  const message = document.createElement("p");
  message.innerHTML = msg;

  overlay.appendChild(closeBtn);
  overlay.appendChild(message);

  document.body.appendChild(overlay);
}

function updateDateTime() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const now = new Date();
  const dayOfWeek = daysOfWeek[now.getDay()];
  const month = months[now.getMonth()];
  const dayOfMonth = now.getDate();
  const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;

  const dateElement = document.getElementById('date_textID');
  dateElement.textContent = formattedDate;

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;

  const timeElements = document.getElementsByClassName('time');
  for (let i = 0; i < timeElements.length; i++) {
    timeElements[i].textContent = formattedTime;
  }
}

// Call the updateDateTime function every second to keep the date and time updated
setInterval(updateDateTime, 1000);
