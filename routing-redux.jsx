// https://codesandbox.io/s/4ryppz540
import { h, render } from "preact";
import { Provider, connect } from "preact-redux";
import debounce from "debounce";
import { createStore, combineReducers } from "redux";
import navHelper from "internal-nav-helper";

const initialState = {
  pathname: typeof location !== "undefined" ? location.pathname : "/"
};

const urlReducer = (state = initialState, action) => {
  if (action.type === "UPDATE_URL") {
    return { pathname: action.payload };
  }
  return state;
};

const doUpdateUrl = pathname => ({ type: "UPDATE_URL", payload: pathname });

// various "page" components
// each would get data from
// redux via connect if needed
// no burden placed on this component.
import HomePage from "./pages/home";
import OtherPage from "./pages/other";
import YetAnotherPage from "./pages/yet-another";
import NotFound from "./pages/not-found";

const Layout = ({ pathname, doUpdateUrl }) => {
  let page;

  if (pathname === "/") {
    page = <HomePage />;
  } else if (pathname === "/other") {
    page = <OtherPage />;
  } else if (pathname === "/yet-another") {
    page = <YetAnotherPage />;
  } else {
    page = <NotFound />;
  }

  return (
    <div onClick={navHelper(doUpdateUrl)}>
      <nav>
        <a href="/">home</a>
        {" | "}
        <a href="/other">other</a>
        {" | "}
        <a href="/yet-another">yet-another</a>
      </nav>
      <main>{page}</main>
    </div>
  );
};

const select = state => ({
  pathname: state.routing.pathname
});

const App = connect(select, { doUpdateUrl })(Layout);

const store = createStore(combineReducers({ routing: urlReducer }));

if ("scrollRestoration" in history) {
  // Back off, browser, I got this...
  history.scrollRestoration = "manual";
}

const restoreScrollPosition = () => {
  const { state } = window.history;
  if (state) {
    const newStyle = `height: ${state.height}px; width: ${state.width}px;`;
    document.body.setAttribute("style", newStyle);
    window.scrollTo(state.x, state.y);

    // Here we just tidy up after ourselves and remove the style
    // we forcibly set on body
    const getCallback = window.requestAnimationFrame || setTimeout;
    getCallback(() => {
      document.body.removeAttribute("style");
    });
  }
};

const saveScrollPosition = () => {
  // measure some things
  const state = {
    height: document.body.offsetHeight,
    width: document.body.offsetWidth,
    y: document.body.scrollTop,
    x: document.body.scrollLeft
  };
  window.history.replaceState(state, "");
};

// Update Redux if we navigated via browser's back/forward
// capabilities. Scroll position of document.body will be maintained
// automatically as long as our layout uses document.body for scrolling
window.addEventListener("popstate", e => {
  store.dispatch(doUpdateUrl(window.location.pathname));
  restoreScrollPosition();
});

restoreScrollPosition();
window.addEventListener("scroll", debounce(saveScrollPosition, 300), {
  passive: true
});

// update browser if we navigated via
// changing state in redux
store.subscribe(() => {
  const { pathname } = store.getState().routing;
  if (location.pathname !== pathname) {
    window.history.pushState(null, "", pathname);
    saveScrollPosition();
    // force scroll to top this is what browsers normally do when
    // navigating by clicking a link to a new page.
    document.body.scrollTop = 0;
    document.body.scrollLeft = 0;
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body
);
