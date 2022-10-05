class CreateQuizRemoteCommitMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_remote_commit_messages do |t|
      t.string :quiz_remote_commit_message
      t.references :quiz_remote_branch, null: false, foreign_key: true

      t.timestamps
    end
  end
end
