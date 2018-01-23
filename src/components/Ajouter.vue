<template>
  <div id="container">
    <form action="" method="">
      <div class="input-block">
        <label for="Title">Titre :</label>
        <input type="text" name="title" id="title" placeholder="Nouveau titre">
      </div>
      <div class="input-block">
        <label for="authors">Auteurs :</label>
        <select name="authors" id="authors">
          <option v-for="(value, index) in authors">
            {{authors[index].firstname}}  {{ authors[index].lasname }}
          </option>

        </select>
      </div>
      <div class="input-block">
        <label for="date">Date :</label>
        <input type="date" id="date" name="date">
      </div>
      <div class="input-block">
        <label for="thematique">Thematique :</label>
        <select class="" name="thematique" id="thematique"  @change="showInput">
          <option value="Frameworks JS">Frameworks JS</option>
          <option value="CSS">CSS</option>
          <option value="Javascript">Javascript</option>
          <option value="PHP">PHP</option>
          <option value="Ajouter thématique">Ajouter thématique</option>
        </select>
      </div>
      <div class="input-block">
        <label for="nouvelle-thematique" v-show="inputVisible">Ajouter une thématique :</label>
        <input type="text" id="nouvelle-thematique" placeholder="Ajouter thématique" v-show="inputVisible">
      </div>
      <div class="input-block">
        <label for="informations">Informations :</label>
        <textarea name="informations" id="informations" rows="5" cols="30" placeholder="Détails et commentaires"></textarea>
      </div>
    </form>
  </div>
</template>



<script>
/* eslint-disable */
import authors from '../authors.json'

export default {
  name: 'Ajouter',
  data () {
    return {
      inputVisible: false,
      authors : authors
    }
  },
  methods : {
    showInput() {
      let selectedOption = this.$el.querySelector('#thematique').value
      console.log(selectedOption)
      console.log(this.inputVisible)
      console.log(this.authors[0].firstname)
      if (selectedOption == 'Ajouter thématique') {
        this.inputVisible == false ? this.inputVisible = true : this.inputVisible = false
      }
    }

  }
}


</script>


<!--STYLES  -->
<style lang="scss">

.input-block {
  max-width: 600px;
  display: flex;
  justify-content: flex-start;
  margin: 10px 10px;
}

select {
  border: 1px dotted grey;
}

input, textarea {
  border: 1px solid grey;
}



</style>
