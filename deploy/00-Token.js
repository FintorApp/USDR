const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const deployment_args = []

    log("\n")
    log("Deploying USDR and waiting for confirmations...")
    const USDRProxy = await deploy("USDR", {
        from: deployer,
        owner: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "FintorProxyAdmin",
                artifact: "FintorProxyAdmin",
            },
            execute: {
                methodName: "initialize",
                args: [],
            },
        },
    })

    log("\n")
}

module.exports.tags = ["Factory"]
