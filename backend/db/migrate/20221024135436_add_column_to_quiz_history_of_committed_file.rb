class AddColumnToQuizHistoryOfCommittedFile < ActiveRecord::Migration[6.1]
  def change
    add_column :quiz_history_of_committed_files, :quiz_history_of_committed_file_status, :string
  end
end
