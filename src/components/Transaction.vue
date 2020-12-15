<template>
    <div id="Transaction">        
        Cantidad: <input type="text" placeholder="Cantidad" v-model="value" /><br />
        <button v-on:click="makeTransaction">Hacer transacción</button>
        <br />
        <br />
        <br />

        <table>
            <tr>
                <th>Id de la transacción</th>
                <th>Fecha de la transacción</th>
                <th>Valor de la transacción</th>
            </tr>
            <tr v-for="t in transactions" v-bind:key="t.id_transaction">
                <td>{{ t.id_transaction }}</td>
                <td>{{ t.date }}</td>
                <td>{{ t.value }}</td>
            </tr>
        </table>
    </div>    
</template>

<script>
import axios from "axios";

export default {
    name: "Transaction",
    data: function () {
        return {
            value: 0,
            transactions: [],
            username: localStorage.getItem("current_username")  
        };
    },
    methods: {
        makeTransaction: function()
        {
            var data = {
                username: this.username,
                value: this.value
            }

            axios.put("http://localhost:8000/user/transaction/", data)
            .then(response => {
                alert("La transacción se realizó con exito");
                //this.$router.push({name: "transaction"});
                //this.$router.push({name: "user_balance", params: { username: data.username } });
            })
            .catch((error) => {
                alert("ERROR Servidor");
            });

        }
    },
    created: function() {
        let mine = this;

        axios.get("http://localhost:8000/user/transactions/" + this.username)
        .then(response => {

            var ts = response.data
            for(let i = 0; i < ts.length; i++) {                
                ts[i].date = ts[i].date.split("T")[0]            
            }
            mine.transactions = ts            
        })
        .catch(error => {
            
            alert("Error de servidor")
        })


    }    
}
</script>

<style>
td {
    text-align: center;
}
</style>