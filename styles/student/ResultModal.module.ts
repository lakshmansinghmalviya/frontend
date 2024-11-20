import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  dialogPaper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    borderRadius: '6px',
    gap: '20px',
  },

  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  titleText: {
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#1976d2',
  },

  resultText: {
    marginBottom: '20px',
    color: '#555',
  },

  button: {
    margin: '0 10px',
    padding: '5px 10px',
    fontSize: '16px',
  },
});

export default useStyles;
