class CreateQuizWorktreeFiles < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_worktree_files do |t|
      t.references :quiz_branch, null: false, foreign_key: true
      t.string :quiz_worktree_file_name
      t.string :quiz_worktree_file_status
      t.string :quiz_worktree_file_text_status

      t.timestamps
    end
  end
end
