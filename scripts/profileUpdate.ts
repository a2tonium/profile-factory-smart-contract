import { toNano, Address, beginCell } from '@ton/core';
import { ProfileFactory } from '../wrappers/ProfileFactory';
import { Profile } from '../wrappers/Profile';
import { NetworkProvider } from '@ton/blueprint';
import { encodeOffChainContent } from "./utils/utils"

export async function run(provider: NetworkProvider) {
    const STUDENT_ADDRESS = "0QC4hAk6Xhs4UY3dPZ3o0UbR5dnV4EeO-6I0dp13fYcsjAxo"; // 🔴 change this 
    const PROFILE_CONTENT = encodeOffChainContent("ipfs://bafkreiagbirf6vxelu7rewv5vhf4gtrebmykpqnljniqqysmg4xkprvrhm");

    const profileFactory = provider.open(await ProfileFactory.fromInit(Address.parse(STUDENT_ADDRESS)));
    const profile = provider.open(await Profile.fromInit(profileFactory.address, 0n));
    
    await profile.send(
        provider.sender(),
        {
            value: toNano('0.005'),
        },
        {
            $$type: 'Transfer',
            query_id: 0n,
            new_owner: null,
            response_destination: null,
            custom_payload: PROFILE_CONTENT,
            forward_amount: null,
            forward_payload: null,
        }
    );
}
