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
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  header: {
    backgroundColor: colors.white,
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  headerLeftBlock: {
    backgroundColor: colors.cyberYellow,
    height: '40px',
    width: '60%',
    borderRadius: '4px',
  },
  headerRightBlock: {
    backgroundColor: colors.cyberYellow,
    height: '40px',
    width: '60px',
    borderRadius: '4px',
  },
  mainContent: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  topLayout: {
    display: 'flex',
    gap: '30px',
    alignItems: 'stretch',
  },
  cartItemsColumn: {
    flex: '2',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  cartItemFrame: {
    backgroundColor: colors.oxfordBlue,
    borderRadius: '12px',
    overflow: 'hidden',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  cartItemImageContainer: {
    flex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    height: '150px',
  },
  cartItemImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cartItemDetails: {
    backgroundColor: colors.microbusYellow,
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '500',
    color: colors.richBlack,
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
  },
  summaryColumn: {
    flex: '1',
    backgroundColor: colors.cyberYellow,
    borderRadius: '12px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  summaryText: {
    fontSize: '18px',
    lineHeight: '1.6',
    margin: 0,
    color: colors.richBlack,
  },
  ctaBox: {
    backgroundColor: colors.cyberYellow,
    border: `2px solid ${colors.richBlack}`, // Dark border for focus
    borderRadius: '8px',
    padding: '12px 20px',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: colors.richBlack,
    cursor: 'pointer',
    marginTop: '20px',
    boxSizing: 'border-box',
    display: 'block', // Ensure it fills space as needed
    width: '100%',
  },
  recommendedSection: {
    padding: '20px 0',
  },
  recommendedTitle: {
    fontSize: '24px',
    fontWeight: '500',
    color: colors.yaleBlue,
    textAlign: 'center',
    margin: '0 0 20px 0',
  },
  recommendedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '30px',
  },
  recommendedCard: {
    backgroundColor: colors.white,
    border: `2px solid ${colors.lightGray}`,
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  recommendedCardImageContainer: {
    flex: 1,
    overflow: 'hidden',
    height: '180px',
  },
  recommendedCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  recommendedCardDetails: {
    backgroundColor: colors.microbusYellow,
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '500',
    color: colors.richBlack,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: colors.richBlack,
    height: '80px',
    width: '100%',
    marginTop: 'auto',
  }
};

const CartPage = () => {
  // Mock data for the cart items
  const cartItems = [
    { id: 1, carName: 'Honda NSX', price: '$14*km/day', img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80' },
    { id: 2, carName: 'Honda NSX', price: '$14*km/day', img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80' },
    { id: 3, carName: 'Honda NSX', price: '$14*km/day', img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80' },
  ];

  // Mock data for recommended packages
  const recommendedPackages = [
    { id: 1, packageName: 'Track Day Plus', price: '+$3*km/day', img: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=600&q=80' }, // Green Lotus
    { id: 2, packageName: 'Concierge Service', price: '+$5*km/day', img: 'https://images.unsplash.com/photo-1549419616-09a2b53c6e9d?auto=format&fit=crop&w=600&q=80' }, // White Porsche
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeftBlock}></div>
        <div style={styles.headerRightBlock}></div>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        
        {/* Top Section with two columns */}
        <div style={styles.topLayout}>
          {/* Cart Items Column */}
          <div style={styles.cartItemsColumn}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.cartItemFrame}>
                <div style={styles.cartItemImageContainer}>
                  <img 
                    src={item.img} 
                    alt={`${item.carName} in dark frame`} 
                    style={item.cartItemImage} 
                  />
                </div>
                <div style={styles.cartItemDetails}>
                  <span>{item.carName}</span>
                  <span>{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Column */}
          <div style={styles.summaryColumn}>
            <div>
              <p style={styles.summaryText}>Cart Summary</p>
              <ul style={{ ...styles.summaryText, listStyleType: 'none', paddingLeft: 0, marginTop: '20px' }}>
                <li>Items (3): $42</li>
                <li>Tax: $5</li>
                <li><strong>Total: $47</strong></li>
              </ul>
            </div>
            {/* The new small yellow box with the requested text */}
            <div style={styles.ctaBox}>Ready to race</div>
          </div>
        </div>

        {/* Recommended Packages Section */}
        <div style={styles.recommendedSection}>
          <h2 style={styles.recommendedTitle}>Recommended Packages</h2>
          <div style={styles.recommendedGrid}>
            {recommendedPackages.map((pkg) => (
              <div key={pkg.id} style={styles.recommendedCard}>
                <div style={styles.recommendedCardImageContainer}>
                  <img 
                    src={pkg.img} 
                    alt={`${pkg.packageName} photo`} 
                    style={styles.recommendedCardImage} 
                  />
                </div>
                <div style={styles.recommendedCardDetails}>
                  <span>{pkg.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={styles.footer}></footer>
    </div>
  );
};

export default CartPage;