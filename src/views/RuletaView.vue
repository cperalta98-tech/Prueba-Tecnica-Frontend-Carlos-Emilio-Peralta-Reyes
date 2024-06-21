<template>
  <menu-view :-id-usuario="loadUser" :-monto-ganado="(calculoGanado == 0 ? this.montoInicial - (this.cantidadGanada - this.cantidadPerdida)  : this.montoInicial + this.totalGanado)" />
  <Roulette ref="wheel" :key="rouletteKey" :items="Items2" base-background="#EEAA33" :base-display-indicator="true"
    :base-display="true" :size="400" @wheel-start="wheelStartedCallback" @wheel-end="wheelEndedCallback"
    @click="launchWheel">
    <template #baseContent>
      <div>GO!</div>
    </template>
  </Roulette>
  <!-- <form class="row g-3"> -->
  <div class="mb-8">
    <div class="col-auto">
      <label for="montoInicial" class="visually-hidden">Monto Inicial</label>
      <input name="montoInicial" v-model="montoInicial" type="number" class="form-control" id="montoInicial"
        placeholder="Monto Inicial" required style="width: 130%" :min="1" />
    </div>
    <div class="col-auto">
      <label for="montoApuesta" class="visually-hidden">Monto Apostado</label>
      <input v-model="montoApuesta" name="montoApuesta" type="number" class="form-control" id="montoApuesta"
        placeholder="Monto Apuesta" required style="width: 130%" :min="1" />
    </div>
    <div class="col-auto">
      <select v-model="colores" class="form-select form-select-sm" aria-label="Small select example" style="width: 130%"
        label="Seleccione Un Color">
        <option v-for="optcolor in ItemsColores" :value="optcolor.name" :key="optcolor.idcol">
          {{ optcolor.name }}
        </option>
      </select>
    </div>
    <div class="col-auto">
      <select v-model="parimpar" class="form-select form-select-sm" aria-label="Small select example"
        style="width: 130%">
        <option v-for="opt in ItemsParImpar" :value="opt.name" :key="opt.idpi">
          {{ opt.name }}
        </option>
      </select>
    </div>
    <div class="col-auto">
      <select v-model="numero" class="form-select form-select-sm" aria-label="Small select example" style="width: 130%"
        @change="onChangeNum($event)">
        <option>Selecione Un Numero</option>
        <option v-for="option in Items2" :value="option.name" :key="option.id">
          {{ option.name }}
        </option>
      </select>
    </div>
    <div class="d-flex justify-content-around mt-2">
      <button @click="$refs.wheel.reset" class="btn btn-primary mb-3">Reset</button>
      <button type="reset" @click="rouletteKey += 1" class="btn btn-primary mb-3">Had Reset</button>
    </div>
    <span class="badge bg-success">Monto Ganado: {{ calculoGanado }}</span>
    <span class="badge bg-danger">Monto Perdido: {{ calculoPerdido }}</span>
    <span class="badge bg-primary">Monto Total: {{ calculoTotal }}</span>
  </div>
  <!-- </form> -->
</template>
<script>
import { Roulette } from 'vue3-roulette'
import MenuView from './MenuView.vue'
import Swal from 'sweetalert2'

var numeroseleccionado
var colorseleccionado

export default {
  props: {
    IdUsuario: String
  },
  name: 'RuletaView',
  components: {
    Roulette,
    MenuView
  },
  data() {
    return {
      montoInicial: null,
      montoApuesta: null,
      colores: 'Seleccione Un Color',
      parimpar: 'Seleccione Par o Impar',
      numero: null,
      cantidadGanada: 0,
      cantidadPerdida: 0,
      totalGanado: 0,
      rouletteKey: 0,
      userConectado: '',
      Items2: [
        {
          id: 0,
          name: '',
          htmlContent: '',
          textColor: '',
          background: ''
        }
      ],
      ItemsParImpar: [
        {
          idpi: 0,
          name: 'Seleccione Par o Impar'
        },
        {
          idpi: 1,
          name: 'Par'
        },
        {
          idpi: 2,
          name: 'Impar'
        }
      ],
      ItemsColores: [
        {
          idcol: 0,
          name: 'Seleccione Un Color'
        },
        {
          idcol: 1,
          name: 'Negro'
        },
        {
          idcol: 2,
          name: 'Rojo'
        }
      ],
      user: [
        {
          IdUsuario: '',
          Monto: 0,
          Activo: true,
          Pass: ''
        }
      ]
    }
  },
  computed: {
    calculoGanado() {
      return this.cantidadGanada
    },
    calculoPerdido() {
      return this.cantidadPerdida
    },
    calculoTotal() {
      return this.totalGanado
    },
    loadUser(){
      this.cargarUsuarios(this.IdUsuario)
      return this.IdUsuario
    }

  },
  methods: {
    onChangeNum(event) {
      if (event !== null) {
        if (this.parimpar) {
          this.parimpar = 'Seleccione Par o Impar'
        }
      }
    },
    launchWheel() {
      if (this.montoInicial && this.montoApuesta && this.montoInicial > this.montoApuesta) {
        if (
          this.colores !== 'Seleccione Un Color' ||
          this.parimpar !== 'Seleccione Par o Impar' ||
          (this.numero !== null && this.numero !== 'Selecione Un Numero')
        ) {
          // verificamos si aun tenemos dinero disponible restando el monto perdido menos el monto inicial
          var disponible = this.montoInicial - this.cantidadPerdida
          if (disponible > this.montoApuesta) {
            this.rouletteKey += 1
            setTimeout(() => this.$refs.wheel.launchWheel(), 0)
          } else {
            Swal.fire('¡Fondos Insuficientes, Agregue Mas A su Monto Inicial!')
          }
        } else {
          Swal.fire('¡Seleccione Un Modo de Apuesta: Color, Par o Impar o Numero!')
        }
      } else {
        Swal.fire('¡El Monto Apostado no puede ser mayor que el Monto Inicial!')
      }
    },
    wheelStartedCallback() {
      console.log('wheelStartedCallback')
    },
    wheelEndedCallback(event) {
      // Evento del numero ganador
      if (event !== null && event !== null) {
        numeroseleccionado = event
        colorseleccionado = event
        numeroseleccionado = numeroseleccionado.name // numero ganador
        colorseleccionado = colorseleccionado.background // color ganador

        // Vericamos si ganamos o no.
        if (this.calculandoPremio() === 0) {
          // suma las perdidas
          this.cantidadPerdida += this.montoApuesta
          // console.log('CantidadPerdida: ' + this.cantidadPerdida)
          if (this.cantidadPerdida > this.cantidadGanada) {
            // si la perdida es mayor que la ganada entonces cantidadGanada = 0
            // de igual manera la cantidadPerdida = cantidad ganada - monto apuesta
            // console.log('Cuando Perdida es mayor Ganancia: ' + this.cantidadPerdida + ' - ' + this.cantidadGanada + ' = ' + (this.cantidadPerdida - this.cantidadGanada));
            this.cantidadPerdida = this.cantidadPerdida - this.cantidadGanada
            this.cantidadGanada = 0
            // total ganado
            this.totalGanado = this.cantidadGanada

          } else if (this.cantidadGanada === this.cantidadPerdida) {
            // si tengo ganada 2000 y la apuesta es 2000 todos los montos son cero
            this.cantidadPerdida = 0
            this.cantidadGanada = 0
            this.totalGanado = 0
          } else {
            this.cantidadGanada = this.cantidadGanada - this.cantidadPerdida
            // total ganado
            this.totalGanado = this.cantidadGanada
            // console.log('Perdi Resultado CantidadGanada: ' + this.cantidadGanada);
          }

        } else {
          this.cantidadGanada += this.calculandoPremio()
          // console.log('CantidadGanada: ' + this.cantidadGanada)
          if (this.cantidadGanada > this.cantidadPerdida) {
            // console.log('Cuando Ganancia es mayor Perdida: ' + this.cantidadGanada + ' - ' + this.cantidadPerdida + ' = ' + (this.cantidadGanada - this.cantidadPerdida));
            this.cantidadGanada = this.cantidadGanada - this.cantidadPerdida
            // total ganado
            this.totalGanado = this.cantidadGanada
            this.cantidadPerdida = 0
          } else if (this.cantidadGanada === this.cantidadPerdida) {
            // si tengo ganada 2000 y la apuesta es 2000 todos los montos son cero
            this.cantidadPerdida = 0
            this.cantidadGanada = 0
            this.totalGanado = 0
          }
          else {
            this.cantidadPerdida = this.cantidadPerdida - this.cantidadGanada
            // console.log('Gane Resultado CantidadPerdida: ' + this.cantidadPerdida);
          }
        }
        //this.totalGanado = (this.cantidadGanada - this.cantidadPerdida < 0) ? 0 : this.cantidadGanada - this.cantidadPerdida   
        //console.log('Total Ganado: ' + this.totalGanado);

        var montoApuesta = this.calculandoPremio()
        var numeroParImpar = ''
        // verificamos si es PAR O IMPAR
        if (numeroseleccionado % 2 === 0) {
          numeroParImpar = 'Par'
        } else {
          numeroParImpar = 'Impar'
        }

        Swal.fire({
          title: 'NUMERO GANADOR: ' + numeroseleccionado,
          text: 'Monto Ganado: ' + montoApuesta + ' ' + numeroParImpar,
          width: 600,
          padding: '3em',
          color: 'white',
          // background: 'red url(https://sweetalert2.github.io/images/trees.png)'         url("https://sweetalert2.github.io/images/nyan-cat.gif"),
          background: colorseleccionado,
          backdrop: `
        rgba(0,0,123,0.4)
        left top
         no-repeat
        `
        })
      }
    },
    calculandoPremio() {
      // gray pertenece al color negro
      // salmon pertenece al color rojo
      // console.log('entre en calculando premio')
      var value = 0
      var color = this.colores === 'Negro' ? 'gray' : 'salmon'

      if (
        colorseleccionado === color &&
        this.parimpar === 'Seleccione Par o Impar' &&
        (this.numero === null || this.numero === 'Selecione Un Numero')
      ) {
        // acierta color ganara la mitad de la apuesta
        value = this.montoApuesta / 2
      } else if (
        numeroseleccionado % 2 === 0 &&
        colorseleccionado === color &&
        this.parimpar === 'Par'
      ) {
        // para los numeros pares
        value = this.montoApuesta
      } else if (
        numeroseleccionado % 2 !== 0 &&
        colorseleccionado === color &&
        this.parimpar === 'Impar'
      ) {
        // para los impares
        value = this.montoApuesta
      } else if (numeroseleccionado == this.numero && colorseleccionado === this.colores) {
        // color y numero acertado x3 el monto apostado
        value = this.montoApuesta * 3
      }

      // console.log('El Resultado: ' + value)
      return value
    },
    async cargarUsuarios(iduser) {
      await this.axios
        .get('https://localhost:44348/api/User',{
          params:{
            id : iduser
          }
        })
        .then((response) => {
          this.user = response.data.map((obj) => {
            this.montoInicial = obj.Monto
            // limpiando campos al cambio de otro usuario
            this.montoApuesta = 0
            this.cantidadGanada = 0
            this.cantidadPerdida = 0
            this.totalGanado = 0
            this.colores = 'Seleccione Un Color'
            this.parimpar = 'Seleccione Par o Impar'
            this.numero = null
          });
          this.userConectado = this.IdUsuario
        })
        .catch((error) => {
          console.log(error)
          this.errored = true
        })
        .finally(() => (this.loading = false));
    }
  },
  mounted() {
    this.axios
      .get('https://localhost:44348/api/Item')
      .then((response) => {
        this.Items2 = response.data
        this.userConectado = this.IdUsuario
        // console.log(this.userConectado);
      })
      .catch((error) => {
        console.log(error)
        this.errored = true
      })
      .finally(() => (this.loading = false));

    this.cargarUsuarios(this.IdUsuario);
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #080808;
  margin-top: 4px;
}
</style>
