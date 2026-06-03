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
  midGray: '#b0b0b0',
};

const styles = {
  pageContainer: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#9ba4b5', // Slightly darker blue-gray to match mockup background depth, but fitting the theme
    color: colors.richBlack,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  headerBar: {
    backgroundColor: colors.oxfordBlue,
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'center',
  },
  headerPlaceholder: {
    backgroundColor: colors.richBlack,
    height: '40px',
    width: '100%',
    maxWidth: '1000px',
    borderRadius: '8px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    padding: '40px',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  // Top Card (Image + Price + Swatches)
  topCard: {
    backgroundColor: colors.white,
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    gap: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  imageContainer: {
    flex: '2',
    borderRadius: '8px',
    overflow: 'hidden',
    height: '300px',
  },
  carImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  topCardRight: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  priceBox: {
    backgroundColor: colors.cyberYellow, // Replaced Red
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: '500',
    color: colors.richBlack,
    flex: '1',
  },
  swatchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    flex: '1',
  },
  swatchItem: {
    backgroundColor: colors.yaleBlue, // Replaced Gray
    borderRadius: '6px',
    opacity: '0.7',
  },
  // Middle Section (Icons + Calendar)
  middleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconGroup: {
    display: 'flex',
    gap: '15px',
  },
  iconButton: {
    backgroundColor: colors.yaleBlue,
    border: `3px solid ${colors.cyberYellow}`, // Replaced Red border
    borderRadius: '8px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: colors.white,
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  calendarWidget: {
    backgroundColor: colors.white,
    borderRadius: '8px',
    overflow: 'hidden',
    width: '250px',
    height: '80px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  calendarHeader: {
    backgroundColor: colors.microbusYellow, // Replaced Red header
    height: '20px',
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
  // Description Box
  descriptionBox: {
    backgroundColor: colors.white,
    borderRadius: '12px',
    padding: '30px',
    fontSize: '18px',
    lineHeight: '1.6',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  // Reviews Section
  reviewsContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-between',
  },
  reviewBox: {
    backgroundColor: colors.white,
    border: `3px solid ${colors.cyberYellow}`, // Replaced Red border
    borderRadius: '8px',
    padding: '20px',
    flex: '1',
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  footer: {
    backgroundColor: colors.oxfordBlue,
    height: '80px',
    width: '100%',
    marginTop: '20px',
  }
};

const DetailsPage = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <header style={styles.headerBar}>
        <div style={styles.headerPlaceholder}></div>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        
        {/* Top Card: Image, Price, Swatches */}
        <div style={styles.topCard}>
          <div style={styles.imageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80" 
              alt="Red Sports Car Rear" 
              style={styles.carImage} 
            />
          </div>
          <div style={styles.topCardRight}>
            <div style={styles.priceBox}>
              <span>Starting from</span>
              <span>$14*km/day</span>
            </div>
            <div style={styles.swatchGrid}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={styles.swatchItem}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section: Icons and Calendar */}
        <div style={styles.middleSection}>
          <div style={styles.iconGroup}>
            <div style={styles.iconButton}>🏁</div>
            <div style={styles.iconButton}>🛡️</div>
            <div style={styles.iconButton}>
              <span style={{backgroundColor: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: '14px', color: 'black', fontWeight: 'bold'}}>21+</span>
            </div>
          </div>

          <div style={styles.calendarWidget}>
            <div style={styles.calendarHeader}></div>
            <div style={styles.calendarGrid}>
              {[...Array(14)].map((_, i) => (
                <div key={i} style={styles.calendarDay}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Description Box */}
        <div style={styles.descriptionBox}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sed dui eget
          rutrum. Nulla id erat eget nulla interdum dictum id eget purus. Suspendisse dapibus risus ac dolor
          vestibulum eleifend.
        </div>

        {/* Reviews */}
        <div style={styles.reviewsContainer}>
          <div style={styles.reviewBox}>
            <strong>Review:</strong><br />
            Great car
          </div>
          <div style={styles.reviewBox}>
            <strong>Review 2:</strong><br />
            ipsum
          </div>
          <div style={styles.reviewBox}>
            <strong>Review 3:</strong><br />
            ipsum
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={styles.footer}></footer>
    </div>
  );
};

export default DetailsPage;