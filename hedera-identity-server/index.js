const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar } = require("@hashgraph/sdk");

async function main() {
    // Initialize the client with testnet (or mainnet) credentials
    const client = Client.forTestnet();
    client.setOperator("your-account-id", "your-private-key");

    // Example: Creating a new Hedera account (could be the basis for a DID)
    const newAccountPrivateKey = PrivateKey.generate();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    const newAccountTransaction = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(1000))
        .execute(client);

    const receipt = await newAccountTransaction.getReceipt(client);
    const newAccountId = receipt.accountId;
    console.log(`New account ID: ${newAccountId}`);

    // Query the balance of the newly created account
    const balance = await new AccountBalanceQuery()
        .setAccountId(newAccountId)
        .execute(client);

    console.log(`New account balance: ${balance.hbars.toTinybars()} tinybars`);
}

main();