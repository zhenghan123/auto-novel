import { SfacgClient } from "./client/Sfacg/client";
import fs from "fs";
(async () => {
  const sfacg = new SfacgClient();

  // 小说信息
  const novelInfo = await sfacg.novelInfo(216187);
  fs.writeFileSync("./TESTDATA/novelInfo.json", JSON.stringify(novelInfo));

  // 登录状态
  const loginStatus = await sfacg.login("13696458853", "dddd1111");
  fs.writeFileSync("./TESTDATA/loginStatus.json", JSON.stringify(loginStatus));

  // 用户信息
  const userInfo = await sfacg.userInfo();
  fs.writeFileSync("./TESTDATA/userInfo.json", JSON.stringify(userInfo));

  const userMoney = await sfacg.userMoney()
fs.writeFileSync("./TESTDATA/userMoney.json", JSON.stringify(userMoney));
  // 章节列表
  const volumeInfos = await sfacg.volumeInfos(567122);
  fs.writeFileSync("./TESTDATA/volumeInfos.json", JSON.stringify(volumeInfos));

  // 书本内容
  const contentInfos = await sfacg.contentInfos(7431226);
  fs.writeFileSync(
    "./TESTDATA/contentInfos.json",
    JSON.stringify(contentInfos)
  );

  // 搜索小说信息
  const searchInfos = await sfacg.searchInfos("屠龙", 0, 10);
  fs.writeFileSync("./TESTDATA/searchInfos.json", JSON.stringify(searchInfos));

  // 我的书架信息
  const bookshelfInfos = await sfacg.bookshelfInfos();
  fs.writeFileSync(
    "./TESTDATA/bookshelfInfos.json",
    JSON.stringify(bookshelfInfos)
  );

  // 作品分类信息
  const typeInfo = await sfacg.typeInfo();
  fs.writeFileSync("./TESTDATA/typeInfo.json", JSON.stringify(typeInfo));

  // 所有标签信息
  const tags = await sfacg.tags();
  fs.writeFileSync("./TESTDATA/tags.json", JSON.stringify(tags));

  // 谷谷谷
  const novels = await sfacg.novels("0");
  fs.writeFileSync("./TESTDATA/novels.json", JSON.stringify(novels));
})();