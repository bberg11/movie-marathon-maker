<template>
  <v-app>
    <section>
      <h1 class="title font-weight-regular">Your Marathon</h1>
      <p class="subheading">Get to work</p>
    </section>
    <section>
      <h2 class="subheading">Choose Day</h2>
      <v-dialog
        ref="startDateDialog"
        v-model="startDateModal"
        :return-value.sync="startDate"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="startDate"
          label="Start Time"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="startDate"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="updateDateTimes({value: startDate, dialog: 'startDateDialog', mutation: 'setStartDate'})">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </section>
    <section>
      <h2 class="subheading">Choose start time</h2>
      <v-dialog
        ref="startTimeDialog"
        v-model="startTimeModal"
        :return-value.sync="startTime"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="startTime"
          label="Start Time"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker
          v-if="startTimeModal"
          v-model="startTime"
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="startTimeModal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="updateDateTimes({value: startTime, dialog: 'startTimeDialog', mutation: 'setStartTime'})">OK</v-btn>
        </v-time-picker>
      </v-dialog>
    </section>
    <section v-if="marathonLength === null">
      <h2 class="subheading">Choose End time</h2>
      <v-dialog
        ref="endTimeDialog"
        v-model="endTimeModal"
        :return-value.sync="endTime"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="endTime"
          label="End Time"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker
          v-if="endTimeModal"
          v-model="endTime"
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="endTimeModal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="updateDateTimes({value: endTime, dialog: 'endTimeDialog', mutation: 'setEndTime'})">OK</v-btn>
        </v-time-picker>
      </v-dialog>
    </section>

    <section>
      <time-line
        foo="bar"
      ></time-line>
    </section>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import TimeLine from '@/components/TimeLine.vue';

export default {
  name: 'Edit',

  components: {
    TimeLine,
  },

  data () {
    return {
      startDate: null,
      startDateModal: false,
      startTime: null,
      startTimeModal: false,
      endTime: null,
      endTimeModal: false,
    };
  },

  watch: {
    startTime (newValue) {
      this.setStartTime(newValue);
    },
  },

  computed: {
    ...mapState([
      'marathonLength',
    ]),
  },

  methods: {
    ...mapMutations({
      setStartDate: 'SET_START_DATE',
      setStartTime: 'SET_START_TIME',
      setEndTime: 'SET_END_TIME',
    }),

    updateDateTimes (data) {
      this.$refs[data.dialog].save(data.value);
      this[data.mutation](data.value);

      if (this.shouldAutoSetEndTime(data.dialog)) {
        // const endTime = data.value + this.marathonLength;
        
        // this.setEndTime(endTime);
      }
    },

    shouldAutoSetEndTime (dialog) {
      if (this.marathonLength === null) { return false; }

      return dialog === 'startTimeDialog';
    },
  },
};
</script>
