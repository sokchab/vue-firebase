<template>
  <div id="app" class="container">
    <div class="row mt-5">
      <div class="col-3">
        <button @click="openModal" class="btn btn-primary" type="button">Add New</button>
      </div>
    </div>
    <div class="row mt-3">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, index) in persons" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ p.name }}</td>
            <td>{{ p.gender }}</td>
            <td>{{ p.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>


   <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <form class="modal-content" @submit.prevent="onSave">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="form.name" class="form-control" placeholder="Name">
          </div>

          <div class="form-group">
            <label>Gender</label>
            <select class="form-control" v-model="form.gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div class="form-group">
            <label>Address</label>
            <input type="text" v-model="form.address" class="form-control" placeholder="Address">
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
    </form>
  </div>
</div>

  </div>
</template>

<script>
import db from './database';
import 'firebase/firestore';
import Form from 'vform';

export default {
  name: 'app',
  data () {
    return {
      persons: [],
      form: new Form({
        id: "",
        name: "",
        gender: "Male",
        address: "",
        created_at: ""
      })
    }
  },
  methods: {
    fetPersons(){
      db.firestore()
        .collection('persons')
        .orderBy('created_at', 'desc')
        .onSnapshot(query => {
          let lists = [];
          query.forEach(doc => {
            let row = doc.data();
            row.id = doc.id;

            lists.push(row);
          });

          this.persons = lists;
        });
    },
    openModal(){
      this.form.reset();
      $('#exampleModal').modal('show');
    },
    onSave(){
      db.firestore()
        .collection('persons')
        .add({
          name: this.form.name,
          gender: this.form.gender,
          address: this.form.address,
          created_at: new Date()
        }).then(() => {
          $('#exampleModal').modal('hide');
        }).catch(error => console.log(error));
    }
  },
  mounted(){
    this.fetPersons();
  }
}
</script>

<style lang="scss">

  @import "~bootstrap/dist/css/bootstrap.css";

</style>
