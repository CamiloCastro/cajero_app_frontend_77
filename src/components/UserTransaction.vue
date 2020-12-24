<template>
  <div id="UserTransaction">
    <div class="continer_user_transaction">
      <h2>Transacción {{ username }}</h2>
      <form v-on:submit.prevent="processTransaction">
        <input type="number" min="0" v-model="value" placeholder="Valor" />
        <br />
        <span> {{mensajeError}} </span>
        <button type="submit">Hacer Transacción</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserTransaction",
  data: function () {
    return {
      username: "none",
      value: "",
      mensajeError: ""
    };
  },
  methods: {
    processTransaction: function () {
      var self = this;
      let transaction_in = {
        username: this.username,
        value: this.value,
      };

      if(this.value < 0)
        this.mensajeError = "El valor de la transacción debe ser positivo FRONT"
      else {
        axios
        .put("http://127.0.0.1:8000/user/transaction/", transaction_in, {
          headers: {},
        })
        .then((result) => {
          this.mensajeError = "";
          alert(
            "Transaction Correcta, Saldo Restante: " +
              result.data.actual_balance
          );
        })
        .catch((err) => {
          if(err.response.status == 400)
            this.mensajeError = "El valor de la transacción debe ser positivo"
          else if(err.response.status == 422)
            this.mensajeError = "El valor de la transacción debe ser numérico"
          else
            this.mensajeError = "Saldo Insuficiente";
        });
      }
    },
  },
  created: function () {
    this.username = this.$route.params.username;
  },
};
</script>

<style>
#UserTransaction {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.continer_user_transaction {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#UserTransaction h2 {
  color: #283747;
}
#UserTransaction form {
  width: 50%;
}

#UserTransaction form span {
  color: #e71f1f;
}
#UserTransaction input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}

#UserTransaction button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
}

#UserTransaction button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>