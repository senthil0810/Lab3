document.addEventListener('DOMContentLoaded', () => {
    const billTotalInput = document.getElementById('billTotal');
    const tipSlider = document.getElementById('tipSlider');
    const tipPercentageDisplay = document.getElementById('tipPercentageDisplay');  
    const tipAmountInput = document.getElementById('tipAmount');
    const totalWithTipInput = document.getElementById('totalWithTip');
    const currencySelect = document.getElementById('currency');
    const errorMessageDiv = document.getElementById('errorMessage');

    const currencyRates = {
        'USD': 1,
        'INR': 84.07,
        'JPY': 149.34
    };

    function calculateTip() {
        // Clear any previous error messages
        errorMessageDiv.style.display = 'none';
        errorMessageDiv.textContent = '';

        // Get the Bill Total
        let billTotal = parseFloat(billTotalInput.value);

        // Get the Tip Percentage from the slider
        let tipPercentage = parseInt(tipSlider.value);

        // Validate input
        if (isNaN(billTotal) || billTotal <= 0) {
            // Show error message if the input is invalid
            errorMessageDiv.textContent = "Please enter a valid positive number for Bill Total.";
            errorMessageDiv.style.display = 'block';  // Make error visible
            return;
        }

        // Calculate the Tip Amount and Total Amount with Tip
        let tipAmount = (billTotal * tipPercentage) / 100;
        let totalWithTip = billTotal + tipAmount;

        // Get the selected currency and adjust values
        let selectedCurrency = currencySelect.value;
        let conversionRate = currencyRates[selectedCurrency];

        // Convert amounts to the selected currency
        tipAmount = (tipAmount * conversionRate).toFixed(2);
        totalWithTip = (totalWithTip * conversionRate).toFixed(2);

        // Update the UI with the calculated values
        tipPercentageDisplay.textContent = tipPercentage;  // Update the percentage display
        tipAmountInput.value = `${selectedCurrency} ${tipAmount}`;
        totalWithTipInput.value = `${selectedCurrency} ${totalWithTip}`;
    }

    // Event listeners to trigger calculation whenever inputs change
    billTotalInput.addEventListener('input', calculateTip);  // Bill total change triggers calculation
    tipSlider.addEventListener('input', calculateTip);       // Tip percentage change triggers calculation
    currencySelect.addEventListener('change', calculateTip); // Currency change triggers calculation
});
