<template>
    <v-app class="app-main">
        <Header></Header>
        <v-main>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Header from '../../components/Header.vue'
export default {
    components: {
        Header,
    },
    name : 'app-main',
}
</script>