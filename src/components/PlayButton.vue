<template>
  <div>
    <!-- <BarChart v-if="chartData" :chartData="chartData" :options="options"></BarChart> -->
    <div class="flex flex-col lg:flex-row items-center">
      <button @click="addCount('love')" class="play-button bg-gradient-to-r from-red-500 to-red-800">
        ηΉθ΅οΌ π {{ countLove }}
      </button>
      <button
        @click="addCount('wow')"
        class="play-button bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 mx-4"
      >
        ηζ£οΌ π² {{ countWow }}
      </button>
      <button @click="addCount('unique')" class="play-button bg-gradient-to-r from-fuchsia-600 to-pink-600">
        η¬θ§ε½εοΌ π¦ {{ countUnique }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { supabase } from "../supabase"
import { idle } from "@/composable"

const countLove = ref(0)
const countWow = ref(0)
const countUnique = ref(0)

const addCount = async (name: string) => {
  name == "love" ? countLove.value++ : name == "wow" ? countWow.value++ : name == "unique" ? countUnique.value++ : ""

  await supabase.rpc("realtime_playbutton_addon", {
    a: name,
  })
}

const listenRealtime = ref()
const listen = () =>

  supabase.channel('public:realtime_playbutton').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'realtime_playbutton' }, payload => {
        const { count, name } = payload.new
        name == "love"
          ? count > countLove.value
            ? (countLove.value = count)
            : ""
          : name == "wow"
          ? count > countWow.value
            ? (countWow.value = count)
            : ""
          : name == "unique"
          ? count > countUnique.value
            ? (countUnique.value = count)
            : ""
          : ""
  }).subscribe()


  // supabase
  //   .from("realtime_playbutton")
  //   .on("UPDATE", (payload) => {
  //     console.log(payload)
  //     const { count, name } = payload.new
  //     name == "love"
  //       ? count > countLove.value
  //         ? (countLove.value = count)
  //         : ""
  //       : name == "wow"
  //       ? count > countWow.value
  //         ? (countWow.value = count)
  //         : ""
  //       : name == "unique"
  //       ? count > countUnique.value
  //         ? (countUnique.value = count)
  //         : ""
  //       : ""
  //   })
  //   .subscribe()

const fetchData = async () => {
  const { data } = await supabase.from("realtime_playbutton").select("*")
  data
    ? data.map((item: any) => {
        item.name == "love"
          ? (countLove.value = item.count)
          : item.name == "wow"
          ? (countWow.value = item.count)
          : item.name == "unique"
          ? (countUnique.value = item.count)
          : ""
      })
    : ""
}

listenRealtime.value = listen()
fetchData()

watch(idle, async (n) => {
  console.log(n,'nnnnn')
  if (n) {
    supabase.removeChannel(listenRealtime.value)
    listenRealtime.value = null
  } else {
    fetchData()
    listenRealtime.value = listen()
  }
})
</script>
