<template>
    <div>
        <base-dialog :show="!!error" title="An error an error my horse for an error?" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <assassin-filter @change-filter="setFilters"></assassin-filter>
        </section>
        <section>
            <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadAssassins(true)">Refresh</base-button>
                <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as Assassin</base-button>
                <base-button v-if="isLoggedIn && !isAssassin && !isLoading" link to='/register'>Register as Assassin</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasAssassins">
                <assassin-item v-for = "assassin in filteredAssassins" 
                                        :key="assassin.id" 
                                        :id="assassin.id"
                                        :first-name="assassin.firstName"
                                        :last-name="assassin.lastName"
                                        :rate='assassin.fixedRate'
                                        :areas="assassin.areas"
                                        ></assassin-item>
            </ul>
            <h3 v-else>No assassins for hire</h3>  
            </base-card>
        </section>
    </div>
</template>

<script>
import AssassinItem from '../../components/assassins/AssassinItem.vue'
import AssassinFilter from '../../components/assassins/AssassinFilter.vue'
import BaseSpinner from '../../components/ui/BaseSpinner.vue'

export default {
    components: {
        AssassinItem,
        AssassinFilter,
        BaseSpinner
    },
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                sniper: true,
                stealth: true,
                knife: true
            }
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated
        },
        isAssassin() {
            return this.$store.getters['assassins/isAssassin']
        },
        filteredAssassins() {
            const assassins = this.$store.getters['assassins/assassins']
            return assassins.filter(assassin => {
                if (this.activeFilters.sniper && assassin.areas.includes('sniper')) {
                    return true
                }
                if (this.activeFilters.stealth && assassin.areas.includes('stealth')) {
                    return true
                }
                if (this.activeFilters.knife && assassin.areas.includes('knife')) {
                    return true
                }
                return false
            })
        },
        hasAssassins() {
            return !this.isLoading && this.$store.getters['assassins/hasAssassins']
        }
    },
    created() {
        this.loadAssassins()
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters
        },
        async loadAssassins(refresh = false) {
            this.isLoading = true
            try {
                await this.$store.dispatch('assassins/loadAssassins', {forceRefresh: refresh})
            } catch (error) {
                this.error = error.message || 'Catastrophe '
            }
            this.isLoading = false
        },
        handleError() {
            this.error = null
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>