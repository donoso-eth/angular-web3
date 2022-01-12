export const ngadd_scritps = {
    "node": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json node",
    "accounts": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json accounts",
    "compile": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json compile",
    "generate": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json generate",
    "deploy": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/deploy.ts --network localhost",
    "deploy:ropsten": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/deploy.ts --network ropsten",
    "watch": "cd hardhat && node scripts/watch.js",
  
}