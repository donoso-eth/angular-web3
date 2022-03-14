export const ngadd_scritps = {
    "chain": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json node",
    "accounts": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json accounts",
    "compile": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json compile",
    "generate": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json generate",
    "deploy": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/deploy.ts --network localhost",
    "deploy:ropsten": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/deploy.ts --network ropsten",
    "contracts:test": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json test",
    "contracts:coverage": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json coverage",
    "watch-contract": "cd hardhat && node scripts/helpers/watch.js",
    "watch-tinker": "cd hardhat && node scripts/helpers/tinker-watch.js",
    "wire": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/helpers/wire.ts",
    "tinker": "cd hardhat && npx hardhat --tsconfig ./tsconfig.hardhat.json run ./scripts/tinker.ts",
    "graph-node-run": "cd graph-node && docker-compose up",
    "graph-node-remove": "cd graph-node && docker-compose down",
    "graph-node-clean": "rm -rf graph-node/data/",
    "subgraph-codegen": "graph codegen",
    "subgraph-build": "graph build",
    "subgraph-deploy": "graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ GITHUB_USERNAME/your-contract",
    "subgraph-create-local": "graph create --node http://localhost:4200/ GITHUB_USERNAME/your-contractt",
    "subgraph-remove-local": "graph remove --node http://localhost:4200/ GITHUB_USERNAME/your-contract",
    "subgraph-deploy-local": "graph deploy --node http://localhost:4200/ --ipfs http://localhost:5001  GITHUB_USERNAME/your-contract"

}