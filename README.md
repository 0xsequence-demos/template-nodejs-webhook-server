# template-nodejs-webhook-server
a simplified nodejs server that creates a secret uuid endpoint, only to be known by the Sequence Indexer endpoint to ensure noone else can call your code

## how to
1. clone down repo
2. `$ mv .env.example .env` and complete the `NGROK_ENDPOINT=`
3. `$ pnpm install`
4. `$ npx nodemon index.ts`
5. register the endpoint that gets printed to terminal in [example webhook code](https://docs.sequence.xyz/api/indexer/examples/webhook-listener) 
6. to have your webhook called by Sequence, mint a collectible from the [Sequence Builder](https://sequence.build) for the registered contract address in step 5

## return responses from Sequence Webhook Service
* Response: POST /<your_endpoint_id>
* Content-Type: application/octet-stream
* Body (in raw, to be parsed):
    * `id` (number) -- id of the request
    * `type` (string) -- the type of indexed response (i.e. `BLOCK_ADDED`)
    * `blockNumber` (number) -- the block number from the blockchain
    * `blockHash` (string) -- the block header hash of the block the event was included in from the blockchain
    * `parentBlockHash` (string) -- the block hash of the parent block
    * `contractAddress` (string) -- the contract address that is being listened to
    * `contractType` (string) -- whether the contract type is an `ERC20`, `ERC721`, or `ERC1155`
    * `txnHash` (string) -- the transaction hash of where the event is included in
    * `txnIndex` (number) -- the position of a transaction in a block
    * `txnData` (object) -- the native transaction details
        * `from` (string) -- the wallet / contract address for who sent the transaction
        * `to` (string) -- the wallet / contract address for who the transaction is for
        * `value` (string) -- the value of the transaction
    * `txnLogIndex` (number) -- the position of the logged event in the block
    * `logDataType` (string) -- the type of event log (e.g. `TOKEN_TRANSFER`)
    * `ts` (datetime) -- the time and date of the event
    * `Log` (object) -- an object containing the log information
        * `raw`
            * `address` (string) -- the contract address the event is emitted from
            * `topics` ([string]) -- an array of indexed topic hashes, (e.g. computed as ethers.utils.id("Transfer(address,address,uint256)"))
            * `data` (string) -- the calldata of the transaction
            * `blockNumber` (string) -- the block number in hex
            * `transactionHash` (string) -- the hash of the transaction for the block
            * `transactionIndex` (string) -- the position in hex of the transaction in the block
            * `blockHash` (string) -- the hash of the block the transaction is for
            * `logIndex` (string) -- the index in hex of the log event emitted
        * `contractType` (string) -- whether the contract type is an `ERC20`, `ERC721`, or `ERC1155`
        * `transferEvent` ([object]) -- the transfered event details
            * object
                * `operator` (string) -- the initiator of the transaction
                * `from` (string) -- the address transfer event is from
                * `to` (string) -- the address the transfer event is to
                * `tokenIds` ([string]) -- a list of the token IDs
                * `amounts` ([string]) -- the respective to the token IDs, the amount the transfer event is for
