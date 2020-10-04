<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-card width="90%" class="mx-auto elevation-2">
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="10"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-select
            v-model="select"
            :items="items"
            :error-messages="selectErrors"
            label="Item"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
          ></v-select>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="Do you agree?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox>

          <v-btn class="mr-4" @click="submit"> submit </v-btn>
          <v-btn @click="clear"> clear </v-btn>
        </form>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
// import { BEClient } from "../api/BackendClient";
import axios from "axios";

export default {
  name: "App",

  components: {
    // HelloWorld,
  },

  data: () => ({
    student: {
      name: "",
      age: 0,
    },
  }),
  // methods: {
  //   async getAllStudents() {
  //     const allStudents = await BEClient.loadAllStudents();
  //     console.log(allStudents.data);
  //   },
  // },
  mounted() {
    // BEClient.loadAllStudents({}).then((response) => {
    //   if (response.status == 200) {
    //     this.data = response.data;
    //     console.log(this.data);
    //   }
    // });
    axios.get("https://ld11fao915.execute-api.ap-southeast-1.amazonaws.com/production/")
      .then((response) => (console.log(response)));
  },
};
</script>
