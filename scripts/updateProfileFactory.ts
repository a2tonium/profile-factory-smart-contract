import { toNano, Address } from '@ton/core';
import { ProfileFactory } from '../wrappers/ProfileFactory';
import { NetworkProvider } from '@ton/blueprint';
import { encodeOffChainContent } from "./utils/utils"

export async function run(provider: NetworkProvider) {
    const STUDENT_ADDRESS = "0QC4hAk6Xhs4UY3dPZ3o0UbR5dnV4EeO-6I0dp13fYcsjAxo"; // 🔴 change this 

    const profileFactory = provider.open(await ProfileFactory.fromInit(Address.parse(STUDENT_ADDRESS)));

    await profileFactory.send(
        provider.sender(),
        {
            value: toNano('0.03'),
        },
        {
            $$type: 'UpdateProfileFactory',
            content: encodeOffChainContent("ipfs://bafkreihjc4vo6objiqydzb7m2y7owx5672zralpdiezgvdhryjrl54w7du"),
            cost: toNano('3'),
        },
    );
    await provider.waitForDeploy(profileFactory.address);
}


