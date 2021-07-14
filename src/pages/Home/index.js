import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Intro from './Intro';
import ProjectSummary from './ProjectSummary';
import Profile from './Profile';
import Footer from 'components/Footer';
import { usePrefersReducedMotion, useRouteTransition } from 'hooks';
import deviceModelsTexture from 'assets/device-models-phone.jpg';
import deviceModelsTextureLarge from 'assets/device-models-phone-large.jpg';
import deviceModelsTexturePlaceholder from 'assets/device-models-phone-placeholder.jpg';
import dttTexture from 'assets/dtt.jpg';
import dttTextureLarge from 'assets/dtt-large.jpg';
import dttTexturePlaceholder from 'assets/dtt-placeholder.jpg';
import iphone11 from 'assets/iphone-11.glb';
import macbookPro from 'assets/macbook-pro.glb';
import portrait from 'assets/portrait.glb';
import './index.css';

const disciplines = ['Backend', 'Frontend', 'Database', 'Cloud'];

const Home = () => {
  const { status } = useRouteTransition();
  const { hash, state } = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const about = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, about];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [intro, projectOne, projectTwo, about];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            scrollTimeout = setTimeout(
              () => {
                element.current.focus();
              },
              prefersReducedMotion ? 0 : 400
            );
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '-20% 0px -20% 0px' }
      );

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, prefersReducedMotion, status]);

  return (
    <div className="home">
      <Helmet>
        <title>Kieran Gookey | Designer + Developer</title>
        <meta
          name="description"
          content="Portfolio of Cody Jason Bennett – a multidisciplinary designer & developer with a focus on motion and user experience."
        />
        <link rel="prefetch" href={iphone11} as="fetch" crossorigin="" />
        <link rel="prefetch" href={macbookPro} as="fetch" crossorigin="" />
        <link rel="prefetch" href={portrait} as="fetch" crossorigin="" />
      </Helmet>
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        alternate
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Device Models"
        description="Design and development of a Figma plugin to create mockups with 3D device models."
        buttonText="View Project"
        buttonLink="/projects/device-models"
        model={{
          type: 'phone',
          alt: "Device Model's default image",
          textures: [
            {
              src: deviceModelsTexture,
              srcSet: `${deviceModelsTexture} 254w, ${deviceModelsTextureLarge} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
            {
              src: deviceModelsTexture,
              srcSet: `${deviceModelsTexture} 254w, ${deviceModelsTextureLarge} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="A Tool for Everything"
        description="Creating a platform for developers to build better software."
        buttonText="View Project"
        buttonLink="/projects/devtech-tools"
        model={{
          type: 'laptop',
          alt: 'DevTech Tools Landing Page',
          textures: [
            {
              src: dttTexture,
              srcSet: `${dttTexture} 800w, ${dttTextureLarge} 1440w`,
              placeholder: dttTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />
      <Footer />
    </div>
  );
};

export default Home;
