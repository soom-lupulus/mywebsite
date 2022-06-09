/*
 * @Author: yuyunhao
 * @Date: 2021-12-27 12:41:56
 * @LastEditTime: 2022-01-04 08:41:08
 * @LastEditors: yuyunhao
 * @Description:
 * @FilePath: \website\src\pages\Home\index.tsx
 * 代码都是复制过来的，怎么会出错
 */
import cx from './index.less';
import Nav from '@/components/Nav';

console.log(process.env.envType);

const Home = () => {
  return (
    <>
      <Nav></Nav>
      <div className={cx.wrapper}>
        <ul>
          <li>
            <span>知识分子最大的罪恶，就是建造关押自己的思想监狱</span>
          </li>
          <li>
            <span>Keep going, and thinking why</span>
          </li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default Home;
