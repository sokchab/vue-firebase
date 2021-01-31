<template>
  <div id="app" class="container">
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
</template>

<script>
import db from './database';
import 'firebase/firestore';

export default {
  name: 'app',
  data () {
    return {
      persons: []
    }
  },
  methods: {
    fetPersons(){
      db.firestore()
        .collection('persons')
        .onSnapshot(query => {
          let lists = [];
          query.forEach(doc => {
            let row = doc.data();
            row.id = doc.id;

            lists.push(row);
          });

          this.persons = lists;
        });
    }
  },
  mounted(){
    this.fetPersons();
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
