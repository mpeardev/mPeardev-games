import { useEffect, useState, useContext } from "react";
import { Logo, Links, Profile, MenuIcon } from "./components";
import { Content } from "/src/ui/components";
import { enableScroll, disableScroll } from "/src/helpers/enableDisableScroll";
import BreakpointContext from "/src/state/breakpoint/BreakpointContext";
import classes from "./header.module.scss";
import colors from "./header.module.scss";

export function Header() {
  const { breakpoint } = useContext(BreakpointContext);

  const [show, setShow] = useState();
  const [fixedHeader, setFixedHeader] = useState();
  const [hidenHeader, setHidenHeader] = useState();

  let scrollInitialPosition = window.scrollY;

  useEffect(() => {
    // Initial Header Position
    if (scrollInitialPosition >= 80 && breakpoint <= 640) {
      setFixedHeader(true);
    }

    window.onscroll = () => {
      let scroll = scrollInitialPosition;

      // To Show Header
      scroll = window.scrollY;
      if (scroll >= 80) {
        setFixedHeader(true);
      } else if (scroll < 80) {
        setFixedHeader(false);
      }

      // To Hide Header
      if (document.body.getBoundingClientRect().top > scrollInitialPosition) {
        setHidenHeader(true);
      } else if (
        document.body.getBoundingClientRect().top <= scrollInitialPosition
      ) {
        setHidenHeader(false);
      }
      scrollInitialPosition = document.body.getBoundingClientRect().top;
    };
  }, []);

  useEffect(() => {
    if (show) disableScroll();
    else enableScroll();
  }, [show]);

  useEffect(() => {
    if (breakpoint > 640) {
      setShow(false);
    }
  }, [breakpoint]);

  return (
    <header
      className={classes.header}
      style={{
        background:
          fixedHeader && !show
            ? colors.headerBgGradient
            : show && breakpoint
            ? colors.headerBg
            : "transparent",
        boxShadow: fixedHeader
          ? "0px -10px 25px 0px rgba(0, 0, 0, 0.75)"
          : "none",
        backdropFilter: fixedHeader ? "blur(4px)" : "none",
        position: fixedHeader || show ? "fixed" : "absolute",
        top: show ? "0" : fixedHeader && hidenHeader ? "-10%" : "0",
      }}
    >
      <Content>
        <div className={classes.header__container}>
          <Logo />
          <Links show={show} />
          <Profile />
          <MenuIcon show={show} setShow={setShow} />
        </div>
      </Content>
    </header>
  );
}
