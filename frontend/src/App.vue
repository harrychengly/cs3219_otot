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
          <v-text-field v-model="name" label="Name" required></v-text-field>
          <v-text-field v-model="age" label="Age" required></v-text-field>
          <v-btn class="mr-4" @click="addStudent()"> submit </v-btn>
        </form>
      </v-card>
      <v-card width="90%" class="mx-auto elevation-2">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Name</th>
                <th class="text-left">Age</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in student" :key="item.name">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.age }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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

  data() {
    return {
      name: "",
      age: "",
      student: [],
    };
  },
  methods: {
    addStudent: function () {
      var studentObj = {};
      studentObj["name"] = this.name;
      studentObj["age"] = this.age;
      axios
        .post(
          "https://ld11fao915.execute-api.ap-southeast-1.amazonaws.com/production/",
          studentObj
        )
        .then((response) => console.log(response));
    },
  },
  mounted() {
    // BEClient.loadAllStudents({}).then((response) => {
    //   if (response.status == 200) {
    //     this.data = response.data;
    //     console.log(this.data);
    //   }
    // });
    axios
      .get(
        "https://ld11fao915.execute-api.ap-southeast-1.amazonaws.com/production/"
      )
      .then((response) => (this.student = response.data.students));
  },
};
</script>
