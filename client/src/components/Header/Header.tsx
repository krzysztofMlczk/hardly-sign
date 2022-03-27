import { Link } from 'react-router-dom';

const style = {
    display: "flex",
    alignItems: "center",
    JustifyContent: "space-between",
}

export const Header = () => {
    return <div style={style}>
        <Link to="/sign">Sign</Link>
        <Link to="/verify">Verify</Link>
    </div>
}