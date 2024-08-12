import { SearchIcon } from 'lucide-react';
import './Featured.scss';

const Featured = () => {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <i>freelance</i> service for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <SearchIcon className="searchIcon" />
              <input type="text" placeholder='Try "building mobil app"' />
            </div>
            <button>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Video & Animation</button>
            <button>AI Services</button>
            <button>Music & Audio</button>
            <button>Programming & Tech</button>
          </div>
        </div>
        <div className="right">
          <img src="/fiverr-featured.png" alt="featured" />
        </div>
      </div>
    </div>
  );
};
export default Featured;
