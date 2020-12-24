<template>
  <div id="UserModifyBalance">
    <div class="continer_user_modify_balance">
      <h2>Modificación de saldo</h2>
      <form v-on:submit.prevent="processModifyBalance">
        <input type="text" v-model="user_in.username" placeholder="Nombre de usuario" />
        <br />        
        <input type="number" min="0" v-model="user_in.balance" placeholder="Nuevo saldo" />
        <br />
        <span> {{mensajeError}} </span>
        <button type="submit">Modificar saldo</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserModifyBalance",
  data: function () {
    return {
      username: "none",
      type: "",      
      mensajeError: "",
      user_in: {
          username: "",          
          balance: ""
      }
    };
  },
  methods: {
    processModifyBalance: function () {
      var self = this;

      if(this.user_in.username.length == 0)      
        self.mensajeError = "Front: El nombre de usuario no puede estar vacío";
      else
      {
        var url = "";
        if(this.type === "modify")
          url = "http://localhost:8000/user/balance/modify/"
        else
          url = "http://localhost:8000/user/transfer/"

          axios
        .post(url, self.user_in, {
          headers: {Authentication: self.username},
        })
        .then((result) => {
          self.mensajeError = "";
          self.user_in.username = "";          
          self.user_in.balance = "";
          alert("El saldo fue modificado exitosamente");
        })
        .catch((err) => {
          self.mensajeError = err.response.data.detail;
        });
      }      
    },
  },
  created: function () {
    this.username = this.$route.params.username;
    this.type = this.$route.params.type;
  },
};
</script>

<style>
#UserModifyBalance {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.continer_user_modify_balance {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#UserModifyBalance h2 {
  color: #283747;
}
#UserModifyBalance form {
  width: 50%;
}

#UserModifyBalance form span {
  color: #e71f1f;
}
#UserModifyBalance input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}

#UserModifyBalance button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
}

#UserModifyBalance button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>