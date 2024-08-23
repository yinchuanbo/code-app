const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const marked = require("marked");

const imageExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".svg",
];

const isImage = (fileName) => {
  const ext = path.extname(fileName).toLowerCase();
  return imageExtensions.includes(ext);
};

function svgToBase64(svgString) {
  return "data:image/svg+xml;base64," + btoa(svgString);
}

function getDirectoryStructure(dirPath) {
  const result = {};
  const items = fs.readdirSync(dirPath);
  items.forEach((item) => {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      result[item] = getDirectoryStructure(itemPath);
    } else {
      if (isImage(item)) {
        const fileContent = fs.readFileSync(itemPath);
        const base64Content = fileContent.toString("base64");
        if (itemPath.includes(".svg")) {
          result[item] = svgToBase64(fileContent);
        } else {
          result[item] = `data:image/${path
            .extname(item)
            .slice(1)};base64,${base64Content}`;
        }
      } else {
        const fileContent = fs.readFileSync(itemPath, "utf-8");
        if (itemPath.includes(".md")) {
          result[item] = marked.parse(fileContent);
        } else {
          result[item] = fileContent;
        }
      }
    }
  });
  return result;
}

function getCodesDirectoryStructure() {
  const codesDirPath = path.join(__dirname, "./htmls/dirs");
  const codesDirs = fs.readdirSync(codesDirPath);
  const result = {};
  codesDirs.forEach((dir) => {
    const dirPath = path.join(codesDirPath, dir);
    const stats = fs.statSync(dirPath);
    if (stats.isDirectory()) {
      result[dir] = getDirectoryStructure(dirPath);
    }
  });
  return result;
}

const structure = getCodesDirectoryStructure();

const detailContent = fs.readFileSync("./temps/detail.html", "utf-8");

let uniqueId = 0;

function convertToHTML(structure, parentPath = "") {
  let html = "<ul>";
  for (const key in structure) {
    if (structure.hasOwnProperty(key)) {
      uniqueId++;
      const currentPath = parentPath ? `${parentPath}/${key}` : key;
      if (typeof structure[key] === "object") {
        html += `<li><h3 class="toggle"><svg class="arrow" t="1724246494118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13569" width="200" height="200"><path d="M472.064 751.552 72.832 352.32c-22.08-22.08-22.08-57.792 0-79.872 22.016-22.016 57.792-22.08 79.872 0L512 631.744l359.296-359.296c22.016-22.016 57.792-22.08 79.872 0 22.08 22.08 22.016 57.792 0 79.872l-399.232 399.232C529.856 773.568 494.144 773.568 472.064 751.552z" fill="rgb(146,146,146)" p-id="13570"></path></svg><svg t="1724244827594" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4320" width="200" height="200"><path d="M1024 0H0v1024h1024V0z" fill="rgb(146,146,146)" fill-opacity=".01" p-id="4321"></path><path d="M49.777778 192A78.222222 78.222222 0 0 1 128 113.777778h293.973333l106.666667 128h271.36a78.222222 78.222222 0 0 1 78.222222 78.222222V483.555556H219.761778L119.836444 883.285333 49.777778 874.666667v-682.666667zM128 184.888889a7.111111 7.111111 0 0 0-7.111111 7.111111v393.841778L164.238222 412.444444h642.872889v-92.444444a7.111111 7.111111 0 0 0-7.111111-7.111111h-304.64l-106.666667-128H128z" fill="rgb(146,146,146)" p-id="4322"></path><path d="M159.971556 412.444444h822.044444l-99.555556 497.777778H40.248889l119.751111-497.777778z m56.035555 71.111112L130.446222 839.111111h693.76l71.111111-355.555555H215.978667z" fill="rgb(146,146,146)" p-id="4323"></path></svg>${key}</h3>${convertToHTML(
          structure[key],
          currentPath
        )}</li>`;
      } else {
        let hz = "";
        const hzJS = key.endsWith(".js");
        const hzHTML = key.endsWith(".html");
        const hzCSS = key.endsWith(".css");
        const hzMD = key.endsWith(".md");
        const hzImg = imageExtensions.includes("." + key.split(".").pop());
        if (hzMD) {
          hz = `<svg t="1724332546605" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6563" width="200" height="200"><path d="M20.48 327.76192a163.84 163.84 0 0 1 163.84-163.84h655.36a163.84 163.84 0 0 1 163.84 163.84v327.68a163.84 163.84 0 0 1-163.84 163.84H184.32a163.84 163.84 0 0 1-163.84-163.84v-327.68z m163.84-81.92a81.92 81.92 0 0 0-81.92 81.92v327.68a81.92 81.92 0 0 0 81.92 81.92h655.36a81.92 81.92 0 0 0 81.92-81.92v-327.68a81.92 81.92 0 0 0-81.92-81.92H184.32z m68.97664 84.00896a40.96 40.96 0 0 1 45.71136 14.336L389.12 464.24064l90.112-120.13568a40.96 40.96 0 0 1 73.728 24.576v245.76a40.96 40.96 0 0 1-81.92 0v-122.88l-49.152 65.536a41.04192 41.04192 0 0 1-65.536 0l-49.152-65.536v122.88a40.96 40.96 0 1 1-81.92 0v-245.76a40.96 40.96 0 0 1 28.01664-38.87104zM757.76 368.76288a40.96 40.96 0 0 0-81.92 0v146.8416l-12.00128-12.00128a40.96 40.96 0 0 0-57.91744 57.91744l81.92 81.92a40.96 40.96 0 0 0 57.91744 0l81.92-81.92a40.96 40.96 0 0 0-57.91744-57.91744l-12.00128 12.00128V368.72192z" fill="rgb(146,146,146)" p-id="6564"></path></svg>`;
        }
        if (hzImg) {
          hz = `<svg t="1724245393307" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8782" width="200" height="200"><path d="M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160z m96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z" fill="rgb(146,146,146)" p-id="8783"></path><path d="M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96z m0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32z m462.4 379.2l-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z" fill="rgb(146,146,146)" p-id="8784"></path></svg>`;
        }
        if (hzCSS) {
          hz = `<svg t="1724245223873" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5584" width="200" height="200"><path d="M213.333333 128h725.333334l-170.666667 640-341.333333 128-341.333334-128 21.333334-170.666667h85.333333L170.666667 704l256 106.666667 256-95.872L746.666667 469.333333h-597.333334L170.666667 384h592.981333l53.76-170.666667H192L213.333333 128z" fill="rgb(146,146,146)" p-id="5585"></path></svg>`;
        }
        if (hzHTML) {
          hz = `<svg t="1724245357222" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7718" width="200" height="200"><path d="M128 0l888.832 0-72.704 843.776-376.832 115.712-358.4-115.712zM839.68 254.976l21.504-128-572.416-1.024 36.864 384 372.736 0 0 100.352-124.928 44.032-130.048-46.08-8.192-54.272-102.4 1.024 15.36 135.168 219.136 76.8 230.4-72.704 29.696-309.248-405.504 0-10.24-130.048 428.032 0z" p-id="7719" fill="rgb(146,146,146)"></path></svg>`;
        }
        if (hzJS) {
          hz = `<svg t="1724245322136" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6654" width="200" height="200"><path d="M707.072 648.448c-15.36 8.704-36.864 13.312-63.488 13.312-30.208 0-52.224-5.632-66.56-15.872-15.872-11.776-25.6-31.744-29.696-59.392h-59.392c2.56 46.592 19.456 80.384 50.176 101.888 25.088 17.408 60.416 26.112 105.472 26.112 46.592 0 82.944-9.728 108.544-28.16 25.6-18.944 38.4-45.056 38.4-77.824 0-33.792-15.872-59.904-47.616-78.848-14.336-8.192-46.08-20.48-95.744-35.84-33.792-10.752-54.784-18.432-62.464-22.528-17.408-9.216-25.6-22.016-25.6-37.376 0-17.408 7.168-30.208 22.528-37.888 12.288-6.656 29.696-9.728 52.736-9.728 26.624 0 47.104 4.608 60.416 14.848 13.312 9.728 23.04 26.112 28.16 48.64h59.392c-3.584-39.936-18.432-69.632-44.032-88.576-24.064-17.92-57.856-26.624-100.864-26.624-39.424 0-71.68 8.704-97.28 26.624-27.648 18.432-40.96 44.032-40.96 76.288s13.824 56.832 41.984 73.728c10.752 6.144 38.912 16.384 83.968 30.72 40.448 12.288 64 20.48 71.168 24.064 22.528 11.264 34.304 26.624 34.304 46.08 0 15.36-8.192 27.136-23.552 36.352zM884.864 223.84L557.984 34.56a101.088 101.088 0 0 0-101.056 0L130.24 223.872a101.12 101.12 0 0 0-50.24 87.2v401.312c0 36.384 19.712 70.016 51.424 87.872l117.792 66.176c1.28 0.704 2.688 0.768 4.032 1.312 15.648 7.616 34.272 11.52 57.472 11.52 42.496 0 75.36-15.52 94.816-37.024 17.408-20.48 26.112-51.2 26.112-93.184V341.76h-59.904v405.248c0 26.112-4.608 45.056-13.824 56.832-9.216 11.776-24.064 17.92-44.032 17.92-2.688 0-18.656-4.096-31.2-9.408l-0.16-0.032c-0.736-0.48-1.184-1.248-1.952-1.664l-117.76-66.176A36.96 36.96 0 0 1 144 712.352v-401.28c0-13.088 7.04-25.28 18.336-31.84l326.656-189.28a36.8 36.8 0 0 1 36.896 0l326.88 189.28c11.328 6.592 18.368 18.784 18.368 31.872V713.6c0 12.864-6.88 24.96-17.92 31.552L537.472 933.824a36.8 36.8 0 0 1-36.896 0.512l-67.168-37.76a32 32 0 1 0-31.392 55.808l67.2 37.76a100.832 100.832 0 0 0 101.056-1.376l315.744-188.672a101.216 101.216 0 0 0 49.088-86.496V311.072a100.992 100.992 0 0 0-50.24-87.232z" fill="rgb(146,146,146)" p-id="6655"></path></svg>`;
        }
        html += `<li data-id="${uniqueId}" data-path="${currentPath}">${hz}${key}</li>`;
      }
    }
  }
  html += "</ul>";
  return html;
}

const keyArrs = Object.keys(structure)

console.log('keyArrs', keyArrs)

function handleHome() {
  let urls = [];
  let _idx = -1;
  for (const key in structure) {
    _idx ++;
    const len = Object.keys(structure[key]).length;
    const detailHTML = ejs.render(detailContent, {
      content: convertToHTML(structure[key]),
      datas: structure[key],
      key,
      preview: `/dirs/${keyArrs[_idx]}`,
      prev: keyArrs[_idx - 1],
      next: keyArrs[_idx + 1]
    });
    const htmlName = `./htmls/${key}.html`;
    const outputFilePath = path.join(__dirname, htmlName);
    fs.writeFileSync(outputFilePath, detailHTML, "utf-8");
    urls.push(key);
  }
  // 处理首页
  const homeTemplateContent = fs.readFileSync("./temps/home.html", "utf-8");
  const homeOutputFilePath = path.join(__dirname, `./htmls/index.html`);
  let homeHTML = `<ul>`;
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    homeHTML += `<li><a href="/${url}.html">${url}</a></li>`;
  }
  homeHTML += `</ul>`;
  const homeTempHTML = ejs.render(homeTemplateContent, {
    list: homeHTML,
  });
  fs.writeFileSync(homeOutputFilePath, homeTempHTML, "utf-8");
}

handleHome();
