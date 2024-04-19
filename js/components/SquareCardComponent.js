app.component('square-card', {
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
    template: /*html*/ `
        <div class="square-card">
            <div class="card-image" :style="{ backgroundImage: 'url(' + person.picture + ')' }">
                <div class="content-overlay">
                    <div class="card-header-container">
                        <img v-show="isThumbsUpHigher" class="thumbs-vote-button-header  icon-button" src="assets/img/thumbs-up.svg" alt="thumbs up" aria-label="thumbs up">
                        <img v-show="!isThumbsUpHigher" class="thumbs-vote-button-header  icon-button" src="assets/img/thumbs-down.svg" alt="thumbs down" aria-label="thumbs down">
                        <h2 class="card-header-name">{{ person.name }}</h2>
                    </div>
                    <p class="person-description">{{ person.description }}</p>
                    <span v-show:="!hasVoted" class="date-category">{{ relativeTime }} in {{ person.category }}</span>
                    <span v-show:="hasVoted" class="date-category">Thank you for your vote!</span>
                    <vote-row @vote-event="handleVote"></vote-row>
                    <votes-gauge-bar :positiveVotesCount="person.votes.positive" :negativeVotesCount="person.votes.negative"></votes-gauge-bar>
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
