<template>
  <div class="forgot-page">
    <div class="card">
      <h1 class="app-title">SecondShot</h1>
      <i class="bi bi-envelope email-page-icon"></i>
      <h2>Password Reset Link Sent</h2>
      <p>We've sent a password reset link to your email address.</p>
      <router-link to="/" class="back-to-login-btn">Back to login</router-link>
      <router-link to="/forgot-password" class="change-email-link">
        Didn't receive a link? Go back and change your email
     </router-link>
    </div>
  </div>
</template>

<style scoped>
.change-email-link {
  display: block;
  margin-top: 1.2rem;
  color: #2563eb;
  text-decoration: underline;
  font-size: 0.98rem;
  cursor: pointer;
  text-align: center;
}
.change-email-link:hover {
  text-decoration: none;
  color: #1746a0;
}
.email-page-icon {
  font-size: 5.5rem;
  color: #d41414;
  margin-bottom: 4rem;
}
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
  min-height: 600px;
  background: rgb(222, 218, 218);
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(30,40,60,0.08);
  padding: 90px 46px 84px 36px;
  text-align: center;
}
.app-title {
  font-family: 'Baskerville', serif;
  font-size: 2.2rem;
  font-weight: 500;
  color: #000000;
  margin-bottom: 4rem;
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
  margin-bottom: 4rem;
  color: #444;
  font-size: 1rem;
}
.back-to-login-btn {
  display: inline-block;
  margin-top: 2rem;
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 10px 28px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}
.back-to-login-btn:hover {
  background: #1746a0;
  text-decoration: none;
}
</style>