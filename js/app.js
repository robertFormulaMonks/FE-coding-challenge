const app = Vue.createApp({
    data() {
        return {
            layoutMode: "list",
            data: [],
            isDesktop: false
        }
    },
    created() {
        //fetch data from json file
        fetch('../../assets/data.json')
            .then(response => response.json())
            .then(response => {
                this.data = response.data
            })
        //Mobile detection
        this.isDesktop = window.innerWidth > 768; 
        this.layoutMode = this.isDesktop ? 'grid' : 'list';
        window.addEventListener('resize', () => {
            this.layoutMode = this.isDesktop ? 'grid' : 'list';
            this.isDesktop = window.innerWidth > 768;
        });
    },
    methods: {
        changeLayoutMode(event) {
            this.layoutMode = event.target.value
        }
    },
})