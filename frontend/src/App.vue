<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span> Student Profile </span>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-card width="90%" class="mx-auto mt-5 elevation-0">
        <form>
          <v-text-field v-model="name" label="Name" required></v-text-field>
          <v-text-field v-model="age" label="Age" required></v-text-field>
          <v-btn class="mr-4" @click="addStudent()"> Add student </v-btn>
        </form>
      </v-card>
      <v-card width="90%" class="mx-auto mt-10 elevation-2">
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
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        @click="setEditId(item)"
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Student Profile</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editName"
                                label="Name"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editAge"
                                label="Age"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="editStudent()"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!-- 
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="green"
                    @click="editStudent(item)"
                  >
                    <v-icon dark>mdi-pencil</v-icon>
                  </v-btn> -->
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
      editId: "",
      editName: "",
      editAge: "",
      name: "",
      age: "",
      dialog: false,
      student: [],
    };
  },
  methods: {
    setEditId: function (student) {
      this.editId = student.id;
      console.log(this.editId);
    },
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

      setTimeout(function () {
        location.reload();
      }, 1000);
    },
    deleteStudent: function (student) {
      if (confirm("Are you sure you want to delete this student?")) {
        axios
          .delete(
            "https://ld11fao915.execute-api.ap-southeast-1.amazonaws.com/production/" +
              student.id
          )
          .then((response) => console.log(response));

        setTimeout(function () {
          location.reload();
        }, 1000);
      }
    },

    editStudent: function () {
      console.log(this.setEditId);
      var studentObj = {};
      studentObj["name"] = this.editName;
      studentObj["age"] = this.editAge;
      axios
        .put(
          "https://ld11fao915.execute-api.ap-southeast-1.amazonaws.com/production/" +
            this.editId,
          studentObj
        )
        .then((response) => {
          console.log(response.status);
        });

      this.dialog = false;

      setTimeout(function () {
        location.reload();
      }, 1000);
    },

    getAllStudents: function () {
      axios
        .get(
          "https://ld11fao915.execute-api.ap-southeast-1.amazonaws.com/production/"
        )
        .then((response) => (this.student = response.data.students));
    },
  },
  mounted() {
    this.getAllStudents();
  },
};
</script>
