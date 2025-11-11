<template>
  <div class="forgot-page">
    <div class="card">
      <h1 class="app-title">SecondShot</h1>
      <h2>Password Reset Link Sent</h2>
      <p>We've sent a password reset link to your email address.</p>
      <router-link to="/" class="back-to-login">Back to login</router-link>
    </div>
  </div>
</template>

<style scoped>
/* You can reuse your styles from ForgotPassword.vue */
.forgot-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #ffffff;
}
.card {
  width: 100%;
  max-width: 400px;
  min-height: 400px;
  background: rgb(222, 218, 218);
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(30,40,60,0.08);
  padding: 120px 36px 64px 36px;
  text-align: center;
}
.app-title {
  font-family: 'Baskerville', serif;
  font-size: 2.2rem;
  font-weight: 500;
  color: #000000;
  margin-bottom: 2rem;
  letter-spacing: 1px;
}
.card h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 2rem;
  margin-top: 2rem;
  letter-spacing: 0.5px;
  font-family: 'Arial', sans-serif;
}
.card p {
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  color: #444;
  font-size: 1rem;
}
.back-to-login {
  display: block;
  margin-top: 1.5rem;
  color: #2563eb;
  text-decoration: underline;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
}
.back-to-login:hover {
  text-decoration: none;
}
</style>