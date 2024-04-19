app.component('cards-container-component', {
    props: {
        data: {
            type: Array,
            required: true
        },
        layoutMode: {
            type: String,
            required: true
        }
    },
    template: 
    /*html*/
    `
        <div class="cards-container" :class="[isGrid ? 'web-layout' : 'mobile-layout']">
            <square-card v-for="(item, index) in data" :person="item" v-if="isGrid"></square-card>
        </div>
    `,
    computed: {
        isGrid() {
            return this.layoutMode === 'grid';
        }
    }
});
