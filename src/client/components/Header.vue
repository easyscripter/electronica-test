<template>
    <v-app-bar app color="blue">
        <v-app-bar-title class="mr-4">
            Электроника ПСЦ
        </v-app-bar-title>
        <div>
            <v-btn text to="/users">
                Пользователи
            </v-btn>
        </div>
    </v-app-bar>
</template>

<script>
    export default {
        name: 'Header',
    }
</script>