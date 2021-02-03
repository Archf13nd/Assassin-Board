<template>
    <div> 
        <section>
            <base-card>
            <h2>{{ fullName }}</h2>
            <h3>${{rate}} Million</h3>
            </base-card>
        </section>
        <section>
            <base-card>
            <header>
                <h2>Need someone dead? Contact me now</h2>
                <base-button link :to="contactLink">Contact</base-button>
            </header>
            <router-view></router-view>
            </base-card>
        </section>
        <section>
            <base-card>
                <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
                <p>{{ description }}</p>
            </base-card>
        </section>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            selectedAssassin: null
        }
    },
    computed: {
        fullName() {
            return `${this.selectedAssassin.firstName} ${this.selectedAssassin.lastName}`
        },
        areas() {
            return this.selectedAssassin.areas
        },
        rate() {
            return this.selectedAssassin.fixedRate
        },
        description() {
            return this.selectedAssassin.description
        },
        contactLink() {
            return `${this.$route.path}/${this.id}/contact`
        }
    },
    created() {
        this.selectedAssassin = this.$store.getters['assassins/assassins'].find(coach => coach.id === this.id)
    }
}
</script>