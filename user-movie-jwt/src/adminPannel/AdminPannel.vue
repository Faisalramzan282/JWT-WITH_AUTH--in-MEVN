<template>
  <div>
    <p>Admin Pannel</p>
    <div>
      <ul>
        <li v-for="user in fetchAllUser[0]" :key="user._id">
          <div class="border-solid border-2 border-sky-500 m-2">
            <p>User_id: {{ user._id }}</p>
            <p>User Role is: {{ user.role }}</p>
            <div>
              <button
                class="bg-slate-300 p-2 rounded"
                @click="submitRoleForm(user)"
              >
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
    ...mapGetters({ fetchAllUser: "get_user_admin_pannel" }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      fetchUser: "fetchAllUsers",
      role_selection: "role_selection",
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
      // console.log("selected key is ==>", user._id);
      // console.log("selected Role is ===>", user.role);
      await this.role_selection(userInfo);
      // this.selectedRole = ''
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>