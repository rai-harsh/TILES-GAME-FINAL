module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'glow': 'glowing 20s linear infinite',
                'bounce-in': 'bounceIn 1s forwards',
                'sparkle': 'sparkle 1s infinite',
            },
            keyframes: {
                glowing: {
                    '0%, 100%': { 'background-position': '0 0' },
                    '50%': { 'background-position': '400% 0' },
                },
                bounceIn: {
                    '0%': { opacity: '0', transform: 'scale(0.5)' },
                    '50%': { opacity: '1', transform: 'scale(1.1)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)' },
                },
                sparkle: {
                    '0%, 100%': {
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)'
                    },
                    '50%': {
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.5)'
                    },
                }
            }
        },
    },
    plugins: [],
}