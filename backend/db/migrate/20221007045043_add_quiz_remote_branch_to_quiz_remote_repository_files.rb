class AddQuizRemoteBranchToQuizRemoteRepositoryFiles < ActiveRecord::Migration[6.1]
  def change
    add_reference :quiz_remote_repository_files, :quiz_remote_branch, null: false, foreign_key: true
  end
end
