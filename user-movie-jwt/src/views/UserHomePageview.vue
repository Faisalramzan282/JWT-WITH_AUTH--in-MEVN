<template>
    <div>
        <UserHomePage />
        <!-- <router-view/> -->
    </div>
</template>
<script>
import UserHomePage from '@/UserComponent/UserHomePage.vue'
export default {
    name: "UserHomepageview",
    components: {
        UserHomePage
    }
}
</script>