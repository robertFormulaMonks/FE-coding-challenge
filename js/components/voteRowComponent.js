app.component('vote-row', {
    data() {
        return {
            hasVoted: false,
            activeButton: null
        }
    },
    template:
    /*html*/
    `<div class="vote-ui-container"> 
    <button v-show="!hasVoted" class="thumbs-vote-button icon-button" aria-label="thumbs up" @click="selectVoteType('thumbs-up')" :class="{ 'thumbs-active-border': activeButton === 'thumbs-up' }">
        <img src="assets/img/thumbs-up.svg" alt="thumbs up">
    </button>
    <button v-show="!hasVoted" class="thumbs-vote-button icon-button" aria-label="thumbs down" @click="selectVoteType('thumbs-down')" :class="{ 'thumbs-active-border': activeButton === 'thumbs-down' }">
        <img src="assets/img/thumbs-down.svg" alt="thumbs down">
    </button>
    <button class="vote-now-button" :disabled="activeButton === null" @click="vote">
        {{voteButonText}}
    </button>
    </div>`,
    methods: {
    
        vote() {

            let data  = {
      
                hasVoted: false,
                activeButton: this.voteButonText
            }

            if(this.voteButonText === 'Vote Again'){
                this.hasVoted = false;
                this.activeButton = null;
                this.$emit('vote-event', {
                    hasVoted: this.hasVoted,
                    activeButton: this.activeButton
                });
            }
            if (this.activeButton) {
                this.hasVoted = true;

                this.$emit('vote-event', {
                    hasVoted: this.hasVoted,
                    activeButton: this.activeButton
                });
            }
        },
        selectVoteType(type) {
            this.activeButton = type;
        },
    },
    computed: {
        voteButonText() {
            return this.hasVoted ? 'Vote Again' : 'Vote Now';
        }
        
    }
})