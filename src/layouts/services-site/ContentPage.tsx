import React from 'react';

// Color Palette
const colors = {
  richBlack: '#000814',
  oxfordBlue: '#001d3d',
  yaleBlue: '#003566',
  microbusYellow: '#ffc300',
  cyberYellow: '#ffd60a',
  white: '#ffffff',
  lightGray: '#e0e0e0',
  darkGray: '#a0a0a0',
  redAccent: '#d32f2f' // For calendar header
};

const styles = {
  pageContainer: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: colors.white,
    color: colors.richBlack,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    border: `2px solid ${colors.yaleBlue}`, // Outer border seen in mockup
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 40px',
    backgroundColor: colors.white,
  },
  logoPlaceholderLeft: {
    backgroundColor: colors.cyberYellow,
    height: '40px',
    width: '60%',
  },
  logoPlaceholderRight: {
    backgroundColor: colors.cyberYellow,
    height: '40px',
    width: '60px',
  },
  titleContainer: {
    padding: '10px 40px 30px 40px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '400',
    margin: 0,
  },
  mainLayout: {
    display: 'flex',
    padding: '0 40px',
    gap: '30px',
    flex: 1,
    marginBottom: '40px',
  },
  // Sidebar Styles
  sidebar: {
    backgroundColor: colors.richBlack,
    width: '300px',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  pillInput: {
    backgroundColor: 'transparent',
    border: `2px solid ${colors.cyberYellow}`,
    borderRadius: '25px',
    color: colors.white,
    padding: '10px 20px',
    fontSize: '14px',
    textAlign: 'center',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  boxInput: {
    backgroundColor: 'transparent',
    border: `2px solid ${colors.cyberYellow}`,
    borderRadius: '8px',
    color: colors.white,
    padding: '30px 20px',
    fontSize: '14px',
    textAlign: 'center',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  iconGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
  },
  iconButton: {
    backgroundColor: colors.microbusYellow,
    borderRadius: '8px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
  calendarWidget: {
    backgroundColor: '#f5f5f5',
    border: `2px solid ${colors.cyberYellow}`,
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100px',
  },
  calendarHeader: {
    backgroundColor: colors.redAccent,
    height: '25px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 10px',
  },
  calendarDot: {
    width: '6px',
    height: '6px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '50%',
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
    padding: '10px',
    flex: 1,
  },
  calendarDay: {
    backgroundColor: colors.lightGray,
    borderRadius: '2px',
  },
  // Content Styles
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  searchSortBar: {
    backgroundColor: colors.microbusYellow,
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '500',
  },
  sortControls: {
    display: 'flex',
    gap: '20px',
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    backgroundColor: colors.microbusYellow,
    borderRadius: '8px',
    display: 'flex',
    padding: '10px',
    gap: '20px',
  },
  cardImageContainer: {
    position: 'relative',
    width: '50%',
    maxWidth: '400px',
    height: '200px',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageTag: {
    position: 'absolute',
    bottom: '15px',
    left: '15px',
    backgroundColor: colors.cyberYellow,
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
  },
  cardDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px 20px 10px 0',
  },
  cardDescription: {
    fontSize: '18px',
    fontWeight: '400',
    margin: 0,
  },
  cardPrice: {
    fontSize: '12px',
    textAlign: 'right',
    margin: '0 0 10px 0',
  },
  bookButton: {
    backgroundColor: colors.cyberYellow,
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    alignSelf: 'flex-end',
    width: '100%',
    maxWidth: '200px',
  },
  footer: {
    backgroundColor: colors.oxfordBlue,
    height: '60px',
    width: '100%',
  }
};

const ContentPage = () => {
  // Mock data for the results list
  const results = [
    { id: 1, name: 'Lotus Emira', desc: 'A grand tourer indeed', price: '$14*km/day', img: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Lotus Emira', desc: 'A grand tourer indeed', price: '$14*km/day', img: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Lotus Emira', desc: 'A grand tourer indeed', price: '$14*km/day', img: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Lotus Emira', desc: 'A grand tourer indeed', price: '$14*km/day', img: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <header style={styles.headerBar}>
        <div style={styles.logoPlaceholderLeft}></div>
        <div style={styles.logoPlaceholderRight}></div>
      </header>

      {/* Page Title */}
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>Promotions</h1>
      </div>

      {/* Main Layout (Sidebar + Content) */}
      <div style={styles.mainLayout}>
        
        {/* Left Sidebar Filters */}
        <aside style={styles.sidebar}>
          <div style={styles.pillInput}>Make & Model</div>
          <div style={styles.pillInput}>Colour</div>
          
          <div style={styles.boxInput}>Restrictions</div>
          <div style={styles.boxInput}>Year</div>
          
          <div style={styles.iconGrid}>
            <button style={styles.iconButton}>🛡️</button>
            <button style={styles.iconButton}>🏁</button>
            <button style={styles.iconButton}>
              <span style={{backgroundColor: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: '16px', color: 'black'}}>21+</span>
            </button>
            <button style={styles.iconButton}></button>
          </div>

          {/* CSS-based Calendar Placeholder */}
          <div style={styles.calendarWidget}>
            <div style={styles.calendarHeader}>
              {[...Array(6)].map((_, i) => <div key={i} style={styles.calendarDot}></div>)}
            </div>
            <div style={styles.calendarGrid}>
              {[...Array(14)].map((_, i) => <div key={i} style={styles.calendarDay}></div>)}
            </div>
          </div>

          <div style={styles.pillInput}>Price</div>
        </aside>

        {/* Right Main Content */}
        <main style={styles.contentArea}>
          {/* Top Search / Sort Bar */}
          <div style={styles.searchSortBar}>
            <div>Search with AutoAI</div>
            <div style={styles.sortControls}>
              <span style={{cursor: 'pointer'}}>Ascending</span>
              <span style={{cursor: 'pointer'}}>Sort</span>
            </div>
          </div>

          {/* Car Results List */}
          <div style={styles.cardList}>
            {results.map((car) => (
              <div key={car.id} style={styles.card}>
                <div style={styles.cardImageContainer}>
                  <img src={car.img} alt={car.name} style={styles.cardImage} />
                  <div style={styles.imageTag}>{car.name}</div>
                </div>
                
                <div style={styles.cardDetails}>
                  <p style={styles.cardDescription}>{car.desc}</p>
                  <div>
                    <p style={styles.cardPrice}>{car.price}</p>
                    <button style={styles.bookButton}>Available NOW</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer style={styles.footer}></footer>
    </div>
  );
};

export default ContentPage;