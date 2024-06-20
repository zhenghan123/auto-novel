import { SfacgHttp } from "./basehttp";
import { nameAvalible, sendCode, codeverify, regist } from "../types/Types";

export class SfacgRegist extends SfacgHttp {
    // 名称可用性检测
    async avalibleNmae(name: string): Promise<boolean> {
        try {
            const res = await this.post<nameAvalible>("/users/availablename", {
                nickName: name,
            });
            return res.data.nickName.valid;
        } catch (err: any) {
            console.error(`POST avalibleNmae failed`);
            return false;
        }
    }

    // 发出验证码
    async sendCode(phone: string) {
        try {
            const res = await this.post<sendCode>(`/sms/${phone}/86`, "");
            return res.status.httpCode == 201;
        } catch (err: any) {
            console.error(`POST sendCode failed`);
            return false;
        }
    }

    // 携带验证
    async codeverify(phone: string, smsAuthCode: number) {
        try {
            const res = await this.put<codeverify>(`/sms/${phone}/86`, {
                smsAuthCode: smsAuthCode,
            });
            return res.status.httpCode == 200;
        } catch (err: any) {
            console.error(`PUT codeverify failed`);
            return false;
        }
    }

    // 注册！
    async regist(passWord: string, nickName: string, phone: string, smsAuthCode: number) {
        try {
            let res = await this.post<regist>("/user", {
                passWord: passWord,
                nickName: nickName,
                countryCode: "86",
                phoneNum: phone,
                email: "",
                smsAuthCode: smsAuthCode,
                shuMeiId: "",
            });
            let accountID = res.data.accountId;
            return accountID;
        } catch (err: any) {
            console.error(`POST regist failed`);
            return false;
        }
    }
}
