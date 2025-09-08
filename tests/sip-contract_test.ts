import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.5.4/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that creating a SIP plan works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const wallet_1 = accounts.get("wallet_1")!;
        
        let block = chain.mineBlock([
            Tx.contractCall("sip-contract", "create-plan", [
                types.uint(100000000), // total amount (100 STX)
                types.uint(10000000),  // amount per interval (10 STX)
                types.uint(144),       // frequency (1 day in blocks)
                types.uint(1000),      // maturity
                types.principal(wallet_1.address)
            ], wallet_1.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        
        // Verify that the plan was created
        block.receipts[0].result.expectOk().expectUint(0);
    },
});