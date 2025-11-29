import DragSelector from "./components/DragSelector.vue"

export default {
    install(app) {
        app.component('DragSelector', DragSelector)
    }
}

export { DragSelector }