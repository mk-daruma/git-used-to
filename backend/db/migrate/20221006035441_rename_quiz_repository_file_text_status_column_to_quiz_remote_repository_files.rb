class RenameQuizRepositoryFileTextStatusColumnToQuizRemoteRepositoryFiles < ActiveRecord::Migration[6.1]
  def change
    rename_column :quiz_remote_repository_files, :quiz_repository_file_text_status, :quiz_remote_repository_file_text_status
  end
end
