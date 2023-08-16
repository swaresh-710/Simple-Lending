document.addEventListener('DOMContentLoaded', async () => {
    const depositButton = document.getElementById('depositButton');
    const withdrawButton = document.getElementById('withdrawButton');
    const balanceElement = document.getElementById('balance');
    const totalDepositsElement = document.getElementById('totalDeposits');

    // Connect to the backend
    const response = await fetch('/api/getBalance');
    const data = await response.json();
    balanceElement.textContent = `${data.balance} ETH`;

    depositButton.addEventListener('click', async () => {
        const amount = document.getElementById('amount').value;
        await fetch(`/api/deposit/${amount}`, { method: 'POST' });
        location.reload();
    });

    withdrawButton.addEventListener('click', async () => {
        const amount = document.getElementById('amount').value;
        await fetch(`/api/withdraw/${amount}`, { method: 'POST' });
        location.reload();
    });

    // Get total deposits
    const totalDepositsResponse = await fetch('/api/getTotalDeposits');
    const totalDepositsData = await totalDepositsResponse.json();
    totalDepositsElement.textContent = `${totalDepositsData.totalDeposits} ETH`;
});
