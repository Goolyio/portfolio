import {
  Fragment,
  useEffect,
  useState,
  createContext,
  useContext,
  lazy,
  Suspense,
} from 'react';
import { Route, Switch, Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Post from 'pages/Post';
import Image from 'components/Image';
import Section from 'components/Section';
import Footer from 'components/Footer';
import { useScrollRestore } from 'hooks';
import fetchPosts from 'posts';
import './index.css';

const Page404 = lazy(() => import('pages/404'));

const ArticlesPost = ({
  slug,
  title,
  description,
  banner,
  bannerPlaceholder,
  bannerAlt,
  date,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article className="articles__post">
      <RouterLink
        className="articles__post-content"
        to={`/articles/${slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="articles__post-image-wrapper">
          <Image
            play={hovered}
            className="articles__post-image"
            src={banner ? require(`posts/assets/${banner}`) : undefined}
            placeholder={require(`posts/assets/${bannerPlaceholder}`)}
            alt={bannerAlt}
          />
          <div className="articles__post-image-tag">K256</div>
        </div>
        <div className="articles__post-text">
          <span className="articles__post-date">
            {new Date(date).toLocaleDateString('default', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
          <h2 className="articles__post-title">{title}</h2>
          <p className="articles__post-description">{description}</p>
        </div>
      </RouterLink>
    </article>
  );
};

const Articles = () => {
  const { posts } = useContext(ArticlesContext);
  useScrollRestore();

  return (
    <div className="articles">
      <Helmet>
        <title>Articles | Kieran Gookey</title>
        <meta
          name="description"
          content="A collection of technical design and development articles."
        />
      </Helmet>
      <Section className="articles__content">
        <div className="articles__column">
          {posts.map(({ slug, ...post }, index) => (
            <Fragment key={slug}>
              {index !== 0 && <hr className="articles__divider" />}
              <ArticlesPost slug={slug} {...post} />
            </Fragment>
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
};

const ArticlesContext = createContext({});

const ArticlesRouter = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const grabPosts = async () => {
      const postData = await Promise.all(fetchPosts);

      const posts = postData
        .filter(({ draft }) => !draft)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

      setPosts(posts);
    };

    grabPosts();
  }, []);

  return (
    <ArticlesContext.Provider value={{ posts }}>
      <Suspense>
        <Switch>
          {posts?.map(({ slug, ...rest }) => (
            <Route
              exact
              key={slug}
              path={`/articles/${slug}`}
              render={() => <Post slug={slug} {...rest} />}
            />
          ))}
          <Route exact component={Articles} path="/articles" />
          <Route component={Page404} />
        </Switch>
      </Suspense>
    </ArticlesContext.Provider>
  );
};

export default ArticlesRouter;
