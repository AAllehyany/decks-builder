<template>
    <div class="fixed top-0 left-0 mx-auto max-w-md bg-red-800 p-1 z-50" @click="clickAction()">
        <span class="text-white text-sm">{{item.message}}</span>
    </div>
</template>
<script>
export default {
    props: {
        item: Object,
        clickAction: Function
    }
}
</script>