import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Card from '@/components/cards'

const Home = () => {
  return (
    <>
      <Card
        board_id={1}
        title="title"
        content="content"
        img_url="https://images.mypetlife.co.kr/content/uploads/2018/07/09155938/23098550_1717292138292321_9032508045317373952_n.jpg"
        created_at="2021-07-17"
        updated_at="2021-07-17"
        user_id="user_id"
      />
    </>
  )
}

export default Home