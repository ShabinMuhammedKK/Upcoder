import { useState } from 'react'
import Header from '../../components/admin/Header';
import DashMenu from '../../components/admin/DashMenu';
import CourseDetails from '../../components/admin/CourseDetails';

const CourseManagement = () => {
    const [isMenu, setMenu] = useState(false);

    const handleMenuShow = () => {
        setMenu(!isMenu);
      };
  return (
    <div className='min-h-screen'>
        <Header title={"Course Management"} />
        <DashMenu isMenu={isMenu} handleMenuShow={handleMenuShow} />
        <CourseDetails/>
    </div>
  )
}

export default CourseManagement