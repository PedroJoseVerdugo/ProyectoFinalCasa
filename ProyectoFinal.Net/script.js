document.addEventListener('DOMContentLoaded', function() {

    const monedasList = document.getElementById('monedas-list');

    fetch('https://v6.exchangerate-api.com/v6/f8c975868ee6a437db59716d/latest/USD')
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const conversionRates = data.conversion_rates;
                for (const currency in conversionRates) {
                    const listItem = document.createElement('li');
                    listItem.textContent = currency;
                    monedasList.appendChild(listItem);
                }
            } else {
                console.error('Hubo un error al cargar las monedas:', data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');

    fetch('https://v6.exchangerate-api.com/v6/f8c975868ee6a437db59716d/latest/USD')
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const conversionRates = data.conversion_rates;
                for (const currency in conversionRates) {
                    const optionFrom = document.createElement('option');
                    const optionTo = document.createElement('option');
                    optionFrom.value = currency;
                    optionFrom.textContent = currency;
                    optionTo.value = currency;
                    optionTo.textContent = currency;
                    fromCurrencySelect.appendChild(optionFrom);
                    toCurrencySelect.appendChild(optionTo);
                }
            } else {
                console.error('Hubo un error al cargar las monedas:', data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    const convertButton = document.getElementById('convert-button');
    if (convertButton) {
        convertButton.addEventListener('click', function() {
            const fromCurrency = fromCurrencySelect.value.toUpperCase();
            const toCurrency = toCurrencySelect.value.toUpperCase();
            const amount = document.getElementById('amount').value;

            if (!fromCurrency || !toCurrency || !amount) {
                alert('Por favor, completa todos los campos.');
                return;
            }

            fetch(`https://v6.exchangerate-api.com/v6/f8c975868ee6a437db59716d/pair/${fromCurrency}/${toCurrency}/${amount}`)
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'success') {
                        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${data.conversion_result} ${toCurrency}`;
                    } else {
                        document.getElementById('result').textContent = 'Hubo un error en la conversión.';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('result').textContent = 'Hubo un error en la conversión.';
                });
        });
    }
});
