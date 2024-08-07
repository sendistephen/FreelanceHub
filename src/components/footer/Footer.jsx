const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="footer-bottom">
              <div className="footer-copyright">
                <p>
                  © {new Date().getFullYear()} Copyright:{' '}
                  <a href="https://github.com/sendisteve">Stephen Sendi</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
