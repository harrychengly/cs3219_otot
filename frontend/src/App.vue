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
                <th class="text-left">Edit</th>
                <th class="text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in student" :key="item.name">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.age }}</td>
                <td>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="green"
                    @click="edit(item)"
                  >
                    <v-icon dark>mdi-pencil</v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="pink"
                    @click="deleteStudent(item)"
                  >
                    <v-icon dark>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  components: {},

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
    deleteStudent: function (student) {
      if (confirm("Are you sure you want to delete this student?")) {
        axios
          .delete(
            "https://ld11fao915.execute-api.ap-southeast-1.amazonaws.com/production/" +
              student.id
          )
          .then((response) => console.log(response));
      }
    },
  },
  mounted() {
    axios
      .get(
        "https://ld11fao915.execute-api.ap-southeast-1.amazonaws.com/production/"
      )
      .then((response) => (this.student = response.data.students));
  },
};
</script>
