function getLifeTotals() {
    // TODO - Get life totals from all players
    // Return an array of the values

    // Get Life Totals
    const lifeTotals = document.querySelectorAll('[aria-label="Life Total"]');
    console.log("hello", lifeTotals);
    return Array.from(lifeTotals);
}