import { colorize, question, questionAccount, selectBookFromList } from "../utils/tools";
import { _SfacgTasker } from "./handler/tasker";
import { _SfacgCache } from "./handler/cache";
import { _SfacgRegister } from "./handler/register";
import { _SfacgDownloader } from "./handler/download";
import { _Total } from "./handler/total";
import { Multi } from "./handler/multi";
import { SfacgClient } from "./api/client";
import { DEV } from "./handler/DEV";

export class Sfacg {
    async init() {
        console.log("选择一个选项:");
        console.log(colorize("1. 帮人提书", "blue"));
        console.log(colorize("2. 每日奖励", "blue"));
        console.log(colorize("3. 账号管理", "blue"));
        console.log(colorize("4. 多账号提书", "blue"));
        console.log(colorize("5. 注册机启动！", "blue"));
        console.log(colorize("6. 数据库中下载", "blue"));
        console.log(colorize("7. 数据库内容迁移，建议先做备份", "blue"));
        console.log(colorize("8. 统计总代币", "blue"));
        const option = await question(colorize("请输入选项的数字：", "green"));
        switch (option) {
            case "1":
                this.Once();
                break;
            case "2":
                this.Bonus();
                break;
            case "3":
                this.Account();
                break;
            case "4":
                this.Multi();
                break;
            case "5":
                this.Regist();
                break;
            case "6":
                this.ServerDownload();
                break;
            case "7":
                this.S3move();
                break;
            case "8":
                await _Total.Total();
                break;
            default:
                console.log(colorize("输入的选项不正确，请重新输入。", "yellow"));
                this.init();
                break;
        }
    }

    async Once() {
        await _SfacgDownloader.Once();
    }

    async Account() {
        console.log(colorize("[1]添加账号", "blue"));
        console.log(colorize("[2]删除账号", "blue"));
        const option = await question(colorize("选择一个选项:", "yellow"));
        switch (option) {
            case "1":
                const { userName, passWord } = await questionAccount();
                await _SfacgCache.UpdateAccount({
                    userName: userName as string,
                    passWord: passWord as string,
                });
                break;
            case "2":
                const a = await question(colorize("输入账号：", "blue"));
                await _SfacgCache.RemoveAccount(a as string);
                break;
            default:
                console.log(colorize("输入的选项不正确。", "blue"));
                await this.Account();
                break;
        }
    }

    async Regist() {
        //  while (1)
        await _SfacgRegister.Register();
    }

    async Bonus() {
        await _SfacgTasker.TaskAll();
        await _Total.Total();
    }
    async Total() {
        await _Total.Total();
    }

    async S3move() {
        console.log("注意要先到SupaBase中将content设置为AllowNulladble");
        console.log("注册tebi后env中要添加以下下三样\nACCESSKEYID=\nSECRETACCESSKEY=\nBUCKET=");
        console.log("2s后开始迁移");
        await new Promise((r) => {
            setTimeout(r, 2000);
        });
        await DEV();
    }

    async Multi() {
        const m = new Multi();
        const a = new SfacgClient();
        const name = await question("请输入书名：");
        const books = await a.searchInfos(name as string);
        const id = await selectBookFromList(books as any[]);
        const onId = await question("（无则直接回车）请输入起始Id：");
        await m.MultiBuy(id, onId as number);
        await question("（需要下载本地直接回车）");
        const d = new _SfacgDownloader();
        await d.DownLoad("db", id);
    }

    async ServerDownload() {
        await _SfacgDownloader.Search();
    }
}

(async () => {
    const a = new Sfacg();
    await a.init();
})();
// 16514636462
// 17142762591
// Opooo1830
