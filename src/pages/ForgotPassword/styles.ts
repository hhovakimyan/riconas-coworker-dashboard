export const forgotPasswordPageStyles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '40px',

    '& .innerContent': {
        width: '100%',

        '& .title': {
            textAlign: 'center',
        },

        '& .passwordRestoredMessage': {
            textAlign: 'center',

            '& .highlightedEmail': {
                color: '#2196f3',
            },
        },

        '& .pageFooter': {
            marginTop: '20px',

            textAlign: 'center',
        }
    },
}