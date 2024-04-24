app.component('card-component', {
    data() {
        return {
            hasVoted: false,
            activeButton: null,
            votes: getFromCookies(this.person.name.replace(/\s/g, '_')) ?? this.person.votes
        };
    },
    props: {
        person: {
            type: Object,
            required: true,
        },
        isSquaredCard: {
            type: Boolean,
            default: true,
        },
        rootClass: { 
            type: String,
            default: null
        }
    },
    template: /*html*/ `
        <div :class="[rootClass, 'square-card']" v-if="isSquaredCard">
            <div class="card-image" :style="{ backgroundImage: 'url(' + person.picture + ')' }">
                <div class="content-overlay">
                    <div class="card-header-container">
                        <img v-show="isThumbsUpCountHigher" class="thumbs-vote-button-header  icon-button" src="assets/img/thumbs-up.svg" alt="thumbs up" aria-label="thumbs up">
                        <img v-show="!isThumbsUpCountHigher" class="thumbs-vote-button-header  icon-button" src="assets/img/thumbs-down.svg" alt="thumbs down" aria-label="thumbs down">
                        <h2 class="card-header-name">{{ person.name }}</h2>
                    </div>
                    <p class="person-description">{{ person.description }}</p>
                    <span v-show:="!hasVoted" class="date-category">{{ relativeTime }} in {{ person.category }}</span>
                    <span v-show:="hasVoted" class="date-category">Thank you for your vote!</span>
                    <vote-row @vote-event="handleVote"></vote-row>
                    <votes-gauge-bar :positiveVotesCount="votes.positive" :negativeVotesCount="votes.negative"></votes-gauge-bar>
                </div>
            </div>
        </div>
        <div :class="[rootClass, 'rectangle-card']" v-if="!isSquaredCard">
        <div class="rectangle-card-image" :style="backgroundStyle(person.picture)">
        <div>
            <div class="rectangle-content-overlay">
                <img v-show="isThumbsUpCountHigher" class="rectangle-thumbs-button thumbs-vote-button-header icon-button" src="assets/img/thumbs-up.svg" alt="thumbs up" aria-label="thumbs up">
                <img v-show="!isThumbsUpCountHigher" class="rectangle-thumbs-button thumbs-vote-button-header icon-button" src="assets/img/thumbs-down.svg" alt="thumbs down" aria-label="thumbs down">

                <div class="rectangle-card-header-container">
                    <h2 class="card-header-name">{{ person.name }}</h2>
                    <p class="rectangle-person-description">{{ person.description }}</p>
                </div>

                <div :style="{ 'padding-top': '10px' }">
                <span v-show:="!hasVoted" class="date-category">{{ relativeTime }} in {{ person.category }}</span>
                    <span v-show:="hasVoted" class="date-category">Thank you for your vote!</span>
                <vote-row @vote-event="handleVote"></vote-row>
                </div>
                
                </div>
                <votes-gauge-bar class="pin-to-bottom white-text " :positiveVotesCount="votes.positive" :negativeVotesCount="votes.negative"></votes-gauge-bar>
                </div>
        </div>
    </div>
    `,
    computed: {
        relativeTime() {
            return dateFns.formatDistanceToNow(new Date(this.person.lastUpdated), { addSuffix: true });
        },
        isThumbsUpCountHigher() {
            return this.person.votes.positive > this.person.votes.negative;
        },
    },
    methods: {
        handleVote(voteData) {
            this.hasVoted = voteData.hasVoted;
            if (voteData.activeButton === 'thumbs-up') {
                this.votes.positive++;
                saveToCookies(this.person.name.replace(/\s/g, '_'), this.votes);
            } else if (voteData.activeButton === 'thumbs-down'){
                this.votes.negative--;
                saveToCookies(this.person.name.replace(/\s/g, '_'), this.votes);
            }
        },
        backgroundStyle(picture) {
            return {
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, #888888 19.79%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%), url('${picture}')`
            };
          }
    },
});
