const app = Vue.createApp({
    data() {
        return {
            layoutMode: "list",
            data: [],
            deviceType: 'desktop'
        }
    },
    created() {
        fetch('../../assets/data.json')
            .then(response => response.json())
            .then(response => {
                this.data = response.data
            })
        this.checkDeviceType();
        this.updateLayoutMode();
    },
    mounted() {
        this.checkDeviceType();
        this.updateLayoutMode();
        window.addEventListener('resize', this.checkDeviceType);
        window.addEventListener('resize', this.updateLayoutMode);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkDeviceType);
    },
    methods: {
        checkDeviceType() {
            const width = window.innerWidth;
            if (width < 768) {
                this.deviceType = 'mobile';
            } else if (width >= 768 && width < 1024) {
                this.deviceType = 'tablet';
            } else {
                this.deviceType = 'desktop';
            }
        },
        updateLayoutMode() {
            switch (this.deviceType) {
                case 'desktop':
                    this.layoutMode = 'grid';
                    break;
                case 'tablet':
                    this.layoutMode = 'list';
                    break;
                case 'mobile':
                    this.layoutMode = 'carousel';
                    break;
            }
        }
    },
    computed: {
        isDesktopOrTablet() {
            return this.deviceType === 'desktop' || this.deviceType === 'tablet';
        }
    }
})