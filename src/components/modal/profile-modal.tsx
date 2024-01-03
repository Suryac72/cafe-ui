import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

export default function ProfileModal() {
  return (
      <Container className="py-5 h-100">
        <Grid container justifyContent="center" alignItems="center" className="h-100">
          <Grid item lg={6} className="mb-4 mb-lg-0">
            <Card className="mb-3" sx={{ borderRadius: '.5rem' }}>
              <Grid container className="g-0">
                <Grid item md={4} className="gradient-custom text-center text-white"
                  sx={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <CardMedia
                    component="img"
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="my-10 mx-10"
                    style={{ width: '80px' }}
                  />
                  <Typography variant="h5">Marie Horwitz</Typography>
                  <Typography variant="body2">Web Designer</Typography>
                </Grid>
                <Grid item md={8}>
                  <CardContent className="p-4">
                    <Typography variant="h6">Information</Typography>
                    <hr className="mt-0 mb-4" />
                    <Grid container className="pt-1">
                      <Grid item xs={6} className="mb-3">
                        <Typography variant="h6">Email</Typography>
                        <Typography variant="body2" className="text-muted">
                          info@example.com
                        </Typography>
                      </Grid>
                      <Grid item xs={6} className="mb-3">
                        <Typography variant="h6">Phone</Typography>
                        <Typography variant="body2" className="text-muted">
                          123 456 789
                        </Typography>
                      </Grid>
                    </Grid>

                    <Typography variant="h6">Social Media</Typography>
                    <hr className="mt-0 mb-4" />
                    <Grid container className="pt-1">
                      <Grid item xs={6} className="mb-3">
                        <Typography variant="h6">Email</Typography>
                        <Typography variant="body2" className="text-muted">
                          info@example.com
                        </Typography>
                      </Grid>
                      <Grid item xs={6} className="mb-3">
                        <Typography variant="h6">Phone</Typography>
                        <Typography variant="body2" className="text-muted">
                          123 456 789
                        </Typography>
                      </Grid>
                    </Grid>

                    <div className="d-flex justify-content-start">
                      <IconButton href="#!">
                        <Facebook fontSize="large" />
                      </IconButton>
                      <IconButton href="#!">
                        <Twitter fontSize="large" />
                      </IconButton>
                      <IconButton href="#!">
                        <Instagram fontSize="large" />
                      </IconButton>
                    </div>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
  );
}
