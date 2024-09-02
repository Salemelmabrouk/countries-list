import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query) {
      const filteredSuggestions = countries.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (country) => {
    setSearch(country.name.common);
    setSuggestions([]);
    setFilteredCountries([country]);
  };

  const handleSearch = () => {
    const results = countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(results);
  };

  const handleClear = () => {
    setSearch('');
    setSuggestions([]);
    setFilteredCountries(countries);
  };

  const handleReset = () => {
    handleClear();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Country List</h2>
        <div className="relative w-full max-w-lg flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search countries..."
              className="border border-gray-300 p-2 rounded pr-10 w-full"
              value={search}
              onChange={handleSearchChange}
            />
            {search && (
              <button
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={handleClear}
              >
                <FaTimes className="text-gray-400" />
              </button>
            )}
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full border border-gray-300 rounded bg-white z-10 max-h-60 overflow-y-auto">
                {suggestions.map((country) => (
                  <li
                    key={country.cca3}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(country)}
                  >
                    {country.name.common}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
          {search && (
            <button
              className="bg-gray-500 text-white p-2 rounded ml-2"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <div className="relative group">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCountries.map((country) => (
            <li
              key={country.cca3}
              className={`relative transition-transform duration-300 border border-gray-300 rounded-lg overflow-hidden ${
                hoveredCountry && hoveredCountry !== country.cca3
                  ? 'blur-sm scale-95'
                  : 'scale-98'
              }`}
              onMouseEnter={() => setHoveredCountry(country.cca3)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <img
                src={country.flags.png || country.flags[0]}
                alt={`Flag of ${country.name.common}`}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{country.name.common}</h3>
                <p><strong className="font-bold">Region:</strong> <span className="font-normal">{country.region}</span></p>
                <p><strong className="font-bold">Subregion:</strong> <span className="font-normal">{country.subregion}</span></p>
                <p><strong className="font-bold">Population:</strong> <span className="font-normal">{country.population.toLocaleString()}</span></p>
                <p><strong className="font-bold">Capital:</strong> <span className="font-normal">{country.capital ? country.capital[0] : 'N/A'}</span></p>
                <p><strong className="font-bold">Languages:</strong> <span className="font-normal">{Object.values(country.languages || {}).join(', ')}</span></p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Countries;
