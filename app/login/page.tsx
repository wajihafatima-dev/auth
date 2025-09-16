"use client";
import { Box, Button, Typography, TextField, Link as MuiLink } from "@mui/material";
import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc"; // <-- Import Google Icon

export const dynamic = "force-static";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleEmailSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "70vh",
        display: "grid",
        mt: 10,
        placeItems: "center",
        backgroundColor: "background.default",
      }}
    >
      <form
        onSubmit={handleEmailSignIn}
        style={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "32px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to continue
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ py: 1.2, borderRadius: 2, textTransform: "none" }}
        >
          Sign in with Email
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FcGoogle />} // <-- Added Icon here
          sx={{ py: 1.2, borderRadius: 2, textTransform: "none" }}
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          Sign in with Google
        </Button>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={2}
        >
          Don&apos;t have an account?{" "}
          <MuiLink component={Link} href="/signup" underline="hover">
            Create one
          </MuiLink>
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          mt={1}
        >
          By signing in you agree to our Terms and Privacy Policy.
        </Typography>
      </form>
    </Box>
  );
}
