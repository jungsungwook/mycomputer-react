import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Card from '@/components/cards'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios, { Method } from 'axios'
import { timeConvert, timezoneConvert } from '@/utils/timezoneConvet'
import { useRecoilState } from 'recoil'
import { isLoginState } from '@/states/is-login'

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [isLogin, setIsLoginState] = useRecoilState(isLoginState);

  useEffect(() => {
    const res = axios({
      method: 'get' as Method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      url: `/api/board`,
    }).then((res) => {
      const result = res.data;
      if (result.statusCode == 200 || result.statusCode == '200') {
        setBoards(result.contents);
      }
    });
  }, []);

  return (
    <>
    <div className="write-btn-fixed">
      {
        isLogin == true?
        <Link href={'/board/write'}>
          글쓰기
        </Link>
        :
        <Link href={'/auth/signin'}>
          글쓰기
        </Link>
      }
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