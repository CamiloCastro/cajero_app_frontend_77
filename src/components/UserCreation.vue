<template>
  <div id="UserCreation">
    <div class="continer_user_creation">
      <h2>Creación de cuenta</h2>
      <form v-on:submit.prevent="processCreation">
        <input type="text" v-model="user_in.username" placeholder="Nombre de usuario" />
        <br />
        <input type="password" v-model="user_in.password" placeholder="Contraseña" />
        <br />
        <input type="password" v-model="user_in.repeat_password" placeholder="Repetir contraseña" />
        <br />
        <input type="number" min="0" v-model="user_in.balance" placeholder="Valor" />
        <br />
        <span> {{mensajeError}} </span>
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserCreation",
  data: function () {
    return {
      username: "none",      
      mensajeError: "",
      user_in: {
          username: "",
          password: "",
          repeat_password: "",
          balance: ""
      }
    };
  },
  methods: {
    processCreation: function () {
      var self = this;

      if (this.user_in.password !== this.user_in.repeat_password)
        self.mensajeError = "Front: Las contraseñas no coinciden";
      else if(this.user_in.username.length == 0)      
        self.mensajeError = "Front: El nombre de usuario no puede estar vacío";
      else
      {
          axios
        .post("http://localhost:8000/user/create/", self.user_in, {
          headers: {Authentication: self.username},
        })
        .then((result) => {
          self.mensajeError = "";
          self.user_in.username = "";
          self.user_in.password = "";
          self.user_in.repeat_password = "";
          self.user_in.balance = "";
          alert("El usuario fue creado exitosamente");
        })
        .catch((err) => {
          self.mensajeError = err.response.data.detail;
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
#UserCreation {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.continer_user_creation {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#UserCreation h2 {
  color: #283747;
}
#UserCreation form {
  width: 50%;
}

#UserCreation form span {
  color: #e71f1f;
}
#UserCreation input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}

#UserCreation button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
}

#UserCreation button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>