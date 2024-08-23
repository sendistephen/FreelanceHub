import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import './GigCard.scss';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../utils/apiClient';

const GigCard = ({ gig }) => {
  const { isLoading, error, data:user } = useQuery({
    queryKey: [gig.userId],
    queryFn: () =>
      apiClient.get(`/users/${gig.userId}`).then((res) => res.data.data),
  });
 
  return (
    <Link to={`/gig/${gig._id}`} className="link">
      <div className="gigCard">
        <img src={gig.cover} alt="" />
        <div className="info">
          {isLoading ? (
            'loading...'
          ) : error ? (
            'Something went wrong'
          ) : (
            <div className="user">
              <img src={user.img} alt="" />
              <span>{user.username || './noAvatar.jpeg'}</span>
            </div>
          )}

          <p>{gig.desc}</p>
          <div className="star">
            <Star className='star-icon' />
            <span>
                {gig.starNumber > 0 && (gig.totalStars /gig.starNumber).toFixed(1)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <Heart className="heart" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {gig.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default GigCard;


