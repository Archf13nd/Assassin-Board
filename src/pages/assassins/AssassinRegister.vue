<template>
<div>
    <section>
        <base-card>
            <h1>Register as an Assassin</h1>
            <assassin-form @save-data="saveData"></assassin-form>
        </base-card>
    </section>
</div>
</template>


<script>
import AssassinForm from '../../components/assassins/AssassinForm.vue'

export default {
    components: {
        AssassinForm
    },
    methods: {
        saveData(data) {
            this.$store.dispatch('assassins/registerAssassin', data)
            this.$router.replace('/assassins')
        }
    }
    
}
</script>

