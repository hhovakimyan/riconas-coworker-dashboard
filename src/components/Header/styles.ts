export const headerStyles = {
    width: '100%',
    backgroundColor: '#fafafa',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',

    '& .innerContent': {
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        '& .logo': {
            height: '50px',
        },

        '& .rightSection': {
          display: 'flex',
          alignItems: 'center',
        }
    }
};

export const accountMenuWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
};

export const accountMenuStyles = {
    '& .MuiLink-root': {
        color: '#000',
    }
};
