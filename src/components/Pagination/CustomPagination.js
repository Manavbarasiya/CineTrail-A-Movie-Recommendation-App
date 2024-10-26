import { createTheme, Pagination, ThemeProvider } from "@mui/material";
import React from 'react';

// Create a dark theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    };

    return (
        <ThemeProvider theme={darkTheme}> {/* Apply the dark theme here */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                    count={numOfPages}
                    onChange={(e) => handlePageChange(e.target.textContent)}
                    sx={{
                        ul: {
                            justifyContent: 'center',
                        },
                        li: {
                            margin: '0 5px',  // Adds horizontal margin between numbers
                        },
                    }}
                    color="primary"
                />
            </div>
        </ThemeProvider>
    );
};

export default CustomPagination;
