<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Menu</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a @click="hideDiv" class="btn btn-primary" href="#" id="navbarDropdown" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Juego de Ruleta
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" :href="'/ruleta' + this.IdUsuario">Nueva Partida</a></li>
              <li><a class="dropdown-item" @click="GuardarPartida(this.IdUsuario)" href="#">Guardar Partida</a></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li><a class="dropdown-item" href="/">Cerrar Sesion</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <select v-model="userSeleccionado" class="form-select form-select-sm" aria-label="Small select example"
            style="width: 130%" @change="onChangeUser($event)">
            <option>Seleccione Usuario</option>
            <option v-for="option in ItemsUser" :value="option.IdUsuario" :key="option.IdUsuario">
              {{ option.IdUsuario }}
            </option>
          </select>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
import Swal from 'sweetalert2';

export default {
  props: {
    IdUsuario: String,
    MontoGanado: Number
  },
  name: 'MenuView',
  data() {
    return {
      show: true,
      userSeleccionado: null,
      ItemsUser: [
        {
          IdUsuario: "",
          Monto: 0,
          Activo: true,
          Pass: ""
        }
      ]
    }
  },
  computed: {
    WelcomeUser() {
      console.log(this.IdUsuario);
      return this.IdUsuario;
    },
    userConectado() {
      return this.userSeleccionado
    }
  },
  methods: {
    onChangeUser(event) {
      if (event !== null) {
        if (this.userSeleccionado !== this.IdUsuario) {
          // console.log(this.userSeleccionado);
          // console.log(this.IdUsuario);
          // console.log(this.MontoGanado);
          this.GuardarPartida(this.IdUsuario)
        }

      }
    },
    GuardarPartida(idUser) {
      if (idUser != null || idUser != undefined) {
        Swal.fire({
          title: '¿Desea Guardar La Partida : ' + idUser + '?',
          showDenyButton: true,
          confirmButtonText: 'Guardar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Guardar la partida ademas debes de saber el monto que lleva en la partida
            this.$router.push({ name: 'ruleta', params: { IdUsuario: this.userSeleccionado } })
            // console.log('Usuario a Guardar:' + idUser + ' Monto Ganado: ' + this.MontoGanado);
            this.axios
              .put('https://localhost:44348/api/User', {
                IdUsuario: idUser,
                Monto: this.MontoGanado,
                Activo: true,
                Pass: ''
              })
              .then(() => {
              })
              .catch((error) => {
                console.log(error)
                this.errored = true
              })
              .finally(() => (this.loading = false))
            Swal.fire('Guardado!', '', 'success')
          } else if (result.isDenied) {
            // Guardar la partida ademas debes de saber el monto que lleva en la partida
            this.$router.push({ name: 'ruleta', params: { IdUsuario: this.userSeleccionado } })
            Swal.fire('Datos No Guardados', '', 'info')
          }
        })
      }
    }
  },
  mounted() {
    this.axios
      .get('https://localhost:44348/api/User')
      .then((response) => {
        this.ItemsUser = response.data
        // console.log(this.ItemsUser);
        this.userSeleccionado = this.IdUsuario
      })
      .catch((error) => {
        console.log(error)
        this.errored = true
      })
      .finally(() => (this.loading = false))

  }
}
</script>
<style lang=""></style>
