class AddQuizBranchToQuizRepositoryFiles < ActiveRecord::Migration[6.1]
  def change
    add_reference :quiz_repository_files, :quiz_branch, null: false, foreign_key: true
  end
end
