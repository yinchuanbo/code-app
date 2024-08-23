const preDom = document.querySelector("#pre");
const html = preDom.innerHTML;
const data = JSON.parse(html);

let imgArr = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];

const tabClick = () => {
  const tabItems = document.querySelectorAll(".tab-item");
  const contentItems = document.querySelectorAll(".content-item");
  const closetabs = document.querySelectorAll(".closetab");
  function hiddenContentItems() {
    tabItems.forEach((item) => {
      item.classList.remove("active");
    });
    contentItems.forEach((item) => {
      item.classList.remove("active");
    });
  }
  tabItems.forEach((item, index) => {
    const navPath = document.querySelector(".nav__path");
    item.onclick = () => {
      hiddenContentItems();
      item.classList.add("active");
      contentItems[index].classList.add("active");
      const appPath = document.querySelectorAll("li[data-path]");
      appPath.forEach((key) => {
        key.classList.remove("active");
      });
      appPath.forEach((key) => {
        if (key.textContent.trim() === item.textContent.trim()) {
          key.classList.add("active");
          const keyPath = key.dataset.path;
          navPath.textContent = keyPath.replaceAll("/", " > ");
        }
      });
    };
  });
  closetabs.forEach((item, index) => {
    const navPath = document.querySelector(".nav__path");
    item.onclick = (e) => {
      e.stopPropagation();
      const p = item.parentNode;
      const pType = p.dataset.type;
      const prevSibling = p.previousElementSibling;
      const nextSibling = p.nextElementSibling;
      let curDom = "";
      if (prevSibling) {
        curDom = prevSibling;
        const prevType = prevSibling.dataset.type;
        prevSibling.classList.add("active");
        document
          .querySelector(`.content-item[data-type="${prevType}"]`)
          .classList.add("active");
      } else if (nextSibling) {
        curDom = nextSibling;
        const nextType = nextSibling.dataset.type;
        nextSibling.classList.add("active");
        document
          .querySelector(`.content-item[data-type="${nextType}"]`)
          .classList.add("active");
      } else {
        alert("最后一个了");
        return;
      }

      const appPath = document.querySelectorAll("li[data-path]");
      appPath.forEach((key) => {
        key.classList.remove("active");
      });
      appPath.forEach((key) => {
        if (key.textContent.trim() === curDom.textContent.trim()) {
          key.classList.add("active");
          const keyPath = key.dataset.path;
          navPath.textContent = keyPath.replaceAll("/", " > ");
        }
      });

      p.remove();
      document.querySelector(`.content-item[data-type="${pType}"]`).remove();
    };
  });
};

function decodeHtmlEntities(encodedString) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = encodedString;
  return textarea.value;
}

function generateRandomId(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const loadCSS = (url) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
};

const loadJS = (url, callback) => {
  const script = document.createElement("script");
  script.src = url;
  script.onload = callback;
  document.body.appendChild(script);
};

const removeCSS = (filename) => {
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  links.forEach((link) => {
    if (link.href.includes(filename)) {
      link.parentNode.removeChild(link);
    }
  });
};

// Function to remove loaded JS file
const removeJS = (filename) => {
  const scripts = document.querySelectorAll("script");
  scripts.forEach((script) => {
    if (script.src.includes(filename)) {
      script.parentNode.removeChild(script);
    }
  });
};

let isLoad = false;

const tabFirst = ({ name = "", data = "", isImg = false, extension = "" }) => {
  const activeDom = document.querySelector(".tab-item.active");
  if (activeDom) activeDom.classList.remove("active");
  const activeDom2 = document.querySelector(".content-item.active");
  if (activeDom2) activeDom2.classList.remove("active");
  const tabs = document.querySelector(".tabs");
  const contents = document.querySelector(".contents");
  let string = generateRandomId(5);

  let hz = "";
  const hzJS = extension === "js";
  const hzHTML = extension === "html";
  const hzCSS = extension === "css";
  const hzMD = extension === "md";
  if (hzMD) {
    hz = `<svg t="1724332546605" class="logo" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6563" width="200" height="200"><path d="M20.48 327.76192a163.84 163.84 0 0 1 163.84-163.84h655.36a163.84 163.84 0 0 1 163.84 163.84v327.68a163.84 163.84 0 0 1-163.84 163.84H184.32a163.84 163.84 0 0 1-163.84-163.84v-327.68z m163.84-81.92a81.92 81.92 0 0 0-81.92 81.92v327.68a81.92 81.92 0 0 0 81.92 81.92h655.36a81.92 81.92 0 0 0 81.92-81.92v-327.68a81.92 81.92 0 0 0-81.92-81.92H184.32z m68.97664 84.00896a40.96 40.96 0 0 1 45.71136 14.336L389.12 464.24064l90.112-120.13568a40.96 40.96 0 0 1 73.728 24.576v245.76a40.96 40.96 0 0 1-81.92 0v-122.88l-49.152 65.536a41.04192 41.04192 0 0 1-65.536 0l-49.152-65.536v122.88a40.96 40.96 0 1 1-81.92 0v-245.76a40.96 40.96 0 0 1 28.01664-38.87104zM757.76 368.76288a40.96 40.96 0 0 0-81.92 0v146.8416l-12.00128-12.00128a40.96 40.96 0 0 0-57.91744 57.91744l81.92 81.92a40.96 40.96 0 0 0 57.91744 0l81.92-81.92a40.96 40.96 0 0 0-57.91744-57.91744l-12.00128 12.00128V368.72192z" fill="rgb(146,146,146)" p-id="6564"></path></svg>`;
  }
  if (isImg) {
    hz = `<svg t="1724245393307" class="logo" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8782" width="200" height="200"><path d="M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160z m96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z" fill="rgb(146,146,146)" p-id="8783"></path><path d="M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96z m0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32z m462.4 379.2l-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z" fill="rgb(146,146,146)" p-id="8784"></path></svg>`;
  }
  if (hzCSS) {
    hz = `<svg t="1724245223873" class="logo" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5584" width="200" height="200"><path d="M213.333333 128h725.333334l-170.666667 640-341.333333 128-341.333334-128 21.333334-170.666667h85.333333L170.666667 704l256 106.666667 256-95.872L746.666667 469.333333h-597.333334L170.666667 384h592.981333l53.76-170.666667H192L213.333333 128z" fill="rgb(146,146,146)" p-id="5585"></path></svg>`;
  }
  if (hzHTML) {
    hz = `<svg t="1724245357222" class="logo" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7718" width="200" height="200"><path d="M128 0l888.832 0-72.704 843.776-376.832 115.712-358.4-115.712zM839.68 254.976l21.504-128-572.416-1.024 36.864 384 372.736 0 0 100.352-124.928 44.032-130.048-46.08-8.192-54.272-102.4 1.024 15.36 135.168 219.136 76.8 230.4-72.704 29.696-309.248-405.504 0-10.24-130.048 428.032 0z" p-id="7719" fill="rgb(146,146,146)"></path></svg>`;
  }
  if (hzJS) {
    hz = `<svg t="1724245322136" class="logo" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6654" width="200" height="200"><path d="M707.072 648.448c-15.36 8.704-36.864 13.312-63.488 13.312-30.208 0-52.224-5.632-66.56-15.872-15.872-11.776-25.6-31.744-29.696-59.392h-59.392c2.56 46.592 19.456 80.384 50.176 101.888 25.088 17.408 60.416 26.112 105.472 26.112 46.592 0 82.944-9.728 108.544-28.16 25.6-18.944 38.4-45.056 38.4-77.824 0-33.792-15.872-59.904-47.616-78.848-14.336-8.192-46.08-20.48-95.744-35.84-33.792-10.752-54.784-18.432-62.464-22.528-17.408-9.216-25.6-22.016-25.6-37.376 0-17.408 7.168-30.208 22.528-37.888 12.288-6.656 29.696-9.728 52.736-9.728 26.624 0 47.104 4.608 60.416 14.848 13.312 9.728 23.04 26.112 28.16 48.64h59.392c-3.584-39.936-18.432-69.632-44.032-88.576-24.064-17.92-57.856-26.624-100.864-26.624-39.424 0-71.68 8.704-97.28 26.624-27.648 18.432-40.96 44.032-40.96 76.288s13.824 56.832 41.984 73.728c10.752 6.144 38.912 16.384 83.968 30.72 40.448 12.288 64 20.48 71.168 24.064 22.528 11.264 34.304 26.624 34.304 46.08 0 15.36-8.192 27.136-23.552 36.352zM884.864 223.84L557.984 34.56a101.088 101.088 0 0 0-101.056 0L130.24 223.872a101.12 101.12 0 0 0-50.24 87.2v401.312c0 36.384 19.712 70.016 51.424 87.872l117.792 66.176c1.28 0.704 2.688 0.768 4.032 1.312 15.648 7.616 34.272 11.52 57.472 11.52 42.496 0 75.36-15.52 94.816-37.024 17.408-20.48 26.112-51.2 26.112-93.184V341.76h-59.904v405.248c0 26.112-4.608 45.056-13.824 56.832-9.216 11.776-24.064 17.92-44.032 17.92-2.688 0-18.656-4.096-31.2-9.408l-0.16-0.032c-0.736-0.48-1.184-1.248-1.952-1.664l-117.76-66.176A36.96 36.96 0 0 1 144 712.352v-401.28c0-13.088 7.04-25.28 18.336-31.84l326.656-189.28a36.8 36.8 0 0 1 36.896 0l326.88 189.28c11.328 6.592 18.368 18.784 18.368 31.872V713.6c0 12.864-6.88 24.96-17.92 31.552L537.472 933.824a36.8 36.8 0 0 1-36.896 0.512l-67.168-37.76a32 32 0 1 0-31.392 55.808l67.2 37.76a100.832 100.832 0 0 0 101.056-1.376l315.744-188.672a101.216 101.216 0 0 0 49.088-86.496V311.072a100.992 100.992 0 0 0-50.24-87.232z" fill="rgb(146,146,146)" p-id="6655"></path></svg>`;
  }
  const tab = `<div data-type="${string}" class="tab-item active">${hz} ${name}<span class="closetab"><svg t="1724285574942" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4449" width="200" height="200"><path d="M301.226667 210.773333a64 64 0 1 0-90.453334 90.453334L421.461333 512l-210.773333 210.773333a64 64 0 0 0 90.538667 90.453334L512 602.538667l210.773333 210.773333a64 64 0 0 0 90.453334-90.538667L602.538667 512l210.773333-210.773333a64 64 0 0 0-90.538667-90.453334L512 421.461333l-210.773333-210.773333z" fill="currentColor" p-id="4450"></path></svg></span></div>`;
  let content;
  if (!isImg) {
    content = `<div data-type="${string}" class="content-item active"></div>`;
    if (extension === "md") {
      content = `<div data-type="${string}" class="content-item md active" style="opacity: 0">${decodeHtmlEntities(
        data
      )}</div>`;
    }
  } else {
    content = `<div data-type="${string}" class="content-item isImg active"><img src="${data}" /></div>`;
  }
  tabs.insertAdjacentHTML("beforeend", tab);
  contents.insertAdjacentHTML("beforeend", content);
  if (extension === "md") {
    removeCSS("prism.css");
    removeJS("prism.min.js");
    loadCSS("../assets/css/prism.css");
    loadJS("../assets/js/prism.min.js", () => {
      console.log("Prism.js has been loaded");
      document.querySelector(".content-item.active").style.opacity = 1;
    });
  }
  if (!isImg && extension !== "md") {
    require.config({
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs",
      },
    });
    require(["vs/editor/editor.main"], function () {
      // monaco.editor.defineTheme("myCustomTheme", {
      //   base: "vs",
      //   inherit: true,
      //   rules: [
      //     { token: "comment", foreground: "999999", fontStyle: "italic" },
      //   ],
      //   colors: {
      //     "editor.foreground": "#D4D4D4",
      //     "editor.selectionBackground": "#264F78",
      //     "editor.lineHighlightBackground": "#242424",
      //     "editor.inactiveSelectionBackground": "#3B3A30",
      //     "editorIndentGuide.background": "#2A2D2E",
      //     "editorIndentGuide.activeBackground": "#2A2D2E",
      //   },
      // });
      // monaco.editor.setTheme("myCustomTheme");
      monaco.editor.create(document.querySelector(".content-item.active"), {
        value: decodeHtmlEntities(data),
        language: extension === "js" ? "javascript" : extension,
        automaticLayout: true,
        theme: "myCustomTheme",
        wordWrap: "on",
        fontSize: 14,
        fontFamily: "Inter",
        scrollbar: {
          vertical: "hidden",
          horizontal: "hidden",
        },
        lineNumbers: true,
        lineHeight: 40,
        minimap: {
          enabled: false,
        },
      });
    });
  }
  tabClick();
};

function getDataByPath(data, path) {
  const keys = path.split("/");
  const fileName = keys.pop();
  const fileExtension = fileName.split(".").pop();
  let result = data;
  for (const key of keys) {
    if (result[key] !== undefined) {
      result = result[key];
    } else {
      return { data: null, extension: null };
    }
  }
  return { data: result[fileName], extension: fileExtension };
}

const getFirstLi = () => {
  const firstLi = document.querySelector("li[data-id]");
  const navPath = document.querySelector(".nav__path");
  if (firstLi) {
    firstLi.classList.add("active");
    const path = firstLi.dataset.path;
    navPath.textContent = path.replaceAll("/", " > ");
    const filename = firstLi.textContent.trim();
    const { data: obj, extension } = getDataByPath(data, path);
    if (!imgArr.includes(extension)) {
      tabFirst({
        name: filename,
        data: obj,
        extension,
      });
    } else {
      tabFirst({
        name: filename,
        data: obj,
        extension,
        isImg: true,
      });
    }
  }
};

const allLiClick = () => {
  const LiAlls = document.querySelectorAll("li[data-id]");
  const navPath = document.querySelector(".nav__path");
  for (let i = 0; i < LiAlls.length; i++) {
    const element = LiAlls[i];
    element.onclick = () => {
      const activeDom = document.querySelector("li[data-id].active");
      activeDom.classList.remove("active");
      element.classList.add("active");
      const fileName = element.textContent.trim();
      const items = document.querySelectorAll(".tab-item");
      const itemsContent = document.querySelectorAll(".content-item");
      const findIndex = Array.from(items).findIndex(
        (item) => item.textContent.trim() === fileName
      );
      if (findIndex >= 0) {
        const itemsactive = document.querySelector(".tab-item.active");
        const contentsactive = document.querySelector(".content-item.active");
        itemsactive.classList.remove("active");
        contentsactive.classList.remove("active");
        items[findIndex].classList.add("active");
        itemsContent[findIndex].classList.add("active");
        return;
      }
      const path = element.dataset.path;
      navPath.textContent = path.replaceAll("/", " > ");
      const filename = element.textContent.trim();
      const { data: obj, extension } = getDataByPath(data, path);
      if (!imgArr.includes(extension)) {
        tabFirst({
          name: filename,
          data: obj,
          extension,
        });
      } else {
        tabFirst({
          name: filename,
          data: obj,
          isImg: true,
          extension,
        });
      }
    };
  }
};

const h3Ex = () => {
  const toggle = document.querySelectorAll(".toggle");
  toggle.forEach((item) => {
    item.onclick = () => {
      const next = item.nextElementSibling;
      next.classList.toggle("shousuo");
    };
  });
};

const getPreview = () => {
  const path = location.pathname.split(".html")[0];
  const newP = `/dirs${path}`;
  window.open(newP);
};

const extandBar = () => {
  const shrink = document.querySelector("#shrink");
  const content = document.querySelector(".wrapper-left__content");
  const preview = document.querySelector("#preview");
  shrink.onclick = () => {
    content.classList.toggle("noextand");
  };
  const tohome = document.querySelector("#tohome");
  tohome.onclick = () => {
    location.href = "/";
  };
  preview.onclick = getPreview;
};

window.onload = () => {
  getFirstLi();
  allLiClick();
  h3Ex();
  extandBar();
};
