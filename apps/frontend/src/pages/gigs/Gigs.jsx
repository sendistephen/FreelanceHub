import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Gigs.scss';
import GigCard from '../../components/gigCard/GigCard';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../utils/apiClient';
import { useLocation } from 'react-router-dom';

const Gigs = () => {
  const [sort, setSort] = useState('sales');
  const [open, setOpen] = useState(false);
  const minRef = useRef(null);
  const maxRef = useRef(null);

  const { search } = useLocation();

  const constructUrl = () => {
    let url = '/gigs';
    const params = new URLSearchParams(search);

    if (minRef.current && minRef.current.value) {
      params.set('min', minRef.current.value);
    } else {
      params.delete('min');
    }
    if (maxRef.current && maxRef.current.value) {
      params.set('max', maxRef.current.value);
    } else {
      params.delete('max');
    }
    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }
    // Only append `?` if there are actual query parameters
    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [
      'gigs',
      search,
      minRef.current ? minRef.current.value : '',
      maxRef.current ? maxRef.current.value : '',
      sort,
    ],
    queryFn: () => apiClient.get(constructUrl()).then((res) => res.data.data),
  });

  const applyFilters = () => {
    refetch();
  };

  const resort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort, search]);

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr&gt; Graphics & Design</span>
        <h1>AI Artist</h1>
        <p>
          Explore the boundaries of art and technlogy with Liverr&lsquo;s
          Artists.
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={applyFilters}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === 'sales' ? 'Best Selling' : 'Newest'}
            </span>
            <ChevronDown
              onClick={() => setOpen(!open)}
              className="arrow-down"
            />
            {open && (
              <div className="rightMenu">
                {sort === 'sales' ? (
                  <span onClick={() => resort('createdAt')}>Newest</span>
                ) : (
                  <span onClick={() => resort('sales')}>Best Selling</span>
                )}
                <span onClick={() => resort('sales')}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? 'Loading...'
            : error
              ? 'Something went wrong'
              : data.map((gig) => <GigCard key={gig._id} gig={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
