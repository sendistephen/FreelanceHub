/**
 * @function gigQueryBuilder
 * @description Builds a query object based on the filters provided
 * @param {Object} filters - An object containing the filters to be applied
 * @param {string} [filters.cat] - The category of the gig
 * @param {number} [filters.minPrice] - The minimum price of the gig
 * @param {number} [filters.maxPrice] - The maximum price of the gig
 * @param {string} [filters.title] - The title of the gig
 * @returns {Object} A query object that can be used to filter gigs
 * return query
 */
export const gigQueryBuilder = (filters) => {
  const query = {};

  if (filters.cat) {
    query.cat = filters.cat;
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) {
      query.price.$gte = parseFloat(filters.minPrice);
    }
    if (filters.maxPrice) {
      query.price.$gte = parseFloat(filters.maxPrice);
    }
  }

  if (filters.title) {
    query.title = { $regex: filters.title, $options: 'i' }; // makes the search case sensitive
  }
  return query;
};
