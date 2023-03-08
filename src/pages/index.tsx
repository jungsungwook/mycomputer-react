import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Card from '@/components/cards'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <div style={
        {
          float: 'right',
          margin: '10px',
        }
      }>
        <Link href={'/auth/signin'}>
          | Login |
        </Link>
        <Link href={'/auth/signup'}>
          | Register |
        </Link>
      </div>
      <div style={
        {
          margin: '10px',
          display: 'flex',
          flexWrap: 'wrap',
        }
      }>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
            return (
              <Card
                key={index}
                board_id={item}
                //how to title = "title" + item
                title={"title_" + item}
                content="content"
                img_url="https://images.mypetlife.co.kr/content/uploads/2018/07/09155938/23098550_1717292138292321_9032508045317373952_n.jpg"
                created_at="2021-07-17"
                updated_at="2021-07-17"
                user_id="user_id"
              />
            )
          })
        }
      </div>
    </>
  )
}

export default Home