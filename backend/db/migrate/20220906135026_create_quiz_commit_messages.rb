class CreateQuizCommitMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_commit_messages do |t|
      t.references :quiz_branch, null: false, foreign_key: true
      t.text :quiz_commit_message

      t.timestamps
    end
  end
end
