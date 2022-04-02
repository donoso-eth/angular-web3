export const ngadd_scritps = {

initial: {"chain": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json node",
    "accounts": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json accounts",
    "compile": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json compile",
    "generate": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json generate",
    "deploy": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/deploy.ts",
    "contracts:test": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json test",
    "contracts:coverage": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json coverage",
    "watch-contract": "cd hardhat && node scripts/helpers/watch.js",
    "watch-tinker": "cd hardhat && node scripts/helpers/tinker-watch.js",
    "wire": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/helpers/wire.ts",
    "tinker": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/tinker.ts",
},
subgraph: {
    "run-graph-node": "cd services/graph-node && docker-compose up",
    "remove-graph-node": "cd graph-node && docker-compose down",
    "clean-graph-node": "rm -rf cd services/graph-node/data/",
    "codegen": "cd subgraph && graph codegen",
    "build-graph": "cd subgraph && graph build",
    "deploy-graph": "cd services/graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ GITHUB_USERNAME/your-contract",
    "create-graph-local": "cd subgraph && graph create --node http://localhost:8020/ angular-web3/your-contract",
    "remove-graph-local": "cd subgraph && graph remove --node http://localhost:8020/ angular-web3/your-contract",
    "deploy-graph-local": "cd subgraph && graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 angular-web3/your-contract"
}
}