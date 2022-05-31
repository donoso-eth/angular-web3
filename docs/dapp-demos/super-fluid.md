# Superfluid

One of the interesting protocols we have been working on is the Superfluid Protocol. This protocol allows you, among others features, to stream money/tokens from o sender to a receiver.

As it is claimed on their website, the Superfluid protocol provides:

* Gasless transfers (once the stream is opened)
* No capital lockup
* On chain

## How to create a stream

In order to create a stream you will:

```
const createFlowOperation = sf.cfaV1.createFlow({
  flowRate: flowRate,
  receiver: recipient,
  superToken: DAIx
  // userData?: string
});
 const result = await createFlowOperation.exec(signer);

```

Where:

* flowRate is the number of tokens in wei per second
* receiver.
* superToken is the token we want to stream (DAIx is the upgrade token of DAI)

This is really simple and allow dev's to&#x20;
