import axios from "axios";
import { smsGetPhone, smsLogin } from "./types/types";

export enum sid {
    Sfacg = 50896,
    Ciweimao = 22439,
}
export enum smsAction {
    cancel = "cancelRecv",
    get = "getPhone",
}

export class sms {
    private userName: string;
    private passWord: string;
    token: any;

    constructor() {
        this.userName = process.env.SMS_USERNAME ?? "";
        this.passWord = process.env.SMS_PASSWORD ?? "";
        if (!this.userName || !this.passWord) {
            console.error("无接码账号信息，请先填写！");
            process.exit();
        }
    }

    async waitForCode(sid: sid, phone: string): Promise<number> {
        return new Promise((resolve) => {
            const checkCode = async () => {
                const code = await this.receive(sid, phone);
                if (code) {
                    resolve(code); // 完成Promise，并返回code值
                } else {
                    // 如果code为空，5秒后再次检查
                    setTimeout(checkCode, 5000);
                }
            };
            checkCode();
        });
    }

    // 登录
    async login(retries = 3) {
        if (retries > 0) {
            try {
                const res = await axios.post<smsLogin>(
                    "https://h5.haozhuma.com/login.php",
                    {
                        username: this.userName,
                        password: this.passWord,
                    },
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        },
                        timeout: 5000,
                    }
                );
                this.token = res.data.token;
                console.log("登录成功！");
                return this.token;
            } catch (err: any) {
                if (err.code === "ECONNABORTED") {
                    retries--;
                    console.log("登录超时，重新登录");
                    await this.login(retries);
                } else {
                    console.log(err.response.data);
                }
            }
        }
    }

    // 获取一个有效号码
    async getPhone(sid: sid, api: smsAction = smsAction.get) {
        try {
            const res = await axios.post<smsGetPhone>(
                "https://api.haozhuma.com/sms/",
                {
                    api: api,
                    token: this.token,
                    sid: sid,
                    Province: "",
                    ascription: "",
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                }
            );
            console.log("获取号码成功！");
            return res.data.phone;
        } catch (err: any) {
            return false;
        }
    }
    private async receive(sid: sid, phone: string): Promise<number | false> {
        try {
            const res = await axios.get("https://api.haozhuma.com/sms", {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                params: {
                    api: "getMessage",
                    token: this.token,
                    sid: sid,
                    phone: phone,
                    tm: new Date().getTime(),
                },
            });
            return res.data.yzm;
        } catch (err: any) {
            console.log(err.response.data);
            return false;
        }
    }
}
