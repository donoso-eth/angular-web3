export const configuration_options = {
    initial: {
        deps: {},
        scripts: {},
        templates_root: [
            {
                source: "./files/0-initial/hardhat",
                target: '/hardhat/'
            }],
        templates_src: [
            {
                source: "./files/0-initial/app",
                target: '/app'
            },
            {
                source: "./files/0-initial/dapp-injector",
                target: '/app/dapp-injector'
            },
        ]
    },
    helloWorldContract: {
        deps: {},
        scripts: {},
        templates: []
    }
}