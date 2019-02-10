<template>
    <v-app>
        <div>About View</div>
        <div>Foo: {{ foo }}</div>
    </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
    name: 'About',

    components: {},

    data () {
        return {
            foo: 'baz'
        }
    }
}
</script>
