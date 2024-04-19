app.component('square-card', {
    props: {
        person: {
            type: Object,
            required: true
        }
    },
    template: /*html*/ `
        <div class="square-card">
            <div class="card-image" :style="{ backgroundImage: 'url(' + person.picture + ')' }">
                <div class="content-overlay">
                    <h2 class="card-header-name">{{ person.name }}</h2>
                    <p class="person-description">{{ person.description }}</p>
                    
                            <span class="date-category"> {{ relativeTime }} in {{person.category}}</span>
                        
                  
                </div>
            </div>
        </div>
    `,
    computed: {
        relativeTime() {
            return dateFns.formatDistanceToNow(new Date(this.person.lastUpdated), { addSuffix: true });
          }
    }
});
