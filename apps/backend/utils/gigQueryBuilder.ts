/**
 * @function gigQueryBuilder
 * @description Builds a query object based on the filters provided
 * @param {Object} filters - An object containing the filters to be applied
 * @param {string} [filters.cat] - The category of the gig
 * @param {number} [filters.minPrice] - The minimum price of the gig
 * @param {number} [filters.maxPrice] - The maximum price of the gig
 * @param {string} [filters.title] - The title of the gig
 * @param {string} [filters.sort] - The sorting criteria
 * @returns {Object} A query object that can be used to filter gigs
 * return query
 */
export const gigQueryBuilder = (filters: GigFilters): GigQuery => {
  const query: GigQuery['query'] = {};
  const sort: GigQuery['sort'] = {};

  if (filters.cat) {
    query.cat = filters.cat;
  }

  if (filters.min || filters.max) {
    query.price = {};
    if (filters.min) {
      query.price.$gte = parseFloat(filters.min);
    }
    if (filters.max) {
      query.price.$lte = parseFloat(filters.max);
    }
  }

  if (filters.title) {
    query.title = { $regex: filters.title, $options: 'i' };
  }

  // Add sorting by the latest or other criteria
  if (filters.sort === 'latest') {
    sort.createdAt = -1; // Sort by creation date in descending order (latest first)
  } else if (filters.sort === 'oldest') {
    sort.createdAt = 1; // Sort by creation date in ascending order (oldest first)
  } else if (filters.sort === 'sales') {
    sort.sales = -1; // Sort by sales in descending order
  }

  return { query, sort };
};
