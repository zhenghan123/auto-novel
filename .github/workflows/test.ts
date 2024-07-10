name: "菠萝包轻小说注册"
run-name: "菠萝包轻小说注册"
on:
  #schedule:
  #  - cron: "18 1,9 * * *" # 北京时间上午 9:55 AM，下午 5:55 PM 运行，注册一个号
  workflow_dispatch: # 允许手动触发工作流
jobs:
  run-ts-script:
    runs-on: ubuntu-latest
    environment: supabase
    steps:
      - uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: pnpm

      - name: Install
        run: pnpm i

      - name: tsx run
        env:
          SMS_USERNAME: ${{ secrets.SMS_USERNAME }}
          SMS_PASSWORD: ${{ secrets.SMS_PASSWORD }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
          SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
          REGIST_PASSWORD: ${{ secrets.REGIST_PASSWORD }}
        run: pnpm run test

      # # 其他可能的优化步骤
      # - name: Cache node modules
      #   uses: actions/cache@v4
      #   with:
      #     path: ~/.npm
      #     key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
      #     restore-keys: |
      #       ${{ runner.os }}-node-
