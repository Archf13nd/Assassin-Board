<template>
    <base-card>
        <h2>Find a decent assassin</h2>
        <span class="filter-option">
            <input type="checkbox" id="stealth" checked @change="setFilter"/>
            <label for="stealth">Stealth</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="knife" checked @change="setFilter"/>
            <label for="knife">Knife</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="sniper" checked @change="setFilter"/>
            <label for="sniper">Sniper</label>
        </span>
    </base-card>
</template>

<script>
export default {
    emits: ['change-filter'],
    data() {
        return {
            filters: {
                sniper: true,
                stealth: true,
                knife: true
            }
        }
    },
    methods: {
        setFilter(event) {
            const inputId = event.target.id
            const isActive = event.target.checked
            const updatedFilters = {
                ...this.filters,
                [inputId]: isActive
            }
            this.filters = updatedFilters
            this.$emit('change-filter', updatedFilters)
        }
    }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>