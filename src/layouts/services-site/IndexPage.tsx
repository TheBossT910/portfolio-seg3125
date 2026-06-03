import React from 'react';

// Color Palette defined from https://coolors.co/palette/000814-001d3d-003566-ffc300-ffd60a
const colors = {
  richBlack: '#000814',
  oxfordBlue: '#001d3d',
  yaleBlue: '#003566',
  microbusYellow: '#ffc300',
  cyberYellow: '#ffd60a',
  white: '#ffffff',
  lightGray: '#e0e0e0',
};

const styles = {
  pageContainer: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: colors.white,
    color: colors.richBlack,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    border: `2px solid ${colors.yaleBlue}`,
  },
  // New Header
  header: {
    backgroundColor: colors.oxfordBlue,
    padding: '0 40px',
    display: 'flex',
    flexDirection: 'column',
  },
  headerTopNav: {
    backgroundColor: colors.cyberYellow,
    height: '40px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '15px',
  },
  logoPlaceholderRight: {
    backgroundColor: colors.cyberYellow,
    height: '40px',
    width: '60px',
    marginRight: '40px',
  },
  // New Hero Section with background
  heroSection: {
    backgroundImage: 'url("https://images.unsplash.com/photo-1549399542-7e3f8b79c340?auto=format&fit=crop&w=1920&q=80")', // NSX night scene
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: colors.white,
  },
  heroTitle: {
    fontSize: '36px',
    fontWeight: '400',
    textAlign: 'center',
    margin: '0 0 30px 0',
  },
  heroHighlight: {
    color: colors.cyberYellow,
    textDecoration: 'underline',
  },
  searchBarContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for better text contrast
    margin: '0 auto',
    padding: '15px 30px',
    display: 'flex',
    gap: '20px',
    width: '80%',
    maxWidth: '900px',
    alignItems: 'center',
    borderRadius: '8px',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: `2px solid ${colors.cyberYellow}`,
    borderRadius: '20px',
    color: colors.white,
    padding: '10px 20px',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  searchDropdown: {
    backgroundColor: 'transparent',
    border: `2px solid ${colors.cyberYellow}`,
    borderRadius: '20px',
    color: colors.white,
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
  },
  categoryContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    margin: '20px 0 40px 0',
  },
  categoryButton: {
    backgroundColor: colors.oxfordBlue,
    color: colors.white,
    border: 'none',
    borderRadius: '8px',
    padding: '15px 30px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  // Carousel Section
  carouselSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 40px',
    gap: '20px',
    backgroundColor: colors.lightGray,
  },
  arrow: {
    backgroundColor: colors.white,
    height: '40px',
    width: '20px',
    cursor: 'pointer',
  },
  carouselImageContainer: {
    border: `6px solid ${colors.cyberYellow}`,
    borderRadius: '8px',
    overflow: 'hidden',
    maxWidth: '800px',
    width: '100%',
    height: '400px',
    display: 'flex',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  // New Three-Across Grid for tall cards
  threeGridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  tallCard: {
    backgroundColor: colors.white,
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    border: `2px solid ${colors.cyberYellow}`,
  },
  tallCardImageContainer: {
    width: '100%',
    flex: '1', // Take all available space
    overflow: 'hidden',
  },
  tallCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardFooter: {
    backgroundColor: colors.microbusYellow,
    padding: '15px',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: '500',
    color: colors.richBlack,
  },
  footer: {
    backgroundColor: colors.oxfordBlue,
    height: '60px',
    width: '100%',
    marginTop: '40px',
  }
};

const IndexPage = () => {
  // New inventory data for the three-across vertical grid
  const tallInventory = [
    { id: 1, img: 'https://images.unsplash.com/photo-1549419616-09a2b53c6e9d?auto=format&fit=crop&w=600&q=80', alt: 'White Porsche 911', price: '$14*km/day' },
    { id: 2, img: 'https://images.unsplash.com/photo-1579203673336-d71e2e718b52?auto=format&fit=crop&w=600&q=80', alt: 'Yellow S2000', price: '$8*km/day' },
    { id: 3, img: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=600&q=80', alt: 'Green Lotus Emira', price: 'SPECIAL: Just $7*km/day' },
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Header with new dark nav and top bar */}
      <header style={styles.header}>
        <div style={styles.headerTopNav}>
          <div style={styles.logoPlaceholderRight}></div>
        </div>
      </header>

      {/* Hero Section with background and re-integrated dark-frame search */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>
          Find your <span style={styles.heroHighlight}>perfect</span> ride
        </h1>
        <div style={styles.searchBarContainer}>
          <input 
            type="text" 
            placeholder="Search" 
            style={styles.searchInput} 
          />
          <select style={styles.searchDropdown}>
            <option>Make</option>
            <option>Lucid</option>
            <option>Tesla</option>
            <option>Porsche</option>
          </select>
          <select style={styles.searchDropdown}>
            <option>Days</option>
            <option>1-3</option>
            <option>4-7</option>
            <option>8+</option>
          </select>
        </div>
      </section>

      {/* Blue Category Buttons (moved down as in image 2) */}
      <section style={styles.categoryContainer}>
        <button style={styles.categoryButton}>Deals</button>
        <button style={styles.categoryButton}>Convertibles</button>
        <button style={styles.categoryButton}>Race-Ready</button>
      </section>

      {/* Carousel Section (central feature) with yellow frame */}
      <section style={styles.carouselSection}>
        <div style={styles.arrow}></div>
        <div style={styles.carouselImageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80" 
            alt="Featured Red NSX Rear" 
            style={styles.carouselImage}
          />
        </div>
        <div style={styles.arrow}></div>
      </section>

      {/* New Three-Across Grid for tall cards with yellow footers */}
      <section style={styles.threeGridContainer}>
        {tallInventory.map((car) => (
          <div key={car.id} style={styles.tallCard}>
            <div style={styles.tallCardImageContainer}>
              <img 
                src={car.img} 
                alt={car.alt} 
                style={styles.tallCardImage} 
              />
            </div>
            <div style={styles.cardFooter}>
              Starting from {car.price}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={styles.footer}></footer>
    </div>
  );
};

export default IndexPage;