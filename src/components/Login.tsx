import {
  Button,
  Grid,
  Paper,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useStore } from "../store/store";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import logo from "../logo.svg";
import { User } from "../interfaces/user";

export const Login = () => {
  const auth = getAuth();
  const { userStore } = useStore();
  const [loading, setLoading] = useState(false);

  const googleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    const user: User = {
      avatarUrl: result.user.photoURL ?? null,
      name: result.user.displayName ?? "Anonymous",
      email: result.user.email ?? "",
      id: result.user.uid,
      token,
    };

    console.log(user);

    userStore.setUser(user);
    setLoading(false);
  };
  return (
    <>
      <Grid
        sx={{ paddingTop: "10%" }}
        alignItems="center"
        justifyContent="center"
        container
      >
        <Grid item xs={2}>
          <Paper style={{ minWidth: 400 }} elevation={5}>
            <Box sx={{ m: 2, p: 1 }}>
              <Stack sx={{ m: 2, p: 1 }} alignItems="center" spacing={2}>
                <img style={{ maxHeight: 80 }} src={logo} />
                <Typography variant="h3">Obso</Typography>
                <TextField placeholder="Email address" />
                <TextField placeholder="Password" />
                <Button disabled={loading}>Login</Button>
                <LoadingButton
                  startIcon={<GoogleIcon />}
                  onClick={() => googleSignIn()}
                  color="secondary"
                  disabled={loading}
                  loading={loading}
                >
                  Login With Google
                </LoadingButton>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
