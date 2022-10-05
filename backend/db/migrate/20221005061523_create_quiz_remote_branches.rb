class CreateQuizRemoteBranches < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_remote_branches do |t|
      t.string :quiz_remote_branch_name
      t.references :quiz_first_or_last, null: false, foreign_key: true

      t.timestamps
    end
  end
end
