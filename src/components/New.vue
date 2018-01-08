<template>
  <div class="">
    <h2>Ajouter une vidéo</h2>
    <form action="">
        <label>
            Url:
            <input type="text" />
        </label>
        <label>
            Description:
            <input type="text" />
        </label>
        <label>
            Légende :
            <input type="text" />
        </label>
        <button type="submit">Valider</button>
        <button>Annuler</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "New",
  data() {
    return {
      msg: "C'est le New"
    };
  }
};
</script>

<style scoped>

</style>