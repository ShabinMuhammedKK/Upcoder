import { Link } from "react-router-dom";
import * as Icons from "react-icons/bi";

type DashMenuProps = {
    isMenu:boolean;
    handleMenuShow:()=>void;
}

const DashMenu:React.FC<DashMenuProps> = ({isMenu, handleMenuShow})=> {

  return (
      <div className={`dashMenu ${isMenu ? 'absolute z-10 top-0 left-0 w-full h-auto' : 'static'}`}>
      {isMenu ? (
        <div className="dashMenuDropDown">
          <Icons.BiX style={{ fontSize: "44px" ,paddingBottom:"4px"}} onClick={handleMenuShow} />
          <hr style={{backgroundColor:"gray",height:2,marginBottom:20}}/>
          <ul>
            <li><Link to="/admin/dashboard">
                <div className="dashNavs">Dashboard</div>
            </Link>
            </li>
            <li>
            <Link to="/admin/usermanagement">
            <div className="dashNavs">User management</div>
            </Link>
            </li>
            <li>
            <Link to="/admin/coursemanagement">
            <div className="dashNavs">Course management</div>
            </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="h-12 ml-7 mt-4">
          <Icons.BiListUl
            style={{ fontSize: "44px" }}
            onClick={handleMenuShow}
          />
        </div>
      )}
    </div>
  );
};

export default DashMenu;
