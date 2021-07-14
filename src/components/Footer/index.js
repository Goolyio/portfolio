import Link from 'components/Link';
import './index.css';

const Footer = () => (
  <footer className="footer">
    <span className="footer__date">{`© 2017-${new Date().getFullYear()} `}</span>
    <Link secondary className="footer__link" href="/humans.txt" target="_self">
      Kieran Gookey
    </Link>
  </footer>
);

export default Footer;
