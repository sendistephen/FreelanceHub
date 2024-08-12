import React from 'react';
import './Home.scss';
import Featured from '../../components/featured/Featured';
import TrustedBy from '../../components/trustedBy/TrustedBy';
import Slide from '../../components/slide/Slide';
import { cards } from '../../data';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import { CheckCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="home dark">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((item) => (
          <CategoryCard key={item.id} item={item} />
        ))}
      </Slide>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              liverr <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <CheckCheck className='checkedIcon'/>
              Connect to freelancers with proven business experience
            </div>

            <div className="title">
              <CheckCheck className='checkedIcon'/>
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <CheckCheck className='checkedIcon'/>
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore Liverr Business</button>
          </div>
          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
