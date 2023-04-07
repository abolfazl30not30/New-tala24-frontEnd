
module.exports = {
    content: ['./src/**/*.{js,jsx}', './dist/index.html'],
    theme: {
        extend: {
            fontWeight: {
                medium: 1000,
            },
            colors: {
                'gold':'#FFC800',
                'mainGray':'#303030',
                'bgGray':'#252525',
                'mainGold': '#FFC800',
                'dark': 'rgb(23, 26, 30)',
                'cardDark': '#252525',
                'footerColor': '#131212'
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
