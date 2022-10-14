class CreateQuizHistoryOfCommittedFiles < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_history_of_committed_files do |t|
      t.string :quiz_history_of_committed_files_name
      t.string :quiz_history_of_committed_files_text_status
      t.string :quiz_history_of_committed_files_past_text_status
      t.text :quiz_history_of_committed_files_parent_past_commit_message
      t.references :quiz_branch, null: false, foreign_key: true
      t.references :quiz_commit_message, null: false, foreign_key: true

      t.timestamps
    end
  end
end
