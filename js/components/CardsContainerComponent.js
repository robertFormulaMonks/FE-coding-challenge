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
            <card-component v-for="(item, index) in data" :person="item"  v-if:="isGrid" :isSquaredCard="true"></card-component>
            <card-component v-for="(item, index) in data" :person="item"  :isSquaredCard="false" v-if:="isTablet"></card-component>
            <card-component v-for="(item, index) in data"  :person="item"  v-if:="isCarousel"  :isSquaredCard="true" :rootClass="'carousel-item'"></card-component>
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
