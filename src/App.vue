<template>
  <div id="app">
    <div class="header">
      <h1>Banco UN</h1>
      <nav>
        <button v-on:click="init" v-if="is_auth">Inicio</button>

        <button v-on:click="getBalance" v-if="is_usuario">Saldo</button>
        <button v-on:click="doTransaction" v-if="is_usuario">Transacción</button>
        <button v-on:click="doTransfer" v-if="is_usuario">Transferencia</button>

        <button v-on:click="getUserCreation" v-if="is_banco">Crear cuenta</button>
        <button v-on:click="getModifyBalance" v-if="is_banco">Modificar saldo</button>

        <button v-on:click="getRole" v-if="is_auth">Cambiar rol</button>
        <button v-on:click="logOut" v-if="is_auth">Cerrar Sesión</button>
      </nav>
    </div>
    <div class="main-component">
      <router-view v-on:log-in="logIn"></router-view>
    </div>
    <div class="footer">
      <h2>Misión TIC 2022</h2>
    </div>
  </div>
</template>

<script>
import vueRouter from "vue-router";

export default {
  name: "App",
  components: {},
  data: function () {
    return {
      is_auth: localStorage.getItem("isAuth") || false,
      is_banco: localStorage.getItem("current_role") === "BANCO",
      is_usuario: localStorage.getItem("current_role") === "USUARIO"
    };
  },
  methods: {
    updateAuth: function () {
      var self = this;
      self.is_auth = localStorage.getItem("isAuth") || false;
      self.is_banco = localStorage.getItem("current_role") === "BANCO";
      self.is_usuario = localStorage.getItem("current_role") === "USUARIO";
      if (self.is_auth == false) self.$router.push({ name: "user_auth" });
      else {
        let username = localStorage.getItem("current_username");
        self.$router.push({ name: "user", params: { usuario: username } });
      }
    },

    logIn: function (username, current_role) {
      localStorage.setItem("current_username", username);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("current_role", current_role);
      this.updateAuth();
    },

    logOut: function () {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("current_username");
      localStorage.removeItem("current_role");
      this.updateAuth();
    },

    init: function () {
      if (this.$route.name != "user") {
        let username = localStorage.getItem("current_username");
        this.$router.push({ name: "user", params: { usuario: username } });
      }
    },
    getBalance: function () {
      if (this.$route.name != "user_balance") {
        let username = localStorage.getItem("current_username");
        this.$router.push({
          name: "user_balance",
          params: { username: username },
        });
      }
    },
    doTransaction: function () {
      let username = localStorage.getItem("current_username");
      this.$router.push({
        name: "user_transaction",
        params: { username: username },
      });
    },
    getRole: function () {
      let username = localStorage.getItem("current_username");
      this.$router.push({
        name: "user_role",
        params: { username: username },
      });
    },
    getUserCreation: function () {
      let username = localStorage.getItem("current_username");
      this.$router.push({
        name: "user_creation",
        params: { username: username },
      });
    },
    getModifyBalance: function () {
      let username = localStorage.getItem("current_username");
      this.$router.push({
        name: "user_modify_balance",
        params: { username: username , type:"modify"},
      });
    },
    doTransfer: function () {
      let username = localStorage.getItem("current_username");
      this.$router.push({
        name: "user_modify_balance",
        params: { username: username , type: "transfer"},
      });
    }
  },
  created: function () {
    this.$router.push({ name: "root" });
    this.updateAuth();
  },
};
</script>

<style>
body {
  margin: 0 0 0 0;
}
.header {
  margin: 0%;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;
  background-color: #283747;
  color: #e5e7e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h1 {
  width: 20%;
  text-align: center;
}
.header nav {
  height: 100%;
  width: 55%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}
.header nav button {
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 20px;
}
.header nav button:hover {
  color: #283747;
  background: #e5e7e9;
  border: 1px solid #e5e7e9;
}
.main-component {
  height: 75vh;
  margin: 0%;
  padding: 0%;
  background: #fdfefe;
}
.footer {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;
  background-color: #283747;
  color: #e5e7e9;
}
.footer h2 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
