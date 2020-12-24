<template>
  <div id="UserRole">
    <div class="continer_user_role">
      <h2>Cambiar rol {{ username }}</h2>
      <form v-on:submit.prevent="processRole">

        <select v-model="selectedRole">
          <option v-for="role in userRoles" v-bind:key="role.role_name">

            {{ role.role_name }}

          </option>
        </select>
        
        <br />        
        <button type="submit">Cambiar rol</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRole",
  data: function () {
    return {
      username: "none",
      selectedRole: localStorage.getItem("current_role"),
      userRoles: []      
    };
  },
  methods: {
    processRole: function () {
      var self = this;
      localStorage.setItem("current_role", this.selectedRole);
      this.$router.go();
    },
  },
  created: function () {
    this.username = this.$route.params.username;
    var self = this;
    axios.get("http://localhost:8000/user/roles/" + this.username)
    .then((result) => {
      self.userRoles = result.data;
    })
    .catch((error) => {
      alert("No se pudieron consultar los roles.")
    });

  },
};
</script>

<style>
#UserRole {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.continer_user_role {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#UserRole h2 {
  color: #283747;
}
#UserRole form {
  width: 50%;
}

#UserRole form span {
  color: #e71f1f;
}
#UserRole select {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}

#UserRole button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
}

#UserRole button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>