require("@nomicfoundation/hardhat-toolbox")
require("@openzeppelin/hardhat-upgrades")
require("@nomiclabs/hardhat-ethers")
require("hardhat-deploy")
require("dotenv").config()

const POLYGON_MAINNET_RPC_URL =
    process.env.POLYGON_MAINNET_RPC_URL || "https://polygon-mainnet.alchemyapi.io/v2/your-api-key"
const MUMBAI_RPC_URL =
    process.env.MUMBAI_RPC_URL || "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY
const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY
const POLYGON_PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY

// Your API key for PolygonScan, obtain one at https://etherscan.io/
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1,
            },
        },
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
        only: ["Token", "TokenProxy"],
    },
    networks: {
        hardhat: {
            hardfork: "merge",
            forking: {
                url: POLYGON_MAINNET_RPC_URL,
                blockNumber: 0,
                enabled: false,
            },
            chainId: 31337,
            allowUnlimitedContractSize: true
        },
        localhost: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
            mining: {
                auto: true,
                interval: 30000,
            },
        },
        polygon: {
            url: POLYGON_MAINNET_RPC_URL,
            accounts: POLYGON_PRIVATE_KEY !== undefined ? [POLYGON_PRIVATE_KEY] : [],
            chainId: 137,
        },
        mumbai: {
            url: MUMBAI_RPC_URL,
            accounts: MUMBAI_PRIVATE_KEY !== undefined ? [MUMBAI_PRIVATE_KEY] : [],
            chainId: 80001,
        },
    },
    defaultNetwork: "hardhat",
    etherscan: {
        apiKey: {
            polygon: POLYGONSCAN_API_KEY,
            polygonMumbai: POLYGONSCAN_API_KEY,
        },
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
        only: ["Token"],
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./build/cache",
        artifacts: "./build/artifacts",
    },
    mocha: {
        timeout: 300000, // 300 seconds max for running tests
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        initialHolder: {
            default: 1,
        },
        recipient: {
            default: 2,
        },
        anotherAccount: {
            default: 3,
        },
    },

}
