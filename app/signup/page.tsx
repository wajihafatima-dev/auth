"use client";
import { Box, Button, TextField, Typography, Stack, Link as MuiLink } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setMessage(data.message || data.error || "Something went wrong");

      if (response.ok) {
        setForm({ email: "", password: "" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "70vh",
        mt: 10,
        display: "grid",
        placeItems: "center",
        backgroundColor: "background.default",
      }}
    >
      <form
        onSubmit={handleSubmit}
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
          Create your account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign up to get started
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            value={form.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              py: 1.2,
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </Stack>

        {message && (
          <Typography
            variant="caption"
            color={message.toLowerCase().includes("success") ? "green" : "error"}
            textAlign="center"
            mt={2}
          >
            {message}
          </Typography>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={2}
        >
           have an account?{" "}
          <MuiLink component={Link} href="/login" underline="hover">
            go to login
          </MuiLink>
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          mt={3}
        >
          By signing up you agree to our Terms and Privacy Policy.
        </Typography>
      </form>
    </Box>
  );
}
