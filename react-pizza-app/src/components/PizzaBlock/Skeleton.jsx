import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="120" r="120" /> 
    <rect x="0" y="258" rx="5" ry="5" width="280" height="25" /> 
    <rect x="0" y="298" rx="5" ry="5" width="280" height="87" /> 
    <rect x="0" y="410" rx="5" ry="5" width="90" height="30" /> 
    <rect x="130" y="403" rx="5" ry="5" width="150" height="45" />
  </ContentLoader>
)

export default Skeleton
