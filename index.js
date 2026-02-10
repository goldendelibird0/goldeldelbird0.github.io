// Navigation Bar
const nav = document.querySelector("nav");
let effectEl = document.querySelector(".effect.filter");
let textEl = document.querySelector(".effect.text");

let animationTime = 600;
let pCount = 15;
const minDistance = 20;
const maxDistance = 42;
const maxRotate = 75;
const colors = [1, 2, 3, 1, 2, 3, 1, 4];
const timeVariance = 300;

function noise(n = 1) {
  return n / 2 - Math.random() * n;
}

function getXY(distance, pointIndex, totalPoints) {
  const x =
    distance *
    Math.cos((((360 + noise(8)) / totalPoints) * pointIndex * Math.PI) / 180);
  const y =
    distance *
    Math.sin((((360 + noise(8)) / totalPoints) * pointIndex * Math.PI) / 180);
  return [x, y];
}

function makeParticles($el) {
  const d = [90, 10];
  const r = 100;

  const bubbleTime = animationTime * 2 + timeVariance;
  $el.style.setProperty("--time", bubbleTime + "ms");

  for (let i = 0; i < pCount; i++) {
    const t = animationTime * 2 + noise(timeVariance * 2);
    const p = createParticle(i, t, d, r);
    const $place = $el;
    if ($place) {
      $place.classList.remove("active");
      setTimeout(() => {
        const $particle = document.createElement("span");
        const $point = document.createElement("span");
        $particle.classList.add("particle");
        $particle.style = `
              --start-x: ${p.start[0]}px;
              --start-y: ${p.start[1]}px;
              --end-x: ${p.end[0]}px;
              --end-y: ${p.end[1]}px;
              --time: ${p.time}ms;
              --scale: ${p.scale};
              --color: var( --color-${p.color}, white );
              --rotate: ${p.rotate}deg;
            `;
        $point.classList.add("point");
        $particle.append($point);
        $place.append($particle);
        requestAnimationFrame(() => {
          $place.classList.add("active");
        });
        setTimeout(() => {
          try {
            $place.removeChild($particle);
          } catch (e) {}
        }, t);
      }, 30);
    }
  }
}

function createParticle(i, t, d, r) {
  let rotate = noise(r / 10);
  let minDistance = d[0];
  let maxDistance = d[1];
  return {
    start: getXY(minDistance, pCount - i, pCount),
    end: getXY(maxDistance + noise(7), pCount - i, pCount),
    time: t,
    scale: 1 + noise(0.2),
    color: colors[Math.floor(Math.random() * colors.length)],
    rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
  };
}

function updateEffectPosition(element) {
  if (!nav || !effectEl || !textEl || !element) {
    return;
  }
  const navRect = nav.getBoundingClientRect();
  const pos = element.getBoundingClientRect();
  const left = pos.left - navRect.left;
  const top = pos.top - navRect.top;
  const styles = {
    left: `${left}px`,
    top: `${top}px`,
    width: `${pos.width}px`,
    height: `${pos.height}px`,
  };

  Object.assign(effectEl.style, styles);
  Object.assign(textEl.style, styles);
  textEl.classList.remove("hidden");
  textEl.innerText = element.innerText;
}

const activate = ($el) => {
  if (!nav || !effectEl || !textEl || !$el) {
    return;
  }
  updateEffectPosition($el);

  if (!$el.classList.contains("active")) {
    nav.querySelectorAll("li").forEach(($el) => {
      $el.classList.remove("active");
    });
    effectEl.querySelectorAll(".particle").forEach(($el) => {
      effectEl.removeChild($el);
    });
    $el.classList.add("active");
    textEl.classList.remove("active");

    setTimeout(() => {
      textEl.classList.add("active");
    }, 100);

    makeParticles(effectEl);
  }
};

function ensureNavEffects() {
  if (!nav) {
    return false;
  }
  if (!effectEl) {
    effectEl = document.createElement("span");
    effectEl.className = "effect filter";
  }
  if (!textEl) {
    textEl = document.createElement("span");
    textEl.className = "effect text hidden";
  }
  if (!nav.contains(effectEl)) {
    nav.appendChild(effectEl);
  }
  if (!nav.contains(textEl)) {
    nav.appendChild(textEl);
  }
  return true;
}

function normalizePathname(pathname) {
  const parts = pathname.split("/");
  return parts[parts.length - 1].toLowerCase();
}

function resolveLinkInfo(link) {
  const href = link.getAttribute("href") || "";
  let url;
  try {
    url = new URL(href, window.location.href);
  } catch (e) {
    return { href, url: null };
  }
  const isHashOnly = href.startsWith("#");
  const isSamePage = url.pathname === window.location.pathname;
  return { href, url, isHashOnly, isSamePage };
}

function scrollToHash(hash) {
  if (!hash) {
    return false;
  }
  const target = document.querySelector(hash);
  if (!target) {
    return false;
  }
  target.scrollIntoView({ behavior: "smooth" });
  return true;
}

function syncActiveFromUrl() {
  if (!nav) {
    return;
  }
  const links = Array.from(nav.querySelectorAll("li a"));
  const currentPath = normalizePathname(window.location.pathname);
  const currentHash = window.location.hash;

  let match = links.find((link) => {
    const { href, url, isHashOnly } = resolveLinkInfo(link);
    if (!url) {
      return false;
    }
    if (isHashOnly) {
      return currentHash && href === currentHash;
    }
    const linkPath = normalizePathname(url.pathname);
    if (url.hash) {
      return linkPath === currentPath && url.hash === currentHash;
    }
    return linkPath === currentPath && !currentHash;
  });

  if (!match && !currentHash) {
    const samePathLinks = links.filter((link) => {
      const { url } = resolveLinkInfo(link);
      if (!url) {
        return false;
      }
      return normalizePathname(url.pathname) === currentPath;
    });
    if (samePathLinks.length > 0) {
      match =
        samePathLinks.find((link) => {
          const { url } = resolveLinkInfo(link);
          return url && !url.hash;
        }) || samePathLinks[0];
    }
  }

  if (!match && links.length > 0) {
    match = links[0];
  }

  if (match) {
    const li = match.closest("li");
    if (li) {
      activate(li);
    }
  }
}

function handleNavActivate(link, event) {
  if (!link) {
    return;
  }
  const li = link.closest("li");
  if (li) {
    activate(li);
  }

  const { url, isHashOnly, isSamePage } = resolveLinkInfo(link);
  if (!url) {
    return;
  }
  const shouldSmoothScroll = isHashOnly || (url.hash && isSamePage);
  if (shouldSmoothScroll) {
    if (event) {
      event.preventDefault();
    }
    const didScroll = scrollToHash(url.hash);
    if (didScroll) {
      history.replaceState(null, "", url.hash);
    }
  }
}

if (ensureNavEffects()) {
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !nav.contains(link)) {
      return;
    }
    handleNavActivate(link, event);
  });

  nav.querySelectorAll("li a").forEach((link) => {
    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleNavActivate(link, event);
      }
    });
  });
}

let scrollTimeout;
window.addEventListener("scroll", () => {
  if (!nav) {
    return;
  }
  const activeEl = nav.querySelector("li.active");
  if (activeEl) {
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(() => {
      updateEffectPosition(activeEl);
    });
  }
});

const resizeObserver = new ResizeObserver(() => {
  if (!nav) {
    return;
  }
  const activeEl = nav.querySelector("li.active");
  if (activeEl) {
    updateEffectPosition(activeEl);
  }
});

resizeObserver.observe(document.body);

window.addEventListener("hashchange", () => {
  syncActiveFromUrl();
});

setTimeout(() => {
  syncActiveFromUrl();
}, 200);
jQuery(document).ready(function ($) {
  var timelines = $(".cd-horizontal-timeline"),
    eventsMinDistance = 60;

  timelines.length > 0 && initTimeline(timelines);

  function initTimeline(timelines) {
    timelines.each(function () {
      var timeline = $(this),
        timelineComponents = {};
      timelineComponents["timelineWrapper"] = timeline.find(".events-wrapper");
      timelineComponents["eventsWrapper"] =
        timelineComponents["timelineWrapper"].children(".events");
      timelineComponents["fillingLine"] =
        timelineComponents["eventsWrapper"].children(".filling-line");
      timelineComponents["timelineEvents"] =
        timelineComponents["eventsWrapper"].find("a");
      timelineComponents["timelineDates"] = parseDate(
        timelineComponents["timelineEvents"],
      );
      timelineComponents["eventsMinLapse"] = minLapse(
        timelineComponents["timelineDates"],
      );
      timelineComponents["timelineNavigation"] = timeline.find(
        ".cd-timeline-navigation",
      );
      timelineComponents["eventsContent"] =
        timeline.children(".events-content");

      setDatePosition(timelineComponents, eventsMinDistance);
      var timelineTotWidth = setTimelineWidth(
        timelineComponents,
        eventsMinDistance,
      );
      timeline.addClass("loaded");

      timelineComponents["timelineNavigation"].on(
        "click",
        ".next",
        function (event) {
          event.preventDefault();
          updateSlide(timelineComponents, timelineTotWidth, "next");
        },
      );
      timelineComponents["timelineNavigation"].on(
        "click",
        ".prev",
        function (event) {
          event.preventDefault();
          updateSlide(timelineComponents, timelineTotWidth, "prev");
        },
      );
      timelineComponents["eventsWrapper"].on("click", "a", function (event) {
        event.preventDefault();
        timelineComponents["timelineEvents"].removeClass("selected");
        $(this).addClass("selected");
        updateOlderEvents($(this));
        updateFilling(
          $(this),
          timelineComponents["fillingLine"],
          timelineTotWidth,
        );
        updateVisibleContent($(this), timelineComponents["eventsContent"]);
      });

      timelineComponents["eventsContent"].on("swipeleft", function () {
        var mq = checkMQ();
        mq == "mobile" &&
          showNewContent(timelineComponents, timelineTotWidth, "next");
      });
      timelineComponents["eventsContent"].on("swiperight", function () {
        var mq = checkMQ();
        mq == "mobile" &&
          showNewContent(timelineComponents, timelineTotWidth, "prev");
      });

      $(document).keyup(function (event) {
        if (event.which == "37" && elementInViewport(timeline.get(0))) {
          showNewContent(timelineComponents, timelineTotWidth, "prev");
        } else if (event.which == "39" && elementInViewport(timeline.get(0))) {
          showNewContent(timelineComponents, timelineTotWidth, "next");
        }
      });
    });
  }

  function updateSlide(timelineComponents, timelineTotWidth, string) {
    var translateValue = getTranslateValue(timelineComponents["eventsWrapper"]),
      wrapperWidth = Number(
        timelineComponents["timelineWrapper"].css("width").replace("px", ""),
      );
    string == "next"
      ? translateTimeline(
          timelineComponents,
          translateValue - wrapperWidth + eventsMinDistance,
          wrapperWidth - timelineTotWidth,
        )
      : translateTimeline(
          timelineComponents,
          translateValue + wrapperWidth - eventsMinDistance,
        );
  }

  function showNewContent(timelineComponents, timelineTotWidth, string) {
    var visibleContent = timelineComponents["eventsContent"].find(".selected"),
      newContent =
        string == "next" ? visibleContent.next() : visibleContent.prev();

    if (newContent.length > 0) {
      var selectedDate = timelineComponents["eventsWrapper"].find(".selected"),
        newEvent =
          string == "next"
            ? selectedDate.parent("li").next("li").children("a")
            : selectedDate.parent("li").prev("li").children("a");

      updateFilling(
        newEvent,
        timelineComponents["fillingLine"],
        timelineTotWidth,
      );
      updateVisibleContent(newEvent, timelineComponents["eventsContent"]);
      newEvent.addClass("selected");
      selectedDate.removeClass("selected");
      updateOlderEvents(newEvent);
      updateTimelinePosition(
        string,
        newEvent,
        timelineComponents,
        timelineTotWidth,
      );
    }
  }

  function updateTimelinePosition(
    string,
    event,
    timelineComponents,
    timelineTotWidth,
  ) {
    var eventStyle = window.getComputedStyle(event.get(0), null),
      eventLeft = Number(eventStyle.getPropertyValue("left").replace("px", "")),
      timelineWidth = Number(
        timelineComponents["timelineWrapper"].css("width").replace("px", ""),
      ),
      timelineTotWidth = Number(
        timelineComponents["eventsWrapper"].css("width").replace("px", ""),
      );
    var timelineTranslate = getTranslateValue(
      timelineComponents["eventsWrapper"],
    );

    if (
      (string == "next" && eventLeft > timelineWidth - timelineTranslate) ||
      (string == "prev" && eventLeft < -timelineTranslate)
    ) {
      translateTimeline(
        timelineComponents,
        -eventLeft + timelineWidth / 2,
        timelineWidth - timelineTotWidth,
      );
    }
  }

  function translateTimeline(timelineComponents, value, totWidth) {
    var eventsWrapper = timelineComponents["eventsWrapper"].get(0);
    value = value > 0 ? 0 : value; 
    value =
      !(typeof totWidth === "undefined") && value < totWidth ? totWidth : value; 
    setTransformValue(eventsWrapper, "translateX", value + "px");
    value == 0
      ? timelineComponents["timelineNavigation"]
          .find(".prev")
          .addClass("inactive")
      : timelineComponents["timelineNavigation"]
          .find(".prev")
          .removeClass("inactive");
    value == totWidth
      ? timelineComponents["timelineNavigation"]
          .find(".next")
          .addClass("inactive")
      : timelineComponents["timelineNavigation"]
          .find(".next")
          .removeClass("inactive");
  }

  function updateFilling(selectedEvent, filling, totWidth) {
    var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
      eventLeft = eventStyle.getPropertyValue("left"),
      eventWidth = eventStyle.getPropertyValue("width");
    eventLeft =
      Number(eventLeft.replace("px", "")) +
      Number(eventWidth.replace("px", "")) / 2;
    var scaleValue = eventLeft / totWidth;
    setTransformValue(filling.get(0), "scaleX", scaleValue);
  }

  function setDatePosition(timelineComponents, min) {
    for (i = 0; i < timelineComponents["timelineDates"].length; i++) {
      var distance = daydiff(
          timelineComponents["timelineDates"][0],
          timelineComponents["timelineDates"][i],
        ),
        distanceNorm =
          Math.round(distance / timelineComponents["eventsMinLapse"]) + 2;
      timelineComponents["timelineEvents"]
        .eq(i)
        .css("left", distanceNorm * min + "px");
    }
  }

  function setTimelineWidth(timelineComponents, width) {
    var timeSpan = daydiff(
        timelineComponents["timelineDates"][0],
        timelineComponents["timelineDates"][
          timelineComponents["timelineDates"].length - 1
        ],
      ),
      timeSpanNorm = timeSpan / timelineComponents["eventsMinLapse"],
      timeSpanNorm = Math.round(timeSpanNorm) + 4,
      totalWidth = timeSpanNorm * width;
    timelineComponents["eventsWrapper"].css("width", totalWidth + "px");
    updateFilling(
      timelineComponents["timelineEvents"].eq(0),
      timelineComponents["fillingLine"],
      totalWidth,
    );

    return totalWidth;
  }

  function updateVisibleContent(event, eventsContent) {
    var eventDate = event.data("date"),
      visibleContent = eventsContent.find(".selected"),
      selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
      selectedContentHeight = selectedContent.height();

    if (selectedContent.index() > visibleContent.index()) {
      var classEnetering = "selected enter-right",
        classLeaving = "leave-left";
    } else {
      var classEnetering = "selected enter-left",
        classLeaving = "leave-right";
    }

    selectedContent.attr("class", classEnetering);
    visibleContent
      .attr("class", classLeaving)
      .one(
        "webkitAnimationEnd oanimationend msAnimationEnd animationend",
        function () {
          visibleContent.removeClass("leave-right leave-left");
          selectedContent.removeClass("enter-left enter-right");
        },
      );
    eventsContent.css("height", selectedContentHeight + "px");
  }

  function updateOlderEvents(event) {
    event
      .parent("li")
      .prevAll("li")
      .children("a")
      .addClass("older-event")
      .end()
      .end()
      .nextAll("li")
      .children("a")
      .removeClass("older-event");
  }

  function getTranslateValue(timeline) {
    var timelineStyle = window.getComputedStyle(timeline.get(0), null),
      timelineTranslate =
        timelineStyle.getPropertyValue("-webkit-transform") ||
        timelineStyle.getPropertyValue("-moz-transform") ||
        timelineStyle.getPropertyValue("-ms-transform") ||
        timelineStyle.getPropertyValue("-o-transform") ||
        timelineStyle.getPropertyValue("transform");

    if (timelineTranslate.indexOf("(") >= 0) {
      var timelineTranslate = timelineTranslate.split("(")[1];
      timelineTranslate = timelineTranslate.split(")")[0];
      timelineTranslate = timelineTranslate.split(",");
      var translateValue = timelineTranslate[4];
    } else {
      var translateValue = 0;
    }

    return Number(translateValue);
  }

  function setTransformValue(element, property, value) {
    element.style["-webkit-transform"] = property + "(" + value + ")";
    element.style["-moz-transform"] = property + "(" + value + ")";
    element.style["-ms-transform"] = property + "(" + value + ")";
    element.style["-o-transform"] = property + "(" + value + ")";
    element.style["transform"] = property + "(" + value + ")";
  }

  function parseDate(events) {
    var dateArrays = [];
    events.each(function () {
      var dateComp = $(this).data("date").split("/"),
        newDate = new Date(dateComp[2], dateComp[1] - 1, dateComp[0]);
      dateArrays.push(newDate);
    });
    return dateArrays;
  }

  function parseDate2(events) {
    var dateArrays = [];
    events.each(function () {
      var singleDate = $(this),
        dateComp = singleDate.data("date").split("T");
      if (dateComp.length > 1) {
        var dayComp = dateComp[0].split("/"),
          timeComp = dateComp[1].split(":");
      } else if (dateComp[0].indexOf(":") >= 0) {
        var dayComp = ["2000", "0", "0"],
          timeComp = dateComp[0].split(":");
      } else {
        var dayComp = dateComp[0].split("/"),
          timeComp = ["0", "0"];
      }
      var newDate = new Date(
        dayComp[2],
        dayComp[1] - 1,
        dayComp[0],
        timeComp[0],
        timeComp[1],
      );
      dateArrays.push(newDate);
    });
    return dateArrays;
  }

  function daydiff(first, second) {
    return Math.round(second - first);
  }

  function minLapse(dates) {
    var dateDistances = [];
    for (i = 1; i < dates.length; i++) {
      var distance = daydiff(dates[i - 1], dates[i]);
      dateDistances.push(distance);
    }
    return Math.min.apply(null, dateDistances);
  }

 
  function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  }

  function checkMQ() {
    return window
      .getComputedStyle(
        document.querySelector(".cd-horizontal-timeline"),
        "::before",
      )
      .getPropertyValue("content")
      .replace(/'/g, "")
      .replace(/"/g, "");
  }
});
