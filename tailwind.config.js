const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT(
    {
        content: ['./src/**/*.{js,jsx}', './build/index.html'],
        theme: {
            extend: {
                fontWeight: {
                    medium: 1000,
                },
                colors: {
                    'gold':'#DFAF3D',
                    'mainGray':'#303030',
                    'bgGray':'#252525',
                    'mainGold': '#DFAF3D',
                    'dark': 'rgb(23, 26, 30)',
                    'cardDark': '#252525',
                    'footerColor': '#212121'
                },
                height: {
                    '-100%': '-100%',
                    '100%': '100%',
                },
                screens: {
                    'md2': '910px',
                    'md1': '1000px',
                    'xsm': '350px'
                },
                fontSize: {
                    '20px': '20px'
                }
            },
        },
        plugins: [],
    }
)
