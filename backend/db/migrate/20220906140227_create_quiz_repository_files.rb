class CreateQuizRepositoryFiles < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_repository_files do |t|
      t.references :quiz_commit_message, null: false, foreign_key: true
      t.string :quiz_repository_file_name
      t.string :quiz_repository_file_status
      t.string :quiz_repository_file_text_status

      t.timestamps
    end
  end
end
