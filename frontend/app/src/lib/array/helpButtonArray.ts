export const commandLists = [
  {
    name: "git init",
    intro: "リポジトリを新規に作成するコマンドです。このコマンドを叩かないとgitコマンドを使用できないのでまずこのコマンドを叩きましょう。"
  },
  {
    name: "touch {ファイル名}",
    intro: "workingtreeにfileを作成することができます。ファイルを複数作成する際には例のように半角スペースを空けてファイル名を入力します。( 例: touch {ファイル名} {ファイル名} )"
  },
  {
    name: "git remote add ~",
    intro: "git remote add https://git-used-to.com/{user名} のコマンドを叩くことで、リモートリポジトリを追加します。このコマンドを叩くことでpushコマンドを使用できるようになります。"
  },
  {
    name: "git add {ファイル名}",
    intro: "指定したworkingtreeのファイルをステージエリアに追加します。すでにステージエリアに同じファイルが存在する場合は、textStatusが異なる場合のみステージエリアのファイルの値が反映されます。"
  },
  {
    name: "git add .(-A)",
    intro: "git add .かgit add -Aコマンドでworkingtreeの全てのファイルをステージエリアに追加します。"
  },
  {
    name: "git commit -m",
    intro: "ステージエリアに存在するファイルをローカルリポジトリにコミットします。",
    attention: "※⚠️現在git-used-toで使用できるcommitコマンドは-mオプション付き(-mオプションは一度に複数使用不可)のみで。本来のgitでは-mオプション無しでも使用できるので是非調べてみてください。)"
  },
  {
    name: "git commit --amend -m ~",
    intro: "git commit --amend -m {text}で直前のコミットメッセージを編集できます。"
  },
  {
    name: "git push origin {current branch}",
    intro: "現在のブランチのローカルリポジトリの状態をリモートリポジトリに反映します。"
  },
  {
    name: "git push --delete origin {ブランチ名}",
    intro: "リモートリポジトリ内の指定したブランチを削除します。"
  },
  {
    name: "git push origin :{ブランチ名}",
    intro: "リモートリポジトリ内の指定したブランチを削除します。"
  },
  {
    name: "git branch -m {変更前ブランチ名} {変更後ブランチ名}",
    intro: "ブランチ名を変更できます。"
  },
  {
    name: "git branch -d {ブランチ名}",
    intro: "ローカルに存在するブランチを削除できます。"
  },
  {
    name: "git branch {ブランチ名}",
    intro: "ブランチを新規で作成します。"
  },
  {
    name: "git checkout -b {ブランチ名}",
    intro: "ブランチを新規作成し、そのブランチに移動します。"
  },
  {
    name: "rm {ファイル名}",
    intro: "workingtree上の指定したファイルを削除します。"
  },
  {
    name: "git rm {ファイル名}",
    intro: "workingtreeとindex area上の指定したファイルを削除します。"
  },
  {
    name: "git rm --cashed {ファイル名}",
    intro: "index area上のファイルのみ削除します。"
  },
  {
    name: "git reset",
    intro: "git addで行ったステージングをリセットします。"
  },
  {
    name: "git reset --mixed HEAD~{数字}",
    intro: "指定した数のコミットと関連するインデックスの変更をリセットします。",
    attention: "※⚠️本来はHEAD^の`^`の数などでリセットする箇所を指定できますが、git-used-toは仕様上、数字で指定するようにお願いします。"
  },
  {
    name: "git reset --hard HEAD~{数字}",
    intro: "指定した数のコミットと関連したインデックス/ワーキングツリーの変更をリセットします",
    attention: "※⚠️本来はHEAD^の`^`の数などでリセットする箇所を指定できますが、git-used-toは仕様上、数字で指定するようにお願いします。"
  },
  {
    name: "git reset --soft HEAD~{数字}",
    intro: "指定した数のcommitをリセットするこことができます。",
    attention: "※⚠️本来はHEAD^の`^`の数などでリセットする箇所を指定できますが、git-used-toは仕様上、数字で指定するようにお願いします。"
  },
];

export const userTitleLists = [
  {
    userTitle: "git-used-to見習い",
    intro: "アカウント作成時の称号です",
    limitCreateQuiz: "称号がgit-used-to見習いの場合、3個までクイズを作成できます。"
  },
  {
    userTitle: "git-used-to初段",
    intro: "作成/解答したクイズ数と作成したクイズにブックマークされた数の合計が3個以上の場合に'git-used-to初段'の称号になります。",
    limitCreateQuiz: "称号がgit-used-to初段の場合、5個までクイズを作成できます。"
  },
  {
    userTitle: "git-used-to二段",
    intro: "作成/解答したクイズ数と作成したクイズにブックマークされた数の合計が5個以上の場合に'git-used-to二段'の称号になります。",
    limitCreateQuiz: "称号がgit-used-to二段の場合、7個までクイズを作成できます。"
  },
  {
    userTitle: "git-used-to三段",
    intro: "作成/解答したクイズ数と作成したクイズにブックマークされた数の合計が10個以上の場合に'git-used-to三段'の称号になります。",
    limitCreateQuiz: "称号がgit-used-to三段の場合、10個までクイズを作成できます。"
  },
  {
    userTitle: "git-used-to四段",
    intro: "作成/解答したクイズ数と作成したクイズにブックマークされた数の合計が15個以上の場合に'git-used-to四段'の称号になります。",
    limitCreateQuiz: "称号がgit-used-to四段の場合、12個までクイズを作成できます。"
  },
  {
    userTitle: "git-used-to五段",
    intro: "作成/解答したクイズ数と作成したクイズにブックマークされた数の合計が30個以上の場合に'git-used-to五段'の称号になります。",
    limitCreateQuiz: "称号がgit-used-to五段の場合、15個までクイズを作成できます。"
  },
  {
    userTitle: "git-used-to達人",
    intro: "作成/解答したクイズ数と作成したクイズにブックマークされた数の合計が50つ以上の場合に'git-used-to達人'の称号になります。",
    limitCreateQuiz: "称号がgit-used-to達人の場合、20個までクイズを作成できます。"
  },
  {
    userTitle: "免許皆伝 git-used-to師範代",
    intro: "作成/解答したクイズ数と作成したクイズにブックマークされた数の合計が80つ以上の場合に'免許皆伝 git-used-to師範代'の称号になります。",
    limitCreateQuiz: "称号が免許皆伝 git-used-to師範代の場合、30個までクイズを作成できます。"
  },
]