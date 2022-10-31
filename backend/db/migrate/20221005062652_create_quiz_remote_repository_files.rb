class CreateQuizRemoteRepositoryFiles < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_remote_repository_files do |t|
      t.string :quiz_remote_repository_file_name
      t.string :quiz_repository_file_text_status
      t.references :quiz_remote_commit_message, null: false, foreign_key: true, index: { name: 'index_quiz_remote_repository_files_on_remote_commit_message_id' }

      t.timestamps
    end
  end
end
