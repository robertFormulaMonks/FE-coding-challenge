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
        <div class="cards-container" :class="getLayourClass">
            <square-card v-for="(item, index) in data" :person="item" v-if:="isGrid"></square-card>
            <rectangle-card v-for="(item, index) in data" :person="item" v-if:="isTablet"></rectangle-card>
            <square-card :class="'carousel-item'" v-for="(item, index) in data"  :person="item" v-if:="isCarousel"></square-card>
        </div>
    `,
    computed: {
        isGrid() {
            return this.layoutMode === 'grid';
        },
        isTablet() {
            return this.layoutMode === 'list';
        },
        isCarousel() {
            return this.layoutMode === 'carousel';
        },
        getLayourClass() {
            switch (this.layoutMode) {
                case 'grid':
                    return 'web-layout';
                case 'list':
                    return 'tablet-layout';
                case 'carousel':
                    return 'mobile-layout';
            }
        }
    }
});
