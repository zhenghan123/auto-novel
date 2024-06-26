import { SfacgClient } from "../api/client";
import { _SfacgCache } from "./cache";

export class _Total {
    private Client: SfacgClient; // 假设的客户端类型
    private success: string[] = []; // 成功日志
    private failed: string[] = []; // 失败日志

    constructor(Client: SfacgClient) {
        this.Client = Client;
    }
    static async Total() {
        let coin =await _SfacgCache.GetAccountMoney();
        let i,allcoin = 0;
        if(coin){
            for(i of coin){
                allcoin += i.couponsRemain;
            }
        }
        console.log(`总代币数：${allcoin}`);
    }
}
// (async () => {
//     await _Total.Total()
// })()
