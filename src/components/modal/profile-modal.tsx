import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar
} from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    avatar: {
      width: '8',
      height: '8',
    },
  }));
  

const ProfileModal: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
  })=> {
  const classes = useStyles();
  


  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Your Profile</DialogTitle>
        <DialogContent>
          <Avatar
            className={classes.avatar}
            src="/path-to-your-profile-image.jpg"
            alt="Profile"
          />
          <Typography variant="h6" gutterBottom>
            John Doe
          </Typography>
          <Typography color="textSecondary">Software Developer</Typography>
          <Typography color="textSecondary">john.doe@example.com</Typography>
          {/* Add more profile information as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileModal;
