import { Avatar } from "@material-ui/core"
import React from "react"

const AvatarImage :React.FC<{image : string | undefined ,rank : string | undefined}> = ({image, rank}) => {
  const AvatarProfile = () => {
    const styles =
      rank === "git used to見習い"
      ? {
        border: "solid 2px #000000"
        }
      : rank === "git-used-to初段"
      ? {
        border: "solid 2px #ff0000"
        }
      : rank === "git-used-to二段"
      ? {
        border: "solid 2px #329eff"
        }
      : rank === "git-used-to三段"
      ? {
        border: "solid 2px #008000"
        }
      : rank === "git-used-to四段"
      ? {
        border: "solid 2px #00ffff"
        }
      : rank === "git-used-to五段"
      ? {
        border: "solid 2px #fa8072"
        }
      : rank === "git-used-to達人"
      ? {
        border: "solid 2px #8a2be2"
        }
      : rank === "免許皆伝 git-used-to師範代"
      ? {
        border: "solid 2px #ffd700"
        }
      : {}

    return(
      <Avatar
        style={styles}
        src={image}
        />
        )
  }

  return(
    <AvatarProfile/>
  )
}

export default AvatarImage