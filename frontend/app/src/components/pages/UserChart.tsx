import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { UserProfileContext } from "./UserProfile";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserChart: React.FC = () => {
  const { userProfile } = useContext(UserProfileContext)
  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: `${userProfile.userName}さんの記録`
      }
    }
  };

  const labels = ["クイズ作成数", "解答したクイズの数", "ブックマークされた数"];
  const data = {
    labels,
    datasets: [
      {
        label: `${userProfile.userName}さん`,
        data: [userProfile.quizzesLength, userProfile.answerRecordsLength, userProfile.bookmarksLength],
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      },
      {
        label: "全体の平均数",
        data: [userProfile.quizAverage, userProfile.answerRecordAverage, userProfile.bookmarkAverage],
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };

  return(
    <Bar
      height={600}
      width={600}
      options={options}
      data={data}
      />
  )
}

export default UserChart
