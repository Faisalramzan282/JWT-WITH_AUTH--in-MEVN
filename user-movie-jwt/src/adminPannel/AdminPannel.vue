<template>
  <div class="bg-zinc-400 ">
    <div class="">
      <p>Admin Pannel</p>
    </div>
    <div>
      <div class="m-5 flex justify-around relative">
        <p>ID</p>
        <p>Current Role</p>
        <p>username</p>
        <p>Change Role</p>
      </div>
      <ul>
        <li v-for="user in fetchAllUser[0]" :key="user._id">
          <div class="m-5 flex justify-around">
            <p>{{ user._id }}</p>
            <p>{{ user.role }}</p>
            <p>{{ user.username }}</p>
            <div>
              <button class="bg-slate-300 p-2 rounded" @click="submitRoleForm(user)">
                Change Role
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserHomePage",
  computed: {
    ...mapGetters({ fetchAllUser: "movies/get_user_admin_pannel" }),
  },
  methods: {
    ...mapActions({
      fetchUser: "movies/fetchAllUsers",
      role_selection: "movies/role_selection",
    }),
    async submitRoleForm(user) {
      if (user.role == "admin") {
        user.role = "user";
      } else {
        user.role = "admin";
      }
      const userInfo = {
        id: user._id,
        role: user.role,
      };
      await this.role_selection(userInfo);
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>