<template>
    <v-app>
        <section>
            <div class="panel text-xs-center">
                <h1 class="title font-weight-regular">Create New Marathon</h1>
                <p class="subheading">Choose a preset length or design your own</p>
                <ul class="text-xs-left">
                    <li v-for="length in presetLengths">
                        <router-link 
                            to="/timeline"
                            @click.native="setMarathonLength(length.value)"
                        >
                            {{ length.title }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </section>

        <section>
            <div class="panel text-xs-center">
                <h1 class="title font-weight-regular">Load Marathon</h1>
                <ul class="text-xs-left">
                    <li v-for="marathon in savedMarathons"><a href="#">{{ marathon.name }}</a></li>
                </ul>
            </div>
        </section>
    </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Home',

    components: {},

    data () {
        return {
            presetLengths: [
                {
                    title: '8 hours',
                    value: 480
                },
                {
                    title: '10 hours',
                    value: 600
                },
                {
                    title: '12 hours',
                    value: 720
                },
                {
                    title: '24 hours',
                    value: 1440
                },
                {
                    title: 'Custom',
                    value: 0
                }
            ]
        }
    },

    computed: {
        ...mapState([
            'savedMarathons',
        ]),
    },

    methods: {
        ...mapMutations({
            setMarathonLength: 'SET_MARATHON_LENGTH'
        })
    },
}
</script>

<style lang="scss">
.panel {
    margin: 0 0 16px;
    padding: 8px;
    border: 1px solid;
}
</style>
