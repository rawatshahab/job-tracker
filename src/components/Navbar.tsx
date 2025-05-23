import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/addjob" style={styles.navLink}>Add Job</Link>
                </li>
            </ul>
        </nav>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    navbar: {
        backgroundColor: '#333',
        padding: '10px 20px',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        overflowX: 'hidden',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
        justifyContent: 'flex-start',
        flexWrap: 'wrap', // Ensures items wrap on smaller screens
    },
    navItem: {
        marginRight: '20px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
    },
    // Removed media query styles as they are not supported in inline styles.
    // Consider moving these styles to a CSS file or using a CSS-in-JS library.
};

export default Navbar;