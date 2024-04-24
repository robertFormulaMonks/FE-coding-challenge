app.component('votes-gauge-bar', {
    props: {
        positiveVotesCount: {
            type: Number,
            required: true
        },
        negativeVotesCount: {
            type: Number,
            required: true
        }
    },
    template: /*html*/ `
        <div class="progress-bar-container">
            <div class="tumbs-filled-bar" :style= "{ width: thumsUpPercentaje, 'background-color': 'rgba(60, 187, 180, 0.6)', 'justify-content': 'flex-start', 'flex-direction': 'row' }">
            <img src="assets/img/thumbs-up.svg" alt="thumbs up">
            <span>{{ thumsUpPercentaje }}</span>
            </div>
            <div class="tumbs-filled-bar" :style= "{ width: thumbsDownPercentaje, 'background-color': 'rgba(249, 173, 29, 0.6)', 'flex-direction': 'row-reverse' }">
            <img src="assets/img/thumbs-down.svg" alt="thumbs down">
            <span>{{ thumbsDownPercentaje }}</span>
            </div>
        </div>
    `,
    computed: {
        thumsUpPercentaje() {
            let percentaje = this.positiveVotesCount / (this.positiveVotesCount + this.negativeVotesCount) * 100;

            return percentaje.toFixed(1) + '%';
        },
        thumbsDownPercentaje() {
            let percentaje = this.negativeVotesCount / (this.positiveVotesCount + this.negativeVotesCount) * 100;
            return percentaje.toFixed(1) + '%';
        }
    }
})