"use strict";

AOS.init({
  duration: 1200,
});

// Make navbar transparent when it is scrolling
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarToggle = document.querySelector(".navbar_toggle_btn");
const whiteMenu = document.querySelectorAll(".navbar_menu_item>a");
const whiteLink = document.querySelectorAll(".white");
const burgerToggle = document.querySelectorAll(".burger_bar");
const burgerMenuLi = document.querySelectorAll("#menu li");

const svgStrokes = [".st0", ".st1", ".st2", ".st3"];

document.addEventListener("scroll", () => {
  const scrolled = window.scrollY > navbarHeight;
  navbar.classList.toggle("navbar_dark", scrolled);
  navbarToggle.classList.add("navbar_toggle_btn_bright");

  whiteMenu.forEach((el) => (el.style.color = "#222"));
  whiteLink.forEach((el) => (el.style.color = "#222"));
  burgerToggle.forEach((el) => (el.style.background = "#222"));
  burgerMenuLi.forEach((el) => (el.style.color = "#222"));
  svgStrokes.forEach((sel) => (document.querySelector(sel).style.stroke = "#222"));
});

// gets the breakpoint at which the scroll-to-top button should appear
const scrollBreakpoint = window.innerHeight * 0.9;

document.addEventListener("DOMContentLoaded", () => {
  setupScrollListener();
  setupScrollEvent();
});

// scrolls window to top
function setupScrollEvent() {
  const scrollButton = document.querySelector(".scroll-top");

  scrollButton.addEventListener("click", (e) => {
    // not the best solution until Safari/Edge support scroll behavior
    // window.scrollTo({ top: 0, behavior: 'smooth' });

    // Thanks to Geroge Daniel https://stackoverflow.com/questions/51229742/javascript-window-scroll-behavior-smooth-not-working-in-safari
    smoothVerticalScrolling(scrollButton.parentElement, 250, "top");
  });
}

// prepares the window for a scroll event to show the scroll button
function setupScrollListener() {
  window.addEventListener("scroll", (e) => {
    const scrollButton = document.querySelector(".scroll-top");

    // const scrollOffset = document.scrollingElement.scrollTop;
    const scrollOffset = window.scrollY;

    if (scrollOffset >= scrollBreakpoint) {
      scrollButton.classList.add("visible");
    } else if (scrollOffset <= 0) {
      scrollButton.classList.remove("visible");
    }
  });
}

// uses a timeout to scroll to top
function smoothVerticalScrolling(e, time, where) {
  // gets the element's top position relative to the viewport
  const eTop = e.getBoundingClientRect().top;

  // divides the top offset into 100 steps to be ellapsed
  const eAmt = eTop / 100;

  // starting time
  let curTime = 0;

  // not to exceed the desired duration
  while (curTime <= time) {
    // call a function to execute at one hundreth of the desired scroll time
    window.setTimeout(SVS_B, curTime, eAmt, where);
    // increase by one hundreth of the desired time to execute exactly 100 times
    curTime += time / 100;
  }
}

function SVS_B(eAmt, where) {
  // scroll by half the hundredth of the top offset if destination is not top (since to center only involves scrolling either in the top or bottom half of the window)
  if (where === "center" || where === "") {
    window.scrollBy(0, eAmt / 2);
  }
  // otherwise scroll the full amount
  if (where === "top") {
    window.scrollBy(0, eAmt);
  }
}

//Mouse cursor
const cursor = document.querySelector("#cursor");
const cursorBorder = document.querySelector("#cursor-border");
const cursorPos = { x: 0, y: 0 };
const cursorBorderPos = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  cursorPos.x = e.clientX;
  cursorPos.y = e.clientY;

  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

requestAnimationFrame(function loop() {
  const easting = 8;
  cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
  cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;

  cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
  requestAnimationFrame(loop);
});

document.querySelectorAll("[data-cursor]").forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    if (item.dataset.cursor === "pointer") {
      cursorBorder.style.backgroundColor = "rgba(255, 255, 255)";
      cursorBorder.style.setProperty("--size", "30px");
    }
    if (item.dataset.cursor === "pointer2") {
      cursorBorder.style.backgroundColor = "white";
      cursorBorder.style.mixBlendMode = "difference";
      cursorBorder.style.setProperty("--size", "60px");
      cursor.style.display = "none";
    }
  });
  item.addEventListener("mouseout", (e) => {
    cursorBorder.style.backgroundColor = "unset";
    cursorBorder.style.mixBlendMode = "unset";
    cursorBorder.style.setProperty("--size", "30px");
    cursor.style.display = "block";
  });
});
