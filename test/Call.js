const { ethers } = require("hardhat")

const targetJjson = require("../artifacts/contracts/Call.sol/Target.json")
const testJson = require("../artifacts/contracts/Call.sol/TestCall.json")

describe("Call", function () {
    async function deploy() {
        const [account] = await ethers.getSigners()

        const Target = await ethers.getContractFactory("Target")
        const target = await Target.deploy({ value: 100 })

        // const TestCall = await ethers.getContractFactory("TestCall")
        // const testCall = await TestCall.deploy()

        // const TestCall = new ethers.ContractFactory(
        //     testJson.abi,
        //     testJson.bytecode,
        //     account
        // )

        const TestCall = await ethers.getContractFactory(
            testJson.abi,
            testJson.bytecode,
            account
        )
        const testCall = await TestCall.deploy()
        // await testCall.deployTransaction.wait()

        return { account, target, testCall }
    }

    it("test calls", async function () {
        const { target, testCall } = await deploy()

        // Test call 1
        await testCall.call_1(target.address)

        let bal
        bal = await ethers.provider.getBalance(target.address)
        console.log(bal)

        // Test call 2
        await testCall.call_2(target.address)

        bal = await ethers.provider.getBalance(target.address)
        console.log(bal)

        // Test call 3
        await testCall.call_3(target.address)

        bal = await ethers.provider.getBalance(target.address)
        console.log(bal)
    })
})
