# GIT USED TO
![twitter_header_photo_2](https://user-images.githubusercontent.com/98959840/211242239-d0850567-f66e-4b3c-b231-0f0d8fc0be2f.png)
### GITトレーニングサービス
### "GIT USED TO"とは、プログラミング超初心者を対象に現在エンジニアとは切っても切り離せない関係の分散型バージョン管理システム"git"がコマンドを通してどのような動きをしているのかを学び、gitへの恐怖心を無くして実務で使用できるようになるためにトレーニングをサポートするサービスです。  
### 元々準備されているgitのクイズだけでなく、自分でgitのクイズを作成したり他の人が作成したクイズに挑戦することができます。　 
### URL: https://web.git-used-to.com/

# GIT USED TOを作ろうと思ったきっかけ
GIT USED TOは僕自身が、「__こんなサービスがあったらもっとスムーズにgitを理解できたんだろうな__」という実際に勉強で苦労した経験を元に作成したサービスです。

![git_used_to_readme_demo](https://user-images.githubusercontent.com/98959840/211309969-29e71828-5e22-4421-a794-d9a6604d359d.gif)

僕が初めてプログラミングを学び始めた際に色々な壁にぶつかりましたが、中でも大きな壁だったのが"git"でした。  
真っ黒なターミナル画面にすら恐怖を感じていた当時の僕は  
- **gitとは何をするものなのか**
- **コマンドを叩いたらどうなるのか**
- **何をしてはいけないのか**
- **ネットの記事も何が書いてるのかわからない**
  
等わからないことだらけで勉強にとても時間がかかってしまいました。  

そしてなんとかgitコマンドを恐る恐る叩いたりしてようやくgitに慣れてきた際に改めて感じたことは、
- **実際に手を動かしてコマンドを叩くことがgitを理解するための近道である。**
- **gitが何者かを理解するのが一番大変。理解した後であれば、ネットでの検索でどんどん知識を深められる。**

ということです。

# gitを学ぶ際に発生する問題(ユーザーの課題)

手を動かすことがいちばんの近道ではありますが、PCの前提知識がない初心者はそもそもgitコマンドを叩き始める前に下記のような大きなハードルがあると感じました。

- **変なコマンドを叩いたらPCが壊れてしまうのではないかという恐怖でターミナルに触れない**
- **コマンドを叩いた際の挙動が見えない(git addをしても画面上では変化がない、commitをしても何が起きてるかわからない)**
- **知らない単語が多すぎる(ブランチを切る、ステージングにあげる等)**
- **gitは重要なサービスとだけ知っているから触ってみたけど、そもそもなぜ使うべきなのかわからない**

# ハードルを越えるための条件(課題の解決策)

そうしたハードルが存在することが原因でプログラミング学習に大幅な時間がかかってしまう、または挫折してしまう初心者の方が多くいるのではないかと考えました。  

- **コマンドを叩いた際にどのような処理が走っているのか視覚的にわかる**
- **コマンドを叩いて失敗しても問題がない環境**  

そこで上記のような状況でgitを学ぶことができるサービスが必要だと考え、"GIT USED TO"を作ることを決めました。

# GIT USED TOのゴール(存在価値)
"GIT USED TO"というサービスは、「~に慣れる」という意味の「get used to」をもじって「GIT USED TOを通してgitに慣れてほしい」と考え命名しました。  
このGIT USED TOを通して、"gitのスペシャリストになってもらう"ことはゴールではありません。

"gitに慣れて、gitへの恐怖心をなくし、プログラミングの勉強を進めることを通して必要なコマンドをネットで調べられるスタートラインに立てるようになるための手助け"をすることが"GIT USED TO"のゴールです。  

# 使用技術概要(詳細後述)
[![My Skills](https://skillicons.dev/icons?i=aws,docker,ruby,rails,ts,react,materialui)](https://skillicons.dev)
- TypeScript
- React
- Ruby 3.0
- Ruby on Rails 6.1.4
- MySQL 5.7
- Nginx
- AWS
  - Route53
  - ALB
  - VPC
  - ECR
  - ECS
  - Fargate
  - RDS
  - S3
  - Cloud Front
  - ACM
- CircleCI
- Docker/Docker-compose


# インフラ構成図
### frontendはcloudfront + s3、backendはFagateを用いてデプロイしています。
### rails api + reactを使用してSPAでの開発をしています。
### Issueドリブン開発での開発をしています。
### CircleCIで自動テストを行なっています。
![git-used-to-aws4 drawio](https://user-images.githubusercontent.com/98959840/211310207-a2ea06a0-c932-49b8-8c43-bee99afe9f1b.png)

# ER図
![git-used-to_ER drawio (2)](https://user-images.githubusercontent.com/98959840/211330648-c1f7c782-65cf-469a-a543-d58aa6200576.png)
各テーブルの説明
- user:ログインするユーザー用のテーブル
- quiz:userが作成するクイズ用のテーブル
- quiz_comment:クイズごとにユーザーが行うコメント用のテーブル
- quiz_command_tag:クイズに紐づけるタグ用のテーブル
- quiz_bookmark:クイズのブックマーク用のテーブル
- quiz_answer_records：クイズを解答済みかの判別用テーブル
- quiz_first_or_last：クイズの解答か解答開始時の状態かの判別用テーブル
- quiz_branch：クイズ内のブランチ用テーブル
- quiz_worktree_file：クイズ内のワークツリーファイル用のテーブル
- quiz_index_file：クイズ内のインデックスファイル用のテーブル
- quiz_commit_message：クイズ内のコミットメッセージ用テーブル
- quiz_repository_file：クイズ内のローカルレポジトリファイル用テーブル
- quiz_remote_branch：クイズ内のリモートブランチ用テーブル
- quiz_remote_commit_message：クイズ内のリモートコミットメッセージ用テーブル
- quiz_remote_repository_file：クイズ内のリモートレポジトリファイル用テーブル
- quiz_history_of_committed_file:クイズ内で"git reset"コマンドを叩き過去の状態に戻す際に参照するデータを記録するためのテーブル


# 実装機能一覧
- 管理者ユーザー機能(管理者のみ他ユーザーのデータを削除が可能/GIT USED TOが事前に用意しているクイズを作成/編集ができる)
- ログイン機能
  - メール認証機能
  - パスワードを忘れた際のパスワード再設定機能(ログイン前)
  - パスワード変更機能(ログイン後)
- ゲストログイン機能
  - クイズ解答/作成/コメント/ブックマークを制限する機能
- gitクイズ作成/編集/削除機能
- クイズ解答機能
- クイズへのコメント機能
- クイズのブックマーク機能
- クイズ検索機能
- クイズのタグ検索機能
- クイズごとのブックマークランキング機能
- 作成したクイズのブックマーク数が多いユーザーのランキング機能
- 称号機能（作成/解答クイズや作成したクイズのブックマーク数によってランクアップ。作成できるクイズが増える&プロフィール画像のフチの色が変化)

# GIT USED TOで使用できるコマンド一覧
 - git init
 - touch {ファイル名}
 - git remote add ~
 - git add {ファイル名}
 - git add .(-A)
 - git commit -m
 - git commit --amend -m ~
 - git push origin {current branch}
 - git push --delete origin {ブランチ名}
 - git push origin :{ブランチ名}
 - git branch -m {変更前ブランチ名} {変更後ブランチ名}
 - git branch -d {ブランチ名}
 - git branch {ブランチ名}"
 - git checkout -b {ブランチ名}"
 - rm {ファイル名}"
 - git rm {ファイル名}"
 - git rm --cashed {ファイル名}"
 - git reset"
 - git reset --mixed HEAD~{数字}"
 - git reset --hard HEAD~{数字}"
 - git reset --soft HEAD~{数字}"

# デモ動画
### クイズの説明の通りにコマンドを用いて、ファイルを作成/削除/ステージングにあげる/コミットする/プッシュを行い解答します。
![クイズを解くgif](https://user-images.githubusercontent.com/98959840/211310615-0cfecd9c-a16c-42aa-b881-303ce671de18.gif)

### プロフィールではクイズ作成数/正解したクイズ数/作成クイズにブックマークされた数の合計と全体の平均数がグラフで表示されます。
![プロフィールの説明](https://user-images.githubusercontent.com/98959840/211310966-72fe163f-1675-4597-960b-5da4e3c3481d.gif)

### クイズを解くだけでなく、クイズを作成することができます。
![クイズ作成demo](https://user-images.githubusercontent.com/98959840/211311238-2c6689e6-c2ed-4558-b276-8b61a18dcdd6.gif)

### 道場という名前で初級/中級/上級の難易度別に事前にクイズを用意しています。
![道場２](https://user-images.githubusercontent.com/98959840/211326624-97952bb2-69c6-4828-bf96-74f1c8aa3da7.gif)


# 使用技術詳細
# frontend: React + TypeScript
### 使用しているライブラリ等
- `Material-UI`: テキストフォームやアイコンなどに使用。 
- `axios`: Rails apiとの通信を行うために使用。
- `react-router-dom`:URLとコンポーネントを紐づけるために使用。
- `react-device-detect`: GIT USED TOのモバイル使用を制限するために使用
- `react-chartjs-2`: プロフィール画面でグラフを表示するために使用。
- `chart.js`: プロフィール画面でグラフを表示するために使用。
- `framer-motion`: 要素にアニメーションを追加するために使用。

# backend: Rails api (本番環境のみNginx)
### 使用したGem
- `devise_token_auth`： トークン認証を行うために使用。
- `aws-fog/carrierwave`: プロフィール画像をAWS S3に保存するために使用。
- `rspec`： アクションやモデルのテストをするために使用。
- `factory_bot_rails`: rspecでダミーデータを作成するために使用。
- `faker`: ダミーデータを作成する際の値を作成するために使用。
- `rubocop-airbnb`： Rubyの静的コード解析のために使用。
- `unicorn`: 本番環境で使用。
- `dotenv-rails`: 環境変数を使用するために使用。

# Infrastructure
### Docker/docker-compose 
開発環境のRails api + MySqlはDocker環境で開発。


### AWS
デプロイにあたり、AWSの下記のサービスを使用。
- Route53
- ALB
- VPC
- ECR
- ECS
- Fargate
- RDS
- S3
- Cloud Front
- ACM

### CircleCI
自動CIパイプラインを構築。

自動化項目
- RSpec
- rubocop

# こだわった点
### cloudfront + Fargateを使用してAWS上へのデプロイ
そもそもインフラやネットワークの知識がほぼ0だったため、下記の本とネットで勉強してデプロイを行いました。
- マスタリングTCP/IP―入門編―
- amazon web services 基礎からのネットワーク&サーバー構築

本を読んだ後でも何をどうしたらいいかわからなくなったことがたくさんありましたが、デプロイの設定をする過程の中でたくさんのエラーに見舞われ、結果として理解を深めることができました。  
(例:ターゲットグループのポート番号の設定を間違え、rails apiへreactから通信が行なえなかったエラ-など)

### 作成データを圧迫しないために作成できるデータを制限
クイズを一つ作成する際に、worktreefileなどのファイルデータなどはブランチごとに作成されるため、保存できるデータをbranchやfileデータごとに制限する設定をしています。
例:ブランチは3つ/fileデータは8つまで等

### ユーザーの称号によって作成できるクイズ数が変化する設定
上記のクイズ内データ数の制限と同じく、クイズ自体にもユーザーの称号によって作成できるクイズ数を制限しています。
クイズを解答することや、作成したクイズが他のユーザーから評価されてブックマークされる数が増えると称号は変化し、作成できるクイズ数が増えるような仕組みです。

~~~
称号ごとの作成できるクイズ数
- "git-used-to見習い": 3個
- "git-used-to初段": 5個
- "git-used-to二段": 7個
- "git-used-to三段": 10個
- "git-used-to四段": 12個
- "git-used-to五段": 15個
- "git-used-to達人": 20個
- "免許皆伝 git-used-to師範代": 30個
~~~

### gitのサービスを作成したこと
gitのサービスを作るということは、gitについてふんわりの理解ではいけないと考えました。  
コマンドごとにどんな挙動をするのか、gitはどのような仕組みなのかを改めて勉強する時間を設けたり、reactのuseStateを用いて擬似的にgitコマンドを叩けるようにすればいいのか、などの設計に時間をかけました。

### Rails api + React(TypeScript)でのSPA開発
プログラミングスクールでrails単体の開発は経験しましたが、reactやtypescriptはGIT USED TOの開発で初めて触りました。
そもそもSPAという概念はなんなのか、reactとはどういう仕組みで動いているのか、typescriptとjavascriptの違いはなんなのかという壁にぶつかり時間がかかりました。
