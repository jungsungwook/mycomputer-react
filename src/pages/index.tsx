import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Card from '@/components/cards'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios, { Method } from 'axios'
import { timeConvert, timezoneConvert } from '@/utils/timezoneConvet'

const Home = () => {
  const [isLogin, setIsLogin] = useState('false');
  const [boards, setBoards] = useState([]);
  const [user, setUser] = useState(Object);

  useEffect(() => {
    // setIsLogin(localStorage.getItem('isLogin') == "true" ? 'true' : 'false');
    
    const isLogin = axios({
      method: 'get' as Method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      url: `/api/auth/islogin`,
    }).then((res) => {
      const result = res.data;
      if(result.statusCode == 200 || result.statusCode == '200'){
        setUser({
          id: result.contents.id,
          email: result.contents.email,
          name: result.contents.name,
          customId: result.contents.customId,
        });
        localStorage.setItem('isLogin', 'true');
        setIsLogin('true');
      }else{
        localStorage.setItem('isLogin', 'false');
        setIsLogin('false');
        setUser({});
      }
    }).catch((err) => {
    });
    
    const res = axios({
      method: 'get' as Method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      url: `/api/board`,
    }).then((res) => {
      const result = res.data;
      if(result.statusCode == 200 || result.statusCode == '200'){
        setBoards(result.contents);
      }
    });
  }, []);

  return (
    <>
      <div id="menu-bar" className='fixedBox'>
      {
        isLogin == 'true'
        ? 
          <div style={
            {
              float: 'right',
              margin: '0 10px 0 0'
            }
          }><div>
            <p style={
              {
                float: 'left',
                margin: '0 10px 0 0'
              }
            }>{user.name}님 환영합니다.</p>
            <p style={{cursor : 'pointer', float : 'left'}} onClick={
              () => {
                const res = axios({
                  method: 'get' as Method,
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  },
                  url: `/api/auth/signout`,
                }).then((res) => {
                }).catch((err) => {
                }).finally(() => {
                  localStorage.removeItem('isLogin');
                  localStorage.removeItem('accessToken');
                  setUser({});
                  setIsLogin('false');
                });
              }
            }>
            | Logout |
            </p>
            </div>
          </div>
        : 
          <div style={
            {
              float: 'right',
            }
          }>
            <Link href={'/auth/signin'}>
              | Login |
            </Link>
            <Link href={'/auth/signup'}>
              | Register |
            </Link>
          </div>
      }
      <div>
        <Link href={'/'}>
          | 홈 화면 |
        </Link>
        <Link href={'/board'}>
          | 게시판 |
        </Link>
        <Link href={'/survey'}>
          | 설문조사 |
        </Link>
      </div>
      </div>
      <div id='div-boards' style={
        {
          margin: '10px',
          display: 'flex',
          flexWrap: 'wrap',
        }
      }>
        {
          boards.map((item: any, index) => {
            return (
              <Card
                key={index}
                board_id={item.id}
                title={item.title}
                content={item.content}
                // img_url="https://images.mypetlife.co.kr/content/uploads/2018/07/09155938/23098550_1717292138292321_9032508045317373952_n.jpg"
                created_at={timeConvert(item.createdAt)}
                updated_at={item.updatedAt}
                user_id={item.createdById}
              />
            )
          })
        }
      </div>
    </>
  )
}

export default Home