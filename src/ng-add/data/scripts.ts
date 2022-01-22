export const ngadd_scritps = {
    "chain": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json node",
    "accounts": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json accounts",
    "compile": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json compile",
    "generate": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json generate",
    "deploy": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/deploy.ts --network localhost",
    "deploy:ropsten": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/deploy.ts --network ropsten",
    "contracts:test": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json test",
    "contracts:coverage": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json coverage",
    "watch-contract": "cd hardhat && node scripts/watch.js",
    "watch-tinker": "cd hardhat && node scripts/watch.js"
}