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
                    <span class="date-category">{{ relativeTime }} in {{ person.category }}</span>
                    <div class="vote-ui-container"> 
                        <button v-show="!hasVoted" class="thumbs-vote-button icon-button" aria-label="thumbs up" @click="selectVoteType('thumbs-up')" :class="{ 'thumbs-active-border': activeButton === 'thumbs-up' }">
                            <img src="assets/img/thumbs-up.svg" alt="thumbs up">
                        </button>
                        <button v-show="!hasVoted" class="thumbs-vote-button icon-button" aria-label="thumbs down" @click="selectVoteType('thumbs-down')" :class="{ 'thumbs-active-border': activeButton === 'thumbs-down' }">
                            <img src="assets/img/thumbs-down.svg" alt="thumbs down">
                        </button>
                        <button class="vote-now-button" :disabled="activeButton === null" @click="vote">
                            {{voteButonText}}
                        </button>
                    </div>
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
        },
        voteButonText() {
            return this.hasVoted ? 'Vote Again' : 'Vote Now';
        }
    },
    methods: {
        selectVoteType(type) {
            this.activeButton = type;
        },
        vote() {
            if(this.voteButonText === 'Vote Again'){
                this.hasVoted = false;
                this.activeButton = null;
            }
            if (this.activeButton) {
                this.hasVoted = true;
                if (this.activeButton === 'thumbs-up') {
                    this.person.votes.positive++;
                } else {
                    this.person.votes.negative++;
                }
                this.$emit('vote', this.person.id, this.activeButton);
            }
        }
    },
});
