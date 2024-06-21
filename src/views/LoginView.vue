<template>
  <div class="bg-white p-5 rounded-5 text-secondary shadow" style="width: 25rem">
    <div class="d-flex justify-content-center">
      <img src="../assets/login-icon.svg" alt="login-icon" style="height: 7rem" />
    </div>
    <div class="text-center fs-1 fw-bold">Login</div>
    <div class="input-group mt-4">
      <div class="input-group-text bg-primary">
        <img src="../assets/username-icon.svg" alt="username-icon" style="height: 1rem" />
      </div>
      <input required v-model="user.IdUsuario" class="form-control bg-light" type="text" placeholder="Username" />
    </div>
    <div class="input-group mt-1">
      <div class="input-group-text bg-primary">
        <img src="../assets/password-icon.svg" alt="password-icon" style="height: 1rem" />
      </div>
      <input required v-model="user.Pass" class="form-control bg-light" type="password" placeholder="Password" />
    </div>
    <!-- <div class="d-flex justify-content-around mt-1">
      <div class="d-flex align-items-center gap-1">
        <input class="form-check-input" type="checkbox" />
        <div class="pt-1" style="font-size: 0.9rem">Remember me</div>
      </div>
      <div class="pt-1">
        <a href="" class="text-decoration-none text-primary fw-semibold fst-italic" style="font-size: 0.9rem">Forgot
          your password?</a>
      </div>
    </div> -->
    <button @click="addUser()" type="submit" class="btn btn-primary text-white w-100 mt-4 fw-semibold shadow-sm">
      Login
    </button>
    <!-- <div class="btn btn-info text-white w-100 mt-4 fw-semibold shadow-sm" href>
        Login
      </div> -->
    <!-- <div class="d-flex gap-1 justify-content-center mt-1">
      <div>Don't have an account?</div>
      <a href="#" class="text-decoration-none text-primary fw-semibold">Register</a>
    </div> -->
    <!-- <div class="p-3">
      <div class="border-bottom text-center" style="height: 0.9rem">
        <span class="bg-white px-3">or</span>
      </div>
    </div> -->
    <!-- <div class="btn d-flex gap-2 justify-content-center border mt-3 shadow-sm">
      <img src="../assets/google-icon.svg" alt="google-icon" style="height: 1.6rem" />
      <div class="fw-semibold text-secondary">Continue with Google</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      user: [
        {
          IdUsuario: "",
          Monto: 0,
          Activo: true,
          Pass: ""
        }
      ]
    }

  },
  methods: {
    async addUser() {
      if (this.user.IdUsuario && this.user.Pass) {
        await this.axios
          .post('https://localhost:44348/api/User', {
            IdUsuario: this.user.IdUsuario,
            Monto: this.user.Monto,
            Activo: this.user.Activo,
            Pass: this.user.Pass
          })
          .then(() => {
            this.$router.push({ name: 'menu', params: { IdUsuario: this.user.IdUsuario } })
          })
          .catch((error) => {
            console.log(error)
            this.errored = true
          })
          .finally(() => (this.loading = false))
      } else {
        console.log(this.user)
      }
    }

  }
}
</script>
<style></style>
