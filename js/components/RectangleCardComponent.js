app.component('rectangle-card', {
    data() {
        return {
            hasVoted: false,
            activeButton: null
        };
    },
    props: {
        person: {
            type: Object,
            required: true
        }
    },
    template: 
    /*html*/
    `
    <div class="rectangle-card">
        <div class="rectangle-card-image" :style="backgroundStyle(person.picture)">
        <div>
            <div class="rectangle-content-overlay">
                <img v-show="isThumbsUpHigher" class="rectangle-thumbs-button thumbs-vote-button-header icon-button" src="assets/img/thumbs-up.svg" alt="thumbs up" aria-label="thumbs up">
                <img v-show="!isThumbsUpHigher" class="rectangle-thumbs-button thumbs-vote-button-header icon-button" src="assets/img/thumbs-down.svg" alt="thumbs down" aria-label="thumbs down">

                <div class="rectangle-card-header-container">
                    <h2 class="card-header-name">{{ person.name }}</h2>
                    <p class="rectangle-person-description">{{ person.description }}</p>
                </div>

                <div >
                <span v-show:="!hasVoted" class="date-category">{{ relativeTime }} in {{ person.category }}</span>
                    <span v-show:="hasVoted" class="date-category">Thank you for your vote!</span>
                <vote-row @vote-event="handleVote"></vote-row>
                </div>
                
                </div>
                <votes-gauge-bar class="pin-to-bottom white-text" :positiveVotesCount="person.votes.positive" :negativeVotesCount="person.votes.negative" ></votes-gauge-bar>
                </div>
        </div>
    </div>
    `,
    computed: {
        relativeTime() {
            return dateFns.formatDistanceToNow(new Date(this.person.lastUpdated), { addSuffix: true });
        },
        isThumbsUpHigher() {
            return this.person.votes.positive > this.person.votes.negative;
        }
    },
    methods: {
        backgroundStyle(picture) {
            return {
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, #888888 19.79%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%), url('${picture}')`
            };
          },
          handleVote(voteData) {
            this.hasVoted = voteData.hasVoted;
            if (voteData.activeButton === 'thumbs-up') {
                this.person.votes.positive++;
            } else if (voteData.activeButton === 'thumbs-down'){
                this.person.votes.negative++;
            }
        }
        
    },
});
