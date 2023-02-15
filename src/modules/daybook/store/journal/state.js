
export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Proident ipsum amet aliqua et aliquip exercitation minim amet est.',
            picture: null,
        },
        {
            id: new Date().getTime() + 1000,
            date: new Date().toDateString(),
            text: 'Esse cillum exercitation ex commodo id fugiat est culpa aute dolore nulla sint eu.',
            picture: null,
        },
        {
            id: new Date().getTime() + 2000,
            date: new Date().toDateString(),
            text: 'Consectetur dolor deserunt eiusmod mollit proident duis duis officia reprehenderit id ipsum.',
            picture: null,
        },
    ]
})